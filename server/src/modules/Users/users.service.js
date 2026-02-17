import pool from "../../config/db.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import {
  createUserQuery,
  findUserByEmailQuery,
  findUserByIdQuery,
} from "./users.queries.js";
import { generateToken,generateRefreshToken } from "../../utils/token.js";
import { updateLastLoginQuery } from "./users.queries.js";
import { insertRefreshTokenQuery } from "../Refreshtoken/refreshtoken.queries.js";
import { ApiError } from "../../utils/ApiError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserRefreshTokensQuery, revokeRefreshTokenQuery } from "../Refreshtoken/refreshtoken.queries.js";
import { revokeAllUserTokensQuery } from "../Refreshtoken/refreshtoken.queries.js";

export const registerUser = async (email, password, role) => {
  const { rows } = await pool.query(findUserByEmailQuery, [email]);
  if (rows[0]) {
    throw new ApiError(400, "Email already in use");
  }

  const hashedPassword = await hashPassword(password);

  const roleMap = {
    user: "USER",
    admin: "ADMIN",
  };

  const normalizedRole = roleMap[role] || "USER";


  console.log("Normalized Role:", normalizedRole); // Debugging log
  console.log(email, hashedPassword, normalizedRole); // Debugging log
  const { rows: newUser } = await pool.query(createUserQuery, [
    email,
    hashedPassword,
    normalizedRole,
  ]);

  return newUser[0];
};
export const loginUser = async (email, password) => {
  const { rows } = await pool.query(findUserByEmailQuery, [email]);
  const user = rows[0];

  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  if (!user.is_active) {
    throw new ApiError(403, "Account is inactive");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid email or password");
  }

  await pool.query(updateLastLoginQuery, [user.id]);

  const accessToken = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
  });

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await pool.query(insertRefreshTokenQuery, [
    user.id,
    hashedRefreshToken,
    expiresAt,
  ]);

  return { accessToken, refreshToken };
};

export const getUserById = async (id) => {
  const { rows } = await pool.query(findUserByIdQuery, [id]);
  const user = rows[0];
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

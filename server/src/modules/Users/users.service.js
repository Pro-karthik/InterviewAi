import pool from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/ApiError.js";
  import {
  findUserByEmailQuery,
  findUserByIdQuery,
  updateLastLoginQuery,
  insertRefreshTokenQuery,
  findUserRefreshTokensQuery,
  revokeRefreshTokenQuery,
  revokeAllUserTokensQuery
} from "./users.queries.js";
import {
  generateToken,
  generateRefreshToken
} from "../../utils/token.js";
import { comparePassword } from "../../utils/hash.js";

export const registerUser = async (email, password) => {
  const { rows } = await pool.query(findUserByEmailQuery, [email]);

  if (rows[0]) {
    throw new ApiError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows: newUser } = await pool.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING *`,
    [email, hashedPassword]
  );

  const user = newUser[0];

  const accessToken = generateToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  const hashedRefresh = await bcrypt.hash(refreshToken, 10);

  await pool.query(insertRefreshTokenQuery, [
    user.id,
    hashedRefresh,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);

  return { accessToken, refreshToken };
};


export const loginUser = async (email, password) => {
  const { rows } = await pool.query(findUserByEmailQuery, [email]);
  const user = rows[0];

  if (!user) throw new ApiError(400, "Invalid credentials");

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new ApiError(400, "Invalid credentials");

  await pool.query(updateLastLoginQuery, [user.id]);

  const accessToken = generateToken({ id: user.id });
  const refreshToken = generateRefreshToken({ id: user.id });

  const hashedRefresh = await bcrypt.hash(refreshToken, 10);

  await pool.query(insertRefreshTokenQuery, [
    user.id,
    hashedRefresh,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "No refresh token");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError(403, "Invalid refresh token");
  }

  const { rows } = await pool.query(
    findUserRefreshTokensQuery,
    [decoded.id]
  );

  let matchedToken = null;

  for (let tokenRow of rows) {
    const match = await bcrypt.compare(
      refreshToken,
      tokenRow.token
    );

    if (match) {
      matchedToken = tokenRow;
      break;
    }
  }

  if (!matchedToken) {
    throw new ApiError(403, "Refresh token not found");
  }

  if (matchedToken.expires_at < new Date()) {
    throw new ApiError(403, "Refresh token expired");
  }
  await pool.query(revokeRefreshTokenQuery, [matchedToken.id]);

  const newAccessToken = generateToken({ id: decoded.id });
  const newRefreshToken = generateRefreshToken({ id: decoded.id });

  const newHashed = await bcrypt.hash(newRefreshToken, 10);

  await pool.query(insertRefreshTokenQuery, [
    decoded.id,
    newHashed,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);

  return { newAccessToken, newRefreshToken };
};
export const getUserById = async (id) => {
  const { rows } = await pool.query(findUserByIdQuery, [id]);
  return rows[0];
};

export const logoutUser = async (userId) => {
  await pool.query(revokeAllUserTokensQuery, [userId]);
};

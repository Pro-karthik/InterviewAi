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
  revokeAllUserTokensQuery,
  getUserByEmailQuery,
  updateOtpQuery,
  updateOtpAttemptsQuery,
  blockUserOtpQuery ,
  clearOtpQuery,
  updatePasswordQuery,
  updateUserProfileQuery,
} from "./users.queries.js";
import {
  generateToken,
  generateRefreshToken
} from "../../utils/token.js";
import { comparePassword } from "../../utils/hash.js";
import { generateOTP,hashOTP } from "../../utils/Otpbased.js";
import { sendOtpEmail } from "../../utils/sendEmail.js";

export const registerUser = async (email, password) => {
  const { rows } = await pool.query(findUserByEmailQuery, [email]);

  if (rows[0]) {
    throw new ApiError("Email already exists",400);
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

  if (!user) throw new ApiError("Invalid credentials",400);

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new ApiError("Invalid credentials",400);

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
  return { newAccessToken: null, newRefreshToken: null };
}

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError("Invalid refresh token",403);
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
    throw new ApiError("Refresh token not found",403);
  }

  if (matchedToken.expires_at < new Date()) {
    throw new ApiError("Refresh token expired",403);
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

export const sendotpService = async (email) => {
  const { rows } = await pool.query(getUserByEmailQuery, [email]);

  if (rows.length === 0) throw new Error("User not found");

  const user = rows[0];

  // prevent resend within active expiry
  if (user.otp_expires) {
  const now = new Date();
  const diff = (new Date(user.otp_expires) - now) / 1000;

  if (diff > 240) { // block only if more than 4 mins left
    throw new Error("Please wait before requesting new OTP.");
  }
}

  const otp = generateOTP();
  const hashotp = hashOTP(otp);
  const expiresat = new Date(Date.now() + 5 * 60 * 1000);

  await pool.query(updateOtpQuery, [hashotp, expiresat, email]);

  await sendOtpEmail(email, otp);

  return true;
};

export const verifyotpService = async (email, otp) => {
  const { rows } = await pool.query(getUserByEmailQuery, [email]);

  if (!rows.length) throw new Error("User not found");

  const user = rows[0];
  const now = new Date();

  if (user.otp_block_until && now < user.otp_block_until) {
    throw new Error("Account temporarily blocked. Try later.");
  }

  if (!user.otp_expires || now > new Date(user.otp_expires)) {
    throw new Error("OTP expired. Request new one.");
  }

  const hashedOtp = hashOTP(otp.trim());

  if (hashedOtp !== user.otp) {
    const attempts = user.otp_attempts + 1;

    if (attempts >= 5) {
      const blocktime = new Date(Date.now() + 5 * 60 * 1000);
      await pool.query(blockUserOtpQuery, [attempts, blocktime, email]);
      throw new Error("Too many attempts. Blocked for 5 minutes.");
    }

    await pool.query(updateOtpAttemptsQuery, [attempts, email]);

    throw new Error("Invalid OTP"); // ✅ correct
  }

  await pool.query(clearOtpQuery, [email]);

  return true;
};

export const resendOtpService = async (email) => {
  const { rows } = await pool.query(getUserByEmailQuery, [email]);

  if (!rows.length) throw new Error("User not found");

  const otp = generateOTP();
  const hashedOtp = hashOTP(otp);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await pool.query(updateOtpQuery, [hashedOtp, expiresAt, email]);

  await sendOtpEmail(email, otp);

  return true;
};
export const resetPasswordService = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(updatePasswordQuery, [hashedPassword, email]);
};


export const updateUserProfileService = async (userId, data) => {

  const { name, gender, date_of_birth, phone, bio } = data;

  const { rows } = await pool.query(updateUserProfileQuery, [
    name,
    gender,
    date_of_birth,
    phone,
    bio,
    userId
  ]);

  return rows[0];
};
export const createUserQuery = ` 
    INSERT INTO users (email,password,role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role,is_active,created_at;
`;
export const findUserByEmailQuery = `
    select * from users where email = $1;
`;
export const updateLastLoginQuery = `
    UPDATE users SET updated_at = NOW() WHERE id = $1;
`;
export const findUserByIdQuery = `
    SELECT
    id,
    name,
    email,
    gender,
    date_of_birth,
    phone,
    bio,
    profile_picture,
    created_at
  FROM users
  WHERE id = $1;
`;

export const insertRefreshTokenQuery = `
  INSERT INTO refresh_tokens (user_id, token, expires_at)
  VALUES ($1, $2, $3)
`;

export const findUserRefreshTokensQuery = `
  SELECT * FROM refresh_tokens
  WHERE user_id = $1 AND is_revoked = false
`;

export const revokeRefreshTokenQuery = `
  UPDATE refresh_tokens
  SET is_revoked = true
  WHERE id = $1
`;

export const revokeAllUserTokensQuery = `
  UPDATE refresh_tokens
  SET is_revoked = true
  WHERE user_id = $1
`;
export const getUserByEmailQuery = `
  SELECT id, email, otp, otp_expires, otp_attempts, otp_block_until
  FROM users
  WHERE email = $1
`;

export const updateOtpQuery = `
  UPDATE users
  SET otp = $1,
      otp_expires = $2,
      otp_attempts = 0,
      otp_block_until = NULL
  WHERE email = $3
`;

export const updateOtpAttemptsQuery = `
  UPDATE users
  SET otp_attempts = $1
  WHERE email = $2
`;

export const blockUserOtpQuery = `
  UPDATE users
  SET otp_attempts = $1,
      otp_block_until = $2
  WHERE email = $3
`;

export const clearOtpQuery = `
  UPDATE users
  SET otp = NULL,
      otp_expires = NULL,
      otp_attempts = 0,
      otp_block_until = NULL
  WHERE email = $1
`;

export const updatePasswordQuery = `
  UPDATE users
  SET password = $1
  WHERE email = $2
`;
export const updateUserProfileQuery = `
  UPDATE users
  SET
    name = $1,
    gender = $2,
    date_of_birth = $3,
    phone = $4,
    bio = $5,
    updated_at = NOW()
  WHERE id = $6
  RETURNING
    id,
    name,
    email,
    gender,
    date_of_birth,
    phone,
    bio,
    profile_picture
`;

export const updateProfilePictureQuery = `
  UPDATE users
  SET profile_picture = $1,
      updated_at = NOW()
  WHERE id = $2
  RETURNING profile_picture
`;
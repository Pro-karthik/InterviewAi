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

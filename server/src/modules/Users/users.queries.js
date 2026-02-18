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
    select id, email, role,is_active,created_at from users where id = $1;
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

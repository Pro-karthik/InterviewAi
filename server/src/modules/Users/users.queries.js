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
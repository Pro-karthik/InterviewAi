CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name VARCHAR(100),
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,

  role user_role_enum NOT NULL DEFAULT 'USER',

  -- Profile Information
  gender VARCHAR(20),
  date_of_birth DATE,
  phone VARCHAR(20),
  bio TEXT,
  profile_picture TEXT,

  -- Account status
  is_active BOOLEAN DEFAULT TRUE,

  -- OTP Authentication
  otp VARCHAR(255),
  otp_expires TIMESTAMPTZ,
  otp_attempts INTEGER DEFAULT 0,
  otp_block_until TIMESTAMPTZ,

  -- Audit fields
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
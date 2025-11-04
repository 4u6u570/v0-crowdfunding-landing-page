-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create login_audit table
CREATE TABLE IF NOT EXISTS login_audit (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  user_type VARCHAR(50), -- 'admin' or 'merchant'
  email VARCHAR(255),
  ip_address VARCHAR(45),
  success BOOLEAN,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create login_attempts table for rate limiting
CREATE TABLE IF NOT EXISTS login_attempts (
  id SERIAL PRIMARY KEY,
  ip_address VARCHAR(45),
  email VARCHAR(255),
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Extend merchants table if needed
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false;
ALTER TABLE merchants ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_merchants_contact_email ON merchants(contact_email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_login_audit_user ON login_audit(user_id, user_type);

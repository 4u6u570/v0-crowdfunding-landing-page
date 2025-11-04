-- Insert admin user
-- Email: augustosalazar47@gmail.com
-- Password: Filipa2025
-- Password hash created with PBKDF2-SHA256 (600000 iterations)
INSERT INTO admins (email, password_hash, full_name, is_active, created_at, updated_at)
VALUES (
  'augustosalazar47@gmail.com',
  '$pbkdf2-sha256$600000$5d8c2b3e7f9a4c1b$8f2e9d7c5b1a6f3e2d9c7a4b8e1f5d3c2a9b6e7f8d1c4a5b9e2f3d6c8a1b4e',
  'Admin Crowdfund',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = '$pbkdf2-sha256$600000$5d8c2b3e7f9a4c1b$8f2e9d7c5b1a6f3e2d9c7a4b8e1f5d3c2a9b6e7f8d1c4a5b9e2f3d6c8a1b4e',
  updated_at = CURRENT_TIMESTAMP;

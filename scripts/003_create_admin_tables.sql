-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'pending',
  verification_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create merchants table
CREATE TABLE IF NOT EXISTS merchants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  city VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  sales_volume NUMERIC(15, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create logistics table
CREATE TABLE IF NOT EXISTS logistics (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  status VARCHAR(50) NOT NULL,
  current_location VARCHAR(255),
  destination VARCHAR(255),
  estimated_delivery DATE,
  tracking_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create campaign_contributions table
CREATE TABLE IF NOT EXISTS campaign_contributions (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER,
  user_id INTEGER,
  amount NUMERIC(15, 2),
  quantity INTEGER,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_roles table for better role management
CREATE TABLE IF NOT EXISTS user_roles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE IF NOT EXISTS onboarding;
USE onboarding;
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roll_number VARCHAR(50),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  permanent_address TEXT,
  aadhaar_number VARCHAR(20),
  aadhaar_verified TINYINT(1) DEFAULT 0,
  pan_number VARCHAR(20),
  pan_verified TINYINT(1) DEFAULT 0,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  photo_path VARCHAR(255),
  aadhaar_image_path VARCHAR(255),
  pan_image_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

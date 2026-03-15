-- Create database
CREATE DATABASE IF NOT EXISTS feedback_db;
USE feedback_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  feedback_text TEXT NOT NULL,
  sentiment ENUM('positive', 'negative', 'neutral') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert a default admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@example.com', '$2b$10$5nD9eHRapv0AW/udgQkNn.nTj9wWlXQ4dmOXzeWCmy3TVDP2ZU4Va', 'admin');
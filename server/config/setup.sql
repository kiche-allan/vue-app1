-- Create database (run this first in psql)
-- CREATE DATABASE todo_app;

-- Connect to todo_app database then run:

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO todos (text, completed) VALUES 
('Learn Vue.js', true),
('Build a todo app', false),
('Add PostgreSQL database', false)
ON CONFLICT DO NOTHING;
-- schema.sql

-- Set timezone to UTC for consistency
SET timezone = 'UTC';

-- Users table
-- Stores user account information and profile details
CREATE TABLE users (
    -- Primary key using auto-incrementing integer
    id SERIAL PRIMARY KEY,
    
    -- Username with unique constraint to prevent duplicates
    username VARCHAR(50) UNIQUE NOT NULL,
    
    -- Password field for storing hashed passwords
    -- Using VARCHAR(60) as it's suitable for bcrypt hashes
    password VARCHAR(60) NOT NULL,
    
    -- User status flags
    isvip BOOLEAN DEFAULT FALSE,
    ismember BOOLEAN DEFAULT FALSE,
    
    -- Profile information
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    
    -- Timestamp for account creation
    -- Uses timestamptz to store timezone information
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
-- Stores all messages/posts created by users
CREATE TABLE messages (
    -- Primary key using auto-incrementing integer
    id SERIAL PRIMARY KEY,
    
    -- Foreign key reference to users table
    -- ON DELETE CASCADE means if a user is deleted, their messages are also deleted
    id_author INTEGER REFERENCES users(id) ON DELETE CASCADE,
    
    -- Message content
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    
    -- Timestamp for message creation
    -- Uses timestamptz to store timezone information
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_messages_author ON messages(id_author);
CREATE INDEX idx_users_username ON users(username);

-- Add some helpful comments to the tables
COMMENT ON TABLE users IS 'User accounts and profile information';
COMMENT ON TABLE messages IS 'User messages and posts';
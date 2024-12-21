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

-- Previous schema.sql content remains the same until the COMMENT statements...

-- Insert sample users with bcrypt-hashed passwords
-- Note: These passwords are hashed versions of simple passwords for demonstration
-- In this case, all passwords are hashed version of 'password123'
INSERT INTO users (username, password, firstname, lastname, isvip, ismember) VALUES
    ('john_doe', '$2a$10$6KqGkdCWgcM/ZWVC0VMxz.Cc9QqO.jR7WIwKc8wHzYPnhRUCHX2S2', 'John', 'Doe', true, true),
    ('alice_smith', '$2a$10$6KqGkdCWgcM/ZWVC0VMxz.Cc9QqO.jR7WIwKc8wHzYPnhRUCHX2S2', 'Alice', 'Smith', false, true),
    ('bob_wilson', '$2a$10$6KqGkdCWgcM/ZWVC0VMxz.Cc9QqO.jR7WIwKc8wHzYPnhRUCHX2S2', 'Bob', 'Wilson', true, false),
    ('emma_davis', '$2a$10$6KqGkdCWgcM/ZWVC0VMxz.Cc9QqO.jR7WIwKc8wHzYPnhRUCHX2S2', 'Emma', 'Davis', false, false),
    ('michael_brown', '$2a$10$6KqGkdCWgcM/ZWVC0VMxz.Cc9QqO.jR7WIwKc8wHzYPnhRUCHX2S2', 'Michael', 'Brown', true, true);

-- Insert sample messages
-- Note: We're using the user IDs created above as authors
INSERT INTO messages (id_author, title, content) VALUES
    (1, 'Welcome to the Club!', 'Hello everyone! As a VIP member, I''m excited to share my experience with this amazing community.'),
    (1, 'Tips for New Members', 'Here are some valuable insights I''ve gathered over the years...'),
    (2, 'My First Post', 'Hi everyone! I''m new here and looking forward to being part of this community.'),
    (3, 'VIP Event Announcement', 'Excited to announce our upcoming exclusive VIP gathering next month!'),
    (5, 'Monthly Meetup Details', 'Join us for our monthly meetup this Saturday at 7 PM.'),
    (4, 'Question about Membership', 'Can someone explain the benefits of upgrading to VIP status?'),
    (2, 'Great Experience', 'Just wanted to share my amazing experience at last week''s event.'),
    (5, 'Important Updates', 'Please read these updates about our community guidelines.'),
    (3, 'Feedback Welcome', 'What kind of events would you like to see in the future?'),
    (1, 'Thank You All', 'A big thank you to everyone who participated in yesterday''s virtual meetup!');

-- Insert messages with different timestamps for better testing
INSERT INTO messages (id_author, title, content, created_at) VALUES
    (1, 'Looking Back', 'Reflecting on our first year...', CURRENT_TIMESTAMP - INTERVAL '1 year'),
    (2, 'Future Plans', 'Exciting developments coming in 2025!', CURRENT_TIMESTAMP + INTERVAL '2 months'),
    (3, 'Anniversary Post', 'Celebrating our success!', CURRENT_TIMESTAMP - INTERVAL '6 months');
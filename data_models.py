Data Models:
PostgreSQL Schema:

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'data_analyst', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: corruption_cases
CREATE TABLE corruption_cases (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    country VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    sector VARCHAR(100),
    submitted_by INT REFERENCES users(id),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: case_verifications
CREATE TABLE case_verifications (
    id SERIAL PRIMARY KEY,
    case_id INT REFERENCES corruption_cases(id),
    verified_by INT REFERENCES users(id),
    verification_status ENUM('approved', 'rejected'),
    comments TEXT,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

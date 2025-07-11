CREATE TABLE credentials (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  type VARCHAR(50), -- e.g. 'License', 'ID'
  name VARCHAR(100),
  issued_by VARCHAR(100),
  file_url TEXT,
  issued_at DATE,
  expires_at DATE,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trainings (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  title VARCHAR(150),
  status VARCHAR(20) CHECK (status IN ('NotStarted', 'InProgress', 'Completed')),
  progress INT DEFAULT 0,
  certificate_url TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

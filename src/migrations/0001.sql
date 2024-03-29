-- We store all data in a single row
-- Each time we refresh the data we actually just had a new row
-- So we keep a creation_time to be able to fetch only the last one
CREATE TABLE raw_json_data (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  creation_time TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE EXTENSION citext;
CREATE TABLE users (
  id SERIAL,
  email CITEXT NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  CONSTRAINT email_unique UNIQUE (email)
);

CREATE TABLE users_series (
  user_id INTEGER NOT NULL REFERENCES users(id),
  serie_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, serie_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

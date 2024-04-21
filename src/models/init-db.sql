-- Crear usuario solo si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'c00rd1n4d0r4') THEN
        CREATE ROLE c00rd1n4d0r4 WITH LOGIN PASSWORD 'ToJ1@GO1_o25x';
    END IF;
END
$$;

-- Crear base de datos solo si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'rt_coordinadora') THEN
        CREATE DATABASE rt_coordinadora;
        GRANT ALL PRIVILEGES ON DATABASE rt_coordinadora TO c00rd1n4d0r4;
    END IF;
END
$$;

-- Conectar a la base de datos recién creada
\c rt_coordinadora

-- Tabla de Usuarios (para gestionar el registro de usuarios y autenticación):
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Eventos (para almacenar detalles del evento):
CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    organizer_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (user_id)
);

-- Tabla de Asistentes (para registrar usuarios en eventos):
CREATE TABLE IF NOT EXISTS attendees (
    attendee_id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events (event_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Tabla de Lugares Cercanos (opcional, solo si decides almacenar lugares cercanos en tu base de datos):
CREATE TABLE IF NOT EXISTS nearby_places (
    place_id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    FOREIGN KEY (event_id) REFERENCES events (event_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON attendees TO c00rd1n4d0r4;
GRANT SELECT, INSERT, UPDATE, DELETE ON events TO c00rd1n4d0r4;
GRANT SELECT, INSERT, UPDATE, DELETE ON nearby_places TO c00rd1n4d0r4;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO c00rd1n4d0r4;
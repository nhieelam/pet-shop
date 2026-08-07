CREATE TABLE roles (
    role_name VARCHAR(50) NOT NULL,
    description TEXT,
    PRIMARY KEY (role_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

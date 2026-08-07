CREATE TABLE invalidated_token (
    id VARCHAR(255) NOT NULL,
    expiry_time DATETIME(6),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

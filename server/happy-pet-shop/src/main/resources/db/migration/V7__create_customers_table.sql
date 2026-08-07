CREATE TABLE customers (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    points DECIMAL(15, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_customers_user_id (user_id),
    KEY idx_customer_user (user_id),
    CONSTRAINT fk_customers_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

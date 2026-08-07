CREATE TABLE staffs (
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    shift INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_staffs_user_id (user_id),
    KEY idx_staff_user (user_id),
    CONSTRAINT fk_staffs_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

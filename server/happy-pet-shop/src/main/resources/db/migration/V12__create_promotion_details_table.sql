CREATE TABLE promotion_details (
    id CHAR(36) NOT NULL,
    promotion_id CHAR(36) NOT NULL,
    product_id CHAR(36) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_promotion_product (promotion_id, product_id),
    KEY idx_pd_promotion (promotion_id),
    KEY idx_pd_product (product_id),
    CONSTRAINT fk_promotion_details_promotion FOREIGN KEY (promotion_id) REFERENCES promotions (id) ON DELETE CASCADE,
    CONSTRAINT fk_promotion_details_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

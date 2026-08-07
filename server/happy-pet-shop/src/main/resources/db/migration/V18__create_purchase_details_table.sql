CREATE TABLE purchase_details (
    id CHAR(36) NOT NULL,
    purchase_id CHAR(36) NOT NULL,
    product_id CHAR(36) NOT NULL,
    unit_price DECIMAL(15, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_purchase_product (purchase_id, product_id),
    KEY idx_purchase_detail_purchase (purchase_id),
    KEY idx_purchase_detail_product (product_id),
    CONSTRAINT fk_purchase_details_purchase FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON DELETE CASCADE,
    CONSTRAINT fk_purchase_details_product FOREIGN KEY (product_id) REFERENCES products (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

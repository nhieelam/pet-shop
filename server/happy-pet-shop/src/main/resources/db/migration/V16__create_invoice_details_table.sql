CREATE TABLE invoice_details (
    id CHAR(36) NOT NULL,
    invoice_id CHAR(36) NOT NULL,
    product_id CHAR(36),
    pet_id CHAR(36),
    promotion_detail_id CHAR(36),
    discount_amount DECIMAL(19, 2),
    unit_price DECIMAL(19, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(19, 2) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_invoice_details_pet_id (pet_id),
    KEY fk_invoice_details_invoice (invoice_id),
    KEY fk_invoice_details_product (product_id),
    KEY fk_invoice_details_promotion_detail (promotion_detail_id),
    CONSTRAINT fk_invoice_details_invoice FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE,
    CONSTRAINT fk_invoice_details_product FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_invoice_details_pet FOREIGN KEY (pet_id) REFERENCES pets (id),
    CONSTRAINT fk_invoice_details_promotion_detail FOREIGN KEY (promotion_detail_id) REFERENCES promotion_details (id),
    CONSTRAINT ck_invoice_details_item_type CHECK (
        (product_id IS NOT NULL AND pet_id IS NULL)
        OR (pet_id IS NOT NULL AND product_id IS NULL)
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

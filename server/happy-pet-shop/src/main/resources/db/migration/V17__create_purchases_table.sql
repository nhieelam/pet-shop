CREATE TABLE purchases (
    id CHAR(36) NOT NULL,
    staff_id CHAR(36) NOT NULL,
    supplier_id CHAR(36) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_purchase_staff (staff_id),
    KEY idx_purchase_supplier (supplier_id),
    KEY idx_purchase_created_at (created_at),
    CONSTRAINT fk_purchases_staff FOREIGN KEY (staff_id) REFERENCES staffs (id),
    CONSTRAINT fk_purchases_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

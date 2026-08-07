CREATE TABLE invoices (
    id CHAR(36) NOT NULL,
    staff_id CHAR(36),
    customer_id CHAR(36) NOT NULL,
    shipping_address VARCHAR(255),
    total_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,
    real_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,
    payment_method VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    KEY idx_invoice_staff (staff_id),
    KEY idx_invoice_customer (customer_id),
    KEY idx_invoice_created_at (created_at),
    CONSTRAINT fk_invoices_staff FOREIGN KEY (staff_id) REFERENCES staffs (id),
    CONSTRAINT fk_invoices_customer FOREIGN KEY (customer_id) REFERENCES customers (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

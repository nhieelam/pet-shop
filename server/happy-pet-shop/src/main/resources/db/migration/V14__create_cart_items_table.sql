CREATE TABLE cart_items (
    id CHAR(36) NOT NULL,
    product_id CHAR(36),
    pet_id CHAR(36),
    cart_id CHAR(36) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    KEY fk_cart_items_product (product_id),
    KEY fk_cart_items_pet (pet_id),
    KEY fk_cart_items_cart (cart_id),
    CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_cart_items_pet FOREIGN KEY (pet_id) REFERENCES pets (id),
    CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

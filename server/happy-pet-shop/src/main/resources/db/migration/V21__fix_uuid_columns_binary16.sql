-- Convert textual UUID columns (CHAR(36)) to BINARY(16) for Hibernate @GeneratedValue(UUID).
-- Uses UUID_TO_BIN() so existing values like 550e8400-e29b-41d4-a716-446655440000 are preserved.

SET FOREIGN_KEY_CHECKS = 0;

-- invoice_details
ALTER TABLE invoice_details ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE invoice_details SET id_bin = UUID_TO_BIN(id);
ALTER TABLE invoice_details DROP PRIMARY KEY;
ALTER TABLE invoice_details DROP COLUMN id;
ALTER TABLE invoice_details CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE invoice_details ADD PRIMARY KEY (id);

ALTER TABLE invoice_details ADD COLUMN invoice_id_bin BINARY(16) NOT NULL AFTER invoice_id;
UPDATE invoice_details SET invoice_id_bin = UUID_TO_BIN(invoice_id);
ALTER TABLE invoice_details DROP COLUMN invoice_id;
ALTER TABLE invoice_details CHANGE COLUMN invoice_id_bin invoice_id BINARY(16) NOT NULL;

ALTER TABLE invoice_details ADD COLUMN product_id_bin BINARY(16) NULL AFTER product_id;
UPDATE invoice_details SET product_id_bin = UUID_TO_BIN(product_id) WHERE product_id IS NOT NULL;
ALTER TABLE invoice_details DROP COLUMN product_id;
ALTER TABLE invoice_details CHANGE COLUMN product_id_bin product_id BINARY(16) NULL;

ALTER TABLE invoice_details ADD COLUMN pet_id_bin BINARY(16) NULL AFTER pet_id;
UPDATE invoice_details SET pet_id_bin = UUID_TO_BIN(pet_id) WHERE pet_id IS NOT NULL;
ALTER TABLE invoice_details DROP COLUMN pet_id;
ALTER TABLE invoice_details CHANGE COLUMN pet_id_bin pet_id BINARY(16) NULL;

ALTER TABLE invoice_details ADD COLUMN promotion_detail_id_bin BINARY(16) NULL AFTER promotion_detail_id;
UPDATE invoice_details SET promotion_detail_id_bin = UUID_TO_BIN(promotion_detail_id) WHERE promotion_detail_id IS NOT NULL;
ALTER TABLE invoice_details DROP COLUMN promotion_detail_id;
ALTER TABLE invoice_details CHANGE COLUMN promotion_detail_id_bin promotion_detail_id BINARY(16) NULL;

-- purchase_details
ALTER TABLE purchase_details ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE purchase_details SET id_bin = UUID_TO_BIN(id);
ALTER TABLE purchase_details DROP PRIMARY KEY;
ALTER TABLE purchase_details DROP COLUMN id;
ALTER TABLE purchase_details CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE purchase_details ADD PRIMARY KEY (id);

ALTER TABLE purchase_details ADD COLUMN purchase_id_bin BINARY(16) NOT NULL AFTER purchase_id;
UPDATE purchase_details SET purchase_id_bin = UUID_TO_BIN(purchase_id);
ALTER TABLE purchase_details DROP COLUMN purchase_id;
ALTER TABLE purchase_details CHANGE COLUMN purchase_id_bin purchase_id BINARY(16) NOT NULL;

ALTER TABLE purchase_details ADD COLUMN product_id_bin BINARY(16) NOT NULL AFTER product_id;
UPDATE purchase_details SET product_id_bin = UUID_TO_BIN(product_id);
ALTER TABLE purchase_details DROP COLUMN product_id;
ALTER TABLE purchase_details CHANGE COLUMN product_id_bin product_id BINARY(16) NOT NULL;

-- promotion_details
ALTER TABLE promotion_details ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE promotion_details SET id_bin = UUID_TO_BIN(id);
ALTER TABLE promotion_details DROP PRIMARY KEY;
ALTER TABLE promotion_details DROP COLUMN id;
ALTER TABLE promotion_details CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE promotion_details ADD PRIMARY KEY (id);

ALTER TABLE promotion_details ADD COLUMN promotion_id_bin BINARY(16) NOT NULL AFTER promotion_id;
UPDATE promotion_details SET promotion_id_bin = UUID_TO_BIN(promotion_id);
ALTER TABLE promotion_details DROP COLUMN promotion_id;
ALTER TABLE promotion_details CHANGE COLUMN promotion_id_bin promotion_id BINARY(16) NOT NULL;

ALTER TABLE promotion_details ADD COLUMN product_id_bin BINARY(16) NOT NULL AFTER product_id;
UPDATE promotion_details SET product_id_bin = UUID_TO_BIN(product_id);
ALTER TABLE promotion_details DROP COLUMN product_id;
ALTER TABLE promotion_details CHANGE COLUMN product_id_bin product_id BINARY(16) NOT NULL;

-- cart_items
ALTER TABLE cart_items ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE cart_items SET id_bin = UUID_TO_BIN(id);
ALTER TABLE cart_items DROP PRIMARY KEY;
ALTER TABLE cart_items DROP COLUMN id;
ALTER TABLE cart_items CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE cart_items ADD PRIMARY KEY (id);

ALTER TABLE cart_items ADD COLUMN product_id_bin BINARY(16) NULL AFTER product_id;
UPDATE cart_items SET product_id_bin = UUID_TO_BIN(product_id) WHERE product_id IS NOT NULL;
ALTER TABLE cart_items DROP COLUMN product_id;
ALTER TABLE cart_items CHANGE COLUMN product_id_bin product_id BINARY(16) NULL;

ALTER TABLE cart_items ADD COLUMN pet_id_bin BINARY(16) NULL AFTER pet_id;
UPDATE cart_items SET pet_id_bin = UUID_TO_BIN(pet_id) WHERE pet_id IS NOT NULL;
ALTER TABLE cart_items DROP COLUMN pet_id;
ALTER TABLE cart_items CHANGE COLUMN pet_id_bin pet_id BINARY(16) NULL;

ALTER TABLE cart_items ADD COLUMN cart_id_bin BINARY(16) NOT NULL AFTER cart_id;
UPDATE cart_items SET cart_id_bin = UUID_TO_BIN(cart_id);
ALTER TABLE cart_items DROP COLUMN cart_id;
ALTER TABLE cart_items CHANGE COLUMN cart_id_bin cart_id BINARY(16) NOT NULL;

-- messages
ALTER TABLE messages ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE messages SET id_bin = UUID_TO_BIN(id);
ALTER TABLE messages DROP PRIMARY KEY;
ALTER TABLE messages DROP COLUMN id;
ALTER TABLE messages CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE messages ADD PRIMARY KEY (id);

ALTER TABLE messages ADD COLUMN sender_id_bin BINARY(16) NOT NULL AFTER sender_id;
UPDATE messages SET sender_id_bin = UUID_TO_BIN(sender_id);
ALTER TABLE messages DROP COLUMN sender_id;
ALTER TABLE messages CHANGE COLUMN sender_id_bin sender_id BINARY(16) NOT NULL;

ALTER TABLE messages ADD COLUMN receiver_id_bin BINARY(16) NOT NULL AFTER receiver_id;
UPDATE messages SET receiver_id_bin = UUID_TO_BIN(receiver_id);
ALTER TABLE messages DROP COLUMN receiver_id;
ALTER TABLE messages CHANGE COLUMN receiver_id_bin receiver_id BINARY(16) NOT NULL;

-- invoices
ALTER TABLE invoices ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE invoices SET id_bin = UUID_TO_BIN(id);
ALTER TABLE invoices DROP PRIMARY KEY;
ALTER TABLE invoices DROP COLUMN id;
ALTER TABLE invoices CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE invoices ADD PRIMARY KEY (id);

ALTER TABLE invoices ADD COLUMN staff_id_bin BINARY(16) NULL AFTER staff_id;
UPDATE invoices SET staff_id_bin = UUID_TO_BIN(staff_id) WHERE staff_id IS NOT NULL;
ALTER TABLE invoices DROP COLUMN staff_id;
ALTER TABLE invoices CHANGE COLUMN staff_id_bin staff_id BINARY(16) NULL;

ALTER TABLE invoices ADD COLUMN customer_id_bin BINARY(16) NOT NULL AFTER customer_id;
UPDATE invoices SET customer_id_bin = UUID_TO_BIN(customer_id);
ALTER TABLE invoices DROP COLUMN customer_id;
ALTER TABLE invoices CHANGE COLUMN customer_id_bin customer_id BINARY(16) NOT NULL;

-- purchases
ALTER TABLE purchases ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE purchases SET id_bin = UUID_TO_BIN(id);
ALTER TABLE purchases DROP PRIMARY KEY;
ALTER TABLE purchases DROP COLUMN id;
ALTER TABLE purchases CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE purchases ADD PRIMARY KEY (id);

ALTER TABLE purchases ADD COLUMN staff_id_bin BINARY(16) NOT NULL AFTER staff_id;
UPDATE purchases SET staff_id_bin = UUID_TO_BIN(staff_id);
ALTER TABLE purchases DROP COLUMN staff_id;
ALTER TABLE purchases CHANGE COLUMN staff_id_bin staff_id BINARY(16) NOT NULL;

ALTER TABLE purchases ADD COLUMN supplier_id_bin BINARY(16) NOT NULL AFTER supplier_id;
UPDATE purchases SET supplier_id_bin = UUID_TO_BIN(supplier_id);
ALTER TABLE purchases DROP COLUMN supplier_id;
ALTER TABLE purchases CHANGE COLUMN supplier_id_bin supplier_id BINARY(16) NOT NULL;

-- carts
ALTER TABLE carts ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE carts SET id_bin = UUID_TO_BIN(id);
ALTER TABLE carts DROP PRIMARY KEY;
ALTER TABLE carts DROP COLUMN id;
ALTER TABLE carts CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE carts ADD PRIMARY KEY (id);

ALTER TABLE carts ADD COLUMN customer_id_bin BINARY(16) NOT NULL AFTER customer_id;
UPDATE carts SET customer_id_bin = UUID_TO_BIN(customer_id);
ALTER TABLE carts DROP COLUMN customer_id;
ALTER TABLE carts CHANGE COLUMN customer_id_bin customer_id BINARY(16) NOT NULL;

-- products
ALTER TABLE products ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE products SET id_bin = UUID_TO_BIN(id);
ALTER TABLE products DROP PRIMARY KEY;
ALTER TABLE products DROP COLUMN id;
ALTER TABLE products CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE products ADD PRIMARY KEY (id);

ALTER TABLE products ADD COLUMN category_id_bin BINARY(16) NOT NULL AFTER category_id;
UPDATE products SET category_id_bin = UUID_TO_BIN(category_id);
ALTER TABLE products DROP COLUMN category_id;
ALTER TABLE products CHANGE COLUMN category_id_bin category_id BINARY(16) NOT NULL;

-- pets
ALTER TABLE pets ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE pets SET id_bin = UUID_TO_BIN(id);
ALTER TABLE pets DROP PRIMARY KEY;
ALTER TABLE pets DROP COLUMN id;
ALTER TABLE pets CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE pets ADD PRIMARY KEY (id);

-- promotions
ALTER TABLE promotions ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE promotions SET id_bin = UUID_TO_BIN(id);
ALTER TABLE promotions DROP PRIMARY KEY;
ALTER TABLE promotions DROP COLUMN id;
ALTER TABLE promotions CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE promotions ADD PRIMARY KEY (id);

-- customers
ALTER TABLE customers ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE customers SET id_bin = UUID_TO_BIN(id);
ALTER TABLE customers DROP PRIMARY KEY;
ALTER TABLE customers DROP COLUMN id;
ALTER TABLE customers CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE customers ADD PRIMARY KEY (id);

ALTER TABLE customers ADD COLUMN user_id_bin BINARY(16) NOT NULL AFTER user_id;
UPDATE customers SET user_id_bin = UUID_TO_BIN(user_id);
ALTER TABLE customers DROP COLUMN user_id;
ALTER TABLE customers CHANGE COLUMN user_id_bin user_id BINARY(16) NOT NULL;

-- staffs
ALTER TABLE staffs ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE staffs SET id_bin = UUID_TO_BIN(id);
ALTER TABLE staffs DROP PRIMARY KEY;
ALTER TABLE staffs DROP COLUMN id;
ALTER TABLE staffs CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE staffs ADD PRIMARY KEY (id);

ALTER TABLE staffs ADD COLUMN user_id_bin BINARY(16) NOT NULL AFTER user_id;
UPDATE staffs SET user_id_bin = UUID_TO_BIN(user_id);
ALTER TABLE staffs DROP COLUMN user_id;
ALTER TABLE staffs CHANGE COLUMN user_id_bin user_id BINARY(16) NOT NULL;

-- user_roles
ALTER TABLE user_roles ADD COLUMN user_id_bin BINARY(16) NOT NULL AFTER user_id;
UPDATE user_roles SET user_id_bin = UUID_TO_BIN(user_id);
ALTER TABLE user_roles DROP PRIMARY KEY;
ALTER TABLE user_roles DROP COLUMN user_id;
ALTER TABLE user_roles CHANGE COLUMN user_id_bin user_id BINARY(16) NOT NULL;
ALTER TABLE user_roles ADD PRIMARY KEY (user_id, role_id);

-- users
ALTER TABLE users ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE users SET id_bin = UUID_TO_BIN(id);
ALTER TABLE users DROP PRIMARY KEY;
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE users ADD PRIMARY KEY (id);

-- categories
ALTER TABLE categories ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE categories SET id_bin = UUID_TO_BIN(id);
ALTER TABLE categories DROP PRIMARY KEY;
ALTER TABLE categories DROP COLUMN id;
ALTER TABLE categories CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE categories ADD PRIMARY KEY (id);

-- suppliers
ALTER TABLE suppliers ADD COLUMN id_bin BINARY(16) NOT NULL AFTER id;
UPDATE suppliers SET id_bin = UUID_TO_BIN(id);
ALTER TABLE suppliers DROP PRIMARY KEY;
ALTER TABLE suppliers DROP COLUMN id;
ALTER TABLE suppliers CHANGE COLUMN id_bin id BINARY(16) NOT NULL;
ALTER TABLE suppliers ADD PRIMARY KEY (id);

-- Restore unique constraints dropped during column replacement
ALTER TABLE customers ADD UNIQUE KEY uk_customers_user_id (user_id);
ALTER TABLE staffs ADD UNIQUE KEY uk_staffs_user_id (user_id);
ALTER TABLE carts ADD UNIQUE KEY uk_carts_customer_id (customer_id);
ALTER TABLE invoice_details ADD UNIQUE KEY uk_invoice_details_pet_id (pet_id);
ALTER TABLE promotion_details ADD UNIQUE KEY uk_promotion_product (promotion_id, product_id);
ALTER TABLE purchase_details ADD UNIQUE KEY uk_purchase_product (purchase_id, product_id);

-- Restore foreign keys dropped during column replacement
ALTER TABLE user_roles
    ADD CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles (role_name) ON DELETE CASCADE;

ALTER TABLE customers
    ADD CONSTRAINT fk_customers_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE staffs
    ADD CONSTRAINT fk_staffs_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE carts
    ADD CONSTRAINT fk_carts_customer FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE;

ALTER TABLE products
    ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id);

ALTER TABLE promotion_details
    ADD CONSTRAINT fk_promotion_details_promotion FOREIGN KEY (promotion_id) REFERENCES promotions (id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_promotion_details_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

ALTER TABLE cart_items
    ADD CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES products (id),
    ADD CONSTRAINT fk_cart_items_pet FOREIGN KEY (pet_id) REFERENCES pets (id),
    ADD CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts (id) ON DELETE CASCADE;

ALTER TABLE invoices
    ADD CONSTRAINT fk_invoices_staff FOREIGN KEY (staff_id) REFERENCES staffs (id),
    ADD CONSTRAINT fk_invoices_customer FOREIGN KEY (customer_id) REFERENCES customers (id);

ALTER TABLE invoice_details
    ADD CONSTRAINT fk_invoice_details_invoice FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_invoice_details_product FOREIGN KEY (product_id) REFERENCES products (id),
    ADD CONSTRAINT fk_invoice_details_pet FOREIGN KEY (pet_id) REFERENCES pets (id),
    ADD CONSTRAINT fk_invoice_details_promotion_detail FOREIGN KEY (promotion_detail_id) REFERENCES promotion_details (id);

ALTER TABLE purchases
    ADD CONSTRAINT fk_purchases_staff FOREIGN KEY (staff_id) REFERENCES staffs (id),
    ADD CONSTRAINT fk_purchases_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers (id);

ALTER TABLE purchase_details
    ADD CONSTRAINT fk_purchase_details_purchase FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_purchase_details_product FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE messages
    ADD CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id) REFERENCES users (id),
    ADD CONSTRAINT fk_messages_receiver FOREIGN KEY (receiver_id) REFERENCES users (id);

SET FOREIGN_KEY_CHECKS = 1;

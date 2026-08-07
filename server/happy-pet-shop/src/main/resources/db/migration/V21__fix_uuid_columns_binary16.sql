-- Convert CHAR(36) UUID columns to BINARY(16) for Hibernate.
-- Drop foreign keys first; MODIFY cannot run while FK column types mismatch.

SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE user_roles DROP FOREIGN KEY fk_user_roles_user;
ALTER TABLE user_roles DROP FOREIGN KEY fk_user_roles_role;
ALTER TABLE customers DROP FOREIGN KEY fk_customers_user;
ALTER TABLE staffs DROP FOREIGN KEY fk_staffs_user;
ALTER TABLE carts DROP FOREIGN KEY fk_carts_customer;
ALTER TABLE products DROP FOREIGN KEY fk_products_category;
ALTER TABLE promotion_details DROP FOREIGN KEY fk_promotion_details_promotion;
ALTER TABLE promotion_details DROP FOREIGN KEY fk_promotion_details_product;
ALTER TABLE cart_items DROP FOREIGN KEY fk_cart_items_product;
ALTER TABLE cart_items DROP FOREIGN KEY fk_cart_items_pet;
ALTER TABLE cart_items DROP FOREIGN KEY fk_cart_items_cart;
ALTER TABLE invoices DROP FOREIGN KEY fk_invoices_staff;
ALTER TABLE invoices DROP FOREIGN KEY fk_invoices_customer;
ALTER TABLE invoice_details DROP FOREIGN KEY fk_invoice_details_invoice;
ALTER TABLE invoice_details DROP FOREIGN KEY fk_invoice_details_product;
ALTER TABLE invoice_details DROP FOREIGN KEY fk_invoice_details_pet;
ALTER TABLE invoice_details DROP FOREIGN KEY fk_invoice_details_promotion_detail;
ALTER TABLE purchases DROP FOREIGN KEY fk_purchases_staff;
ALTER TABLE purchases DROP FOREIGN KEY fk_purchases_supplier;
ALTER TABLE purchase_details DROP FOREIGN KEY fk_purchase_details_purchase;
ALTER TABLE purchase_details DROP FOREIGN KEY fk_purchase_details_product;
ALTER TABLE messages DROP FOREIGN KEY fk_messages_sender;
ALTER TABLE messages DROP FOREIGN KEY fk_messages_receiver;

ALTER TABLE users MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE categories MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE suppliers MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE customers MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE customers MODIFY COLUMN user_id BINARY(16) NOT NULL;
ALTER TABLE staffs MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE staffs MODIFY COLUMN user_id BINARY(16) NOT NULL;
ALTER TABLE user_roles MODIFY COLUMN user_id BINARY(16) NOT NULL;
ALTER TABLE pets MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE products MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE products MODIFY COLUMN category_id BINARY(16) NOT NULL;
ALTER TABLE promotions MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE promotion_details MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE promotion_details MODIFY COLUMN promotion_id BINARY(16) NOT NULL;
ALTER TABLE promotion_details MODIFY COLUMN product_id BINARY(16) NOT NULL;
ALTER TABLE carts MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE carts MODIFY COLUMN customer_id BINARY(16) NOT NULL;
ALTER TABLE cart_items MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE cart_items MODIFY COLUMN product_id BINARY(16) NULL;
ALTER TABLE cart_items MODIFY COLUMN pet_id BINARY(16) NULL;
ALTER TABLE cart_items MODIFY COLUMN cart_id BINARY(16) NOT NULL;
ALTER TABLE invoices MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE invoices MODIFY COLUMN staff_id BINARY(16) NULL;
ALTER TABLE invoices MODIFY COLUMN customer_id BINARY(16) NOT NULL;
ALTER TABLE invoice_details MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE invoice_details MODIFY COLUMN invoice_id BINARY(16) NOT NULL;
ALTER TABLE invoice_details MODIFY COLUMN product_id BINARY(16) NULL;
ALTER TABLE invoice_details MODIFY COLUMN pet_id BINARY(16) NULL;
ALTER TABLE invoice_details MODIFY COLUMN promotion_detail_id BINARY(16) NULL;
ALTER TABLE purchases MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE purchases MODIFY COLUMN staff_id BINARY(16) NOT NULL;
ALTER TABLE purchases MODIFY COLUMN supplier_id BINARY(16) NOT NULL;
ALTER TABLE purchase_details MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE purchase_details MODIFY COLUMN purchase_id BINARY(16) NOT NULL;
ALTER TABLE purchase_details MODIFY COLUMN product_id BINARY(16) NOT NULL;
ALTER TABLE messages MODIFY COLUMN id BINARY(16) NOT NULL;
ALTER TABLE messages MODIFY COLUMN sender_id BINARY(16) NOT NULL;
ALTER TABLE messages MODIFY COLUMN receiver_id BINARY(16) NOT NULL;

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

BEGIN;

DROP TABLE IF EXISTS invalidated_token CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS purchase_details CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS invoice_details CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS promotion_details CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS staffs CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS suppliers CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS user_status CASCADE;
DROP TYPE IF EXISTS discount_type CASCADE;
DROP TYPE IF EXISTS promotion_status CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;

CREATE TYPE user_status AS ENUM ('ACTIVATED', 'UNACTIVATED');
CREATE TYPE discount_type AS ENUM ('PERCENT', 'FIXED');
CREATE TYPE promotion_status AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED');
CREATE TYPE payment_method AS ENUM ('QR_Scanning', 'COD');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'FAILED', 'REFUNDED');

CREATE TABLE roles (
    role_name VARCHAR(50) PRIMARY KEY,
    description TEXT
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255),
    status user_status NOT NULL DEFAULT 'ACTIVATED',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE INDEX idx_users_username ON users (username);
CREATE INDEX idx_users_email ON users (email);

CREATE TABLE user_roles (
    user_id UUID NOT NULL,
    role_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles (role_name) ON DELETE CASCADE
);

CREATE TABLE categories (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE INDEX idx_category_name ON categories (name);

CREATE TABLE suppliers (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(10) NOT NULL UNIQUE,
    address VARCHAR(255),
    status user_status NOT NULL DEFAULT 'ACTIVATED',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_supplier_name ON suppliers (name);
CREATE INDEX idx_supplier_email ON suppliers (email);
CREATE INDEX idx_supplier_phone ON suppliers (phone);

CREATE TABLE customers (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    points NUMERIC(15,2) NOT NULL DEFAULT 0,
    CONSTRAINT fk_customers_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_customer_user ON customers (user_id);

CREATE TABLE staffs (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    shift INT NOT NULL,
    CONSTRAINT fk_staffs_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_staff_user ON staffs (user_id);

CREATE TABLE carts (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_carts_customer FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
);

CREATE INDEX idx_cart_customer ON carts (customer_id);

CREATE TABLE pets (
    id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    species VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    price NUMERIC(15,2) NOT NULL,
    vaccinated BOOLEAN NOT NULL,
    image_url VARCHAR(500),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    sold BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE INDEX idx_pet_species ON pets (species);
CREATE INDEX idx_pet_breed ON pets (breed);
CREATE INDEX idx_pet_available ON pets (available);
CREATE INDEX idx_pet_created_at ON pets (created_at);

CREATE TABLE products (
    id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(15,2) NOT NULL,
    category_id UUID NOT NULL,
    brand VARCHAR(100),
    quantity INT NOT NULL,
    image_url VARCHAR(255),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE promotions (
    id UUID PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    discount_type discount_type NOT NULL,
    discount_value NUMERIC(15,2) NOT NULL,
    max_discount_value NUMERIC(15,2),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status promotion_status NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE INDEX idx_promotion_code ON promotions (code);
CREATE INDEX idx_promotion_status ON promotions (status);
CREATE INDEX idx_promotion_date ON promotions (start_date, end_date);

CREATE TABLE promotion_details (
    id UUID PRIMARY KEY,
    promotion_id UUID NOT NULL,
    product_id UUID NOT NULL,
    CONSTRAINT uk_promotion_product UNIQUE (promotion_id, product_id),
    CONSTRAINT fk_promotion_details_promotion FOREIGN KEY (promotion_id) REFERENCES promotions (id) ON DELETE CASCADE,
    CONSTRAINT fk_promotion_details_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

CREATE INDEX idx_pd_promotion ON promotion_details (promotion_id);
CREATE INDEX idx_pd_product ON promotion_details (product_id);

CREATE TABLE invoices (
    id UUID PRIMARY KEY,
    staff_id UUID,
    customer_id UUID NOT NULL,
    shipping_address VARCHAR(255),
    total_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
    real_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
    payment_method payment_method NOT NULL,
    status payment_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_invoices_staff FOREIGN KEY (staff_id) REFERENCES staffs (id),
    CONSTRAINT fk_invoices_customer FOREIGN KEY (customer_id) REFERENCES customers (id)
);

CREATE INDEX idx_invoice_staff ON invoices (staff_id);
CREATE INDEX idx_invoice_customer ON invoices (customer_id);
CREATE INDEX idx_invoice_created_at ON invoices (created_at);

CREATE TABLE invoice_details (
    id UUID PRIMARY KEY,
    invoice_id UUID NOT NULL,
    product_id UUID,
    pet_id UUID UNIQUE,
    promotion_detail_id UUID,
    discount_amount NUMERIC(19,2),
    unit_price NUMERIC(19,2) NOT NULL,
    quantity INT NOT NULL,
    total_price NUMERIC(19,2) NOT NULL,
    CONSTRAINT fk_invoice_details_invoice FOREIGN KEY (invoice_id) REFERENCES invoices (id) ON DELETE CASCADE,
    CONSTRAINT fk_invoice_details_product FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_invoice_details_pet FOREIGN KEY (pet_id) REFERENCES pets (id),
    CONSTRAINT fk_invoice_details_promotion_detail FOREIGN KEY (promotion_detail_id) REFERENCES promotion_details (id),
    CONSTRAINT ck_invoice_details_item_type CHECK (
        (product_id IS NOT NULL AND pet_id IS NULL)
        OR
        (pet_id IS NOT NULL AND product_id IS NULL)
    )
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY,
    product_id UUID,
    pet_id UUID,
    cart_id UUID NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_cart_items_pet FOREIGN KEY (pet_id) REFERENCES pets (id),
    CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts (id) ON DELETE CASCADE
);

CREATE TABLE purchases (
    id UUID PRIMARY KEY,
    staff_id UUID NOT NULL,
    supplier_id UUID NOT NULL,
    total_amount NUMERIC(15,2) NOT NULL,
    status payment_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_purchases_staff FOREIGN KEY (staff_id) REFERENCES staffs (id),
    CONSTRAINT fk_purchases_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
);

CREATE INDEX idx_purchase_staff ON purchases (staff_id);
CREATE INDEX idx_purchase_supplier ON purchases (supplier_id);
CREATE INDEX idx_purchase_created_at ON purchases (created_at);

CREATE TABLE purchase_details (
    id UUID PRIMARY KEY,
    purchase_id UUID NOT NULL,
    product_id UUID NOT NULL,
    unit_price NUMERIC(15,2) NOT NULL,
    quantity INT NOT NULL,
    total_price NUMERIC(15,2) NOT NULL,
    CONSTRAINT uk_purchase_product UNIQUE (purchase_id, product_id),
    CONSTRAINT fk_purchase_details_purchase FOREIGN KEY (purchase_id) REFERENCES purchases (id) ON DELETE CASCADE,
    CONSTRAINT fk_purchase_details_product FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE INDEX idx_purchase_detail_purchase ON purchase_details (purchase_id);
CREATE INDEX idx_purchase_detail_product ON purchase_details (product_id);

CREATE TABLE messages (
    id UUID PRIMARY KEY,
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_messages_sender FOREIGN KEY (sender_id) REFERENCES users (id),
    CONSTRAINT fk_messages_receiver FOREIGN KEY (receiver_id) REFERENCES users (id)
);

CREATE INDEX idx_message_sender ON messages (sender_id);
CREATE INDEX idx_message_receiver ON messages (receiver_id);
CREATE INDEX idx_message_created_at ON messages (created_at);

CREATE TABLE invalidated_token (
    id VARCHAR(255) PRIMARY KEY,
    expiry_time TIMESTAMP
);

COMMIT;

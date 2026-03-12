-- Seed Data for Revest e-commerce system

-- 1. Clear existing data (Optional, handle with care)
TRUNCATE TABLE order_items, orders, inventories, product_images, product_variants, product_categories, products, categories CASCADE;

-- 2. Categories
INSERT INTO categories (id, name, slug, description, "createdAt", "updatedAt") VALUES
('a7a84f60-a212-4298-8428-35a3a780517c', 'Electronics', 'electronics', 'Gadgets and devices', NOW(), NOW()),
('b7a84f60-a212-4298-8428-35a3a780517c', 'Clothing', 'clothing', 'Apparel and accessories', NOW(), NOW());

-- 3. Products
INSERT INTO products (id, name, slug, description, "basePrice", "isActive", "createdAt", "updatedAt") VALUES
('c7a84f60-a212-4298-8428-35a3a780517c', 'Smartphone X', 'smartphone-x', 'Latest high-end smartphone', 999.99, true, NOW(), NOW()),
('d7a84f60-a212-4298-8428-35a3a780517c', 'Cotton T-Shirt', 'cotton-t-shirt', 'Comfortable 100% cotton tee', 19.99, true, NOW(), NOW());

-- 4. Product Categories (Join Table)
INSERT INTO product_categories ("productsId", "categoriesId") VALUES
('c7a84f60-a212-4298-8428-35a3a780517c', 'a7a84f60-a212-4298-8428-35a3a780517c'),
('d7a84f60-a212-4298-8428-35a3a780517c', 'b7a84f60-a212-4298-8428-35a3a780517c');

-- 5. Inventories
INSERT INTO inventories (id, sku, "quantityAvailable", "quantityReserved", "createdAt", "updatedAt") VALUES
(
    'a8a84f60-a212-4298-8428-35a3a780517c',
    'SMX-BLK-128',
    50,
    0,
    NOW(),
    NOW()
),
(
    'b8a84f60-a212-4298-8428-35a3a780517c',
    'TS-WHT-L',
    100,
    0,
    NOW(),
    NOW()
);

-- 6. Product Variants
INSERT INTO product_variants (
    id,
    "productId",
    "inventoryId",
    sku,
    price,
    "compareAtPrice",
    attributes,
    "createdAt",
    "updatedAt"
) VALUES
(
    'e7a84f60-a212-4298-8428-35a3a780517c',
    'c7a84f60-a212-4298-8428-35a3a780517c',
    'a8a84f60-a212-4298-8428-35a3a780517c',
    'SMX-BLK-128',
    999.99,
    1099.99,
    '{"color": "black", "storage": "128GB"}',
    NOW(),
    NOW()
),
(
    'f7a84f60-a212-4298-8428-35a3a780517c',
    'd7a84f60-a212-4298-8428-35a3a780517c',
    'b8a84f60-a212-4298-8428-35a3a780517c',
    'TS-WHT-L',
    19.99,
    null,
    '{"color": "white", "size": "L"}',
    NOW(),
    NOW()
);

-- 7. Product Images
INSERT INTO product_images (id, "productId", url, "altText", "isPrimary", "sortOrder", "createdAt") VALUES
('c8a84f60-a212-4298-8428-35a3a780517c', 'c7a84f60-a212-4298-8428-35a3a780517c', 'https://example.com/phone.jpg', 'Smartphone X Black', true, 0, NOW()),
('d8a84f60-a212-4298-8428-35a3a780517c', 'd7a84f60-a212-4298-8428-35a3a780517c', 'https://example.com/tshirt.jpg', 'White Cotton T-Shirt', true, 0, NOW());

-- 8. Orders
INSERT INTO orders (id, "customerId", status, "totalAmount", "createdAt", "updatedAt") VALUES
('e8a84f60-a212-4298-8428-35a3a780517c', 'cust-123', 'PENDING', 1019.98, NOW(), NOW());

-- 9. Order Items
INSERT INTO order_items (id, "orderId", "productId", quantity, price) VALUES
('f8a84f60-a212-4298-8428-35a3a780517c', 'e8a84f60-a212-4298-8428-35a3a780517c', 'c7a84f60-a212-4298-8428-35a3a780517c', 1, 999.99),
('a9a84f60-a212-4298-8428-35a3a780517c', 'e8a84f60-a212-4298-8428-35a3a780517c', 'd7a84f60-a212-4298-8428-35a3a780517c', 1, 19.99);

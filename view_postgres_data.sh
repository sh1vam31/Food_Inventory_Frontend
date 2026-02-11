#!/bin/bash

# Script to view PostgreSQL data
echo "=== PostgreSQL Data Viewer ==="

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "DATABASE_URL not set. Using default local connection..."
    DB_URL="postgresql://postgres:password@localhost:5432/food_inventory_dev"
else
    DB_URL="$DATABASE_URL"
fi

echo "Connecting to: $DB_URL"
echo ""

# Connect to PostgreSQL and run queries
psql "$DB_URL" << EOF
-- Show all tables
\dt

-- Show raw materials
SELECT 'RAW MATERIALS:' as section;
SELECT id, name, unit, quantity_available, minimum_threshold, is_low_stock, created_at 
FROM raw_materials 
ORDER BY id;

-- Show food items
SELECT 'FOOD ITEMS:' as section;
SELECT id, name, price, is_available, created_at 
FROM food_items 
ORDER BY id;

-- Show recipes (ingredients for food items)
SELECT 'RECIPES:' as section;
SELECT fi.name as food_item, rm.name as ingredient, r.quantity_needed, rm.unit
FROM recipes r
JOIN food_items fi ON r.food_item_id = fi.id
JOIN raw_materials rm ON r.raw_material_id = rm.id
ORDER BY fi.name, rm.name;

-- Show orders
SELECT 'ORDERS:' as section;
SELECT id, status, total_amount, created_at 
FROM orders 
ORDER BY created_at DESC;

-- Show order items
SELECT 'ORDER ITEMS:' as section;
SELECT o.id as order_id, fi.name as food_item, oi.quantity, oi.price
FROM order_items oi
JOIN orders o ON oi.order_id = o.id
JOIN food_items fi ON oi.food_item_id = fi.id
ORDER BY o.id, fi.name;

EOF
#!/bin/bash

# Configuration
API_URL="http://localhost:3000"
echo "========================================"
echo " Starting API Verification Script"
echo " API URL: $API_URL"
echo "========================================"

# Helper function to extract ID using basic sed (assuming standard JSON format)
extract_id() {
    echo "$1" | grep -o '"id":"[^"]*' | head -n 1 | cut -d'"' -f4
}

TIMESTAMP=$(date +%s)

# --- 1. Category Endpoints ---
echo -e "\n[1] Testing Category Endpoints..."

echo " -> Creating a Root Category..."
CREATE_CAT_RES=$(curl -s -X POST $API_URL/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Electronics Root\", \"slug\": \"electronics-root-$TIMESTAMP\", \"description\": \"Main electronics category\"}")
echo "Response: $CREATE_CAT_RES"
ROOT_CAT_ID=$(extract_id "$CREATE_CAT_RES")

# Check if ID was extracted
if [ -z "$ROOT_CAT_ID" ]; then
    echo "ERROR: Failed to extract Root Category ID. Is the server running?"
    exit 1
fi

echo " -> Creating a Sub Category..."
CREATE_SUB_CAT_RES=$(curl -s -X POST $API_URL/categories \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Laptops\", \"slug\": \"laptops-sub-$TIMESTAMP\", \"parentCategoryId\": \"$ROOT_CAT_ID\"}")
echo "Response: $CREATE_SUB_CAT_RES"

echo " -> Fetching all Categories (should include tree)..."
curl -s -X GET $API_URL/categories | head -c 150
echo "..."

echo " -> Fetching Category by ID..."
curl -s -X GET $API_URL/categories/$ROOT_CAT_ID | head -c 150
echo "..."

echo " -> Updating Category..."
UPDATE_CAT_RES=$(curl -s -X PATCH $API_URL/categories/$ROOT_CAT_ID \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Electronics"}')
echo "Response: $UPDATE_CAT_RES"


# --- 2. Product Endpoints ---
echo -e "\n[2] Testing Product Endpoints..."

echo " -> Creating a Product..."
CREATE_PROD_RES=$(curl -s -X POST $API_URL/products \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"MacBook Pro 16\", \"slug\": \"macbook-pro-16-$TIMESTAMP\", \"description\": \"Apple M3 Max\", \"basePrice\": 2499, \"categoryIds\": [\"$ROOT_CAT_ID\"]}")
echo "Response: $CREATE_PROD_RES"
PROD_ID=$(extract_id "$CREATE_PROD_RES")

echo " -> Fetching all Products..."
curl -s -X GET $API_URL/products | head -c 150
echo "..."

echo " -> Updating Product..."
UPDATE_PROD_RES=$(curl -s -X PATCH $API_URL/products/$PROD_ID \
  -H "Content-Type: application/json" \
  -d '{"basePrice": 2299}')
echo "Response: $UPDATE_PROD_RES"


# --- 3. Product Variant Endpoints ---
echo -e "\n[3] Testing Product Variant Endpoints..."

echo " -> Adding a Variant to the Product..."
ADD_VAR_RES=$(curl -s -X POST $API_URL/products/$PROD_ID/variants \
  -H "Content-Type: application/json" \
  -d "{\"sku\": \"MBP-16-$TIMESTAMP\", \"price\": 2499, \"attributes\": {\"color\": \"Space Black\", \"storage\": \"1TB\"}}")
echo "Response: $ADD_VAR_RES"
VAR_ID=$(extract_id "$ADD_VAR_RES")

echo " -> Fetching strict Product details (should include the new variant)..."
curl -s -X GET $API_URL/products/$PROD_ID | head -c 200
echo "..."

# --- 4. Inventory Endpoints ---
echo -e "\n[4] Testing Inventory Endpoints..."
SKU="MBP-16-$TIMESTAMP"

echo " -> Fetching Inventory by SKU..."
GET_INV_RES=$(curl -s -X GET $API_URL/inventory/$SKU)
echo "Response: $GET_INV_RES"
INV_ID=$(extract_id "$GET_INV_RES")

if [ -n "$INV_ID" ]; then
    echo " -> Adjusting Stock Levels (+50)..."
    curl -s -X PATCH $API_URL/inventory/$INV_ID/adjust \
      -H "Content-Type: application/json" \
      -d "{\"quantityToAdjust\": 50, \"inventoryId\": \"$INV_ID\"}"
    
    echo -e "\n -> Reserving Stock (5)..."
    curl -s -X PATCH $API_URL/inventory/$INV_ID/reserve \
      -H "Content-Type: application/json" \
      -d "{\"quantityToReserve\": 5}"
else
    echo "ERROR: Failed to extract Inventory ID for SKU $SKU"
fi

# --- 5. Clean Up (Deleting) ---
echo -e "\n\n[5] Cleaning Up Data..."
echo " -> Removing Product..."
curl -s -X DELETE $API_URL/products/$PROD_ID

echo " -> Removing Category..."
curl -s -X DELETE $API_URL/categories/$ROOT_CAT_ID

echo -e "\n\n========================================"
echo " Finished API Verification Script"
echo "========================================"

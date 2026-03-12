#!/bin/bash

# Configuration
API_URL="http://localhost:3001/orders"
echo "================================================="
echo "   Testing Order Management Microservice Endpoints"
echo "================================================="

# Variables
CUSTOMER_ID="cust_12345"
PRODUCT_ID_1="c7a84f60-a212-4298-8428-35a3a780517c"
PRODUCT_ID_2="d7a84f60-a212-4298-8428-35a3a780517c"

# 1. Create a new Order
echo "1. Creating an Order..."
CREATE_RESPONSE=$(curl -s -X POST $API_URL \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "'$CUSTOMER_ID'",
    "items": [
      {
        "productId": "'$PRODUCT_ID_1'",
        "quantity": 2,
        "price": 50.00
      },
      {
        "productId": "'$PRODUCT_ID_2'",
        "quantity": 1,
        "price": 100.00
      }
    ]
  }')

echo "Response -> $CREATE_RESPONSE"
echo ""

# Extract the Order ID using grep/sed or simple string manipulation (requires jq if JSON, assuming basic response for now)
ORDER_ID=$(echo $CREATE_RESPONSE | grep -o '\"id\":\"[^\"]*' | cut -d'"' -f4)

if [ -z "$ORDER_ID" ]; then
    echo "❌ Failed to create order or could not parse ID. Stopping tests."
    exit 1
fi
echo "✅ Order Created with ID: $ORDER_ID"
echo ""

# 2. Get All Orders
echo "2. Fetching all orders..."
curl -s -X GET $API_URL | head -c 200
echo -e "\n...\n"

# 3. Get Order by ID
echo "3. Fetching order by ID ($ORDER_ID)..."
curl -s -X GET "$API_URL/$ORDER_ID"
echo -e "\n"

# 4. Get Orders by Customer ID
echo "4. Fetching orders by Customer ID ($CUSTOMER_ID)..."
curl -s -X GET "$API_URL/customer/$CUSTOMER_ID" | head -c 200
echo -e "\n...\n"

# 5. Update Order Status
echo "5. Updating order status to PROCESSING..."
curl -s -X PATCH "$API_URL/$ORDER_ID/status" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "PROCESSING"
  }'
echo -e "\n"

echo "================================================="
echo "   Tests Completed."
echo "================================================="

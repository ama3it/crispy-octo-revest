#!/bin/bash

# ==========================================
#           Revest API Test Suite
# ==========================================

PRODUCT_API="http://localhost:3000"
ORDER_API="http://localhost:3001"

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[1;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

divider() {
  echo "--------------------------------------------------"
}

print_header() {
  echo -e "\n${BLUE}$1${NC}"
  divider
}

test_endpoint() {
  METHOD=$1
  URL=$2
  DESCRIPTION=$3

  echo -e "${YELLOW}$METHOD $URL${NC}"
  echo "Description: $DESCRIPTION"
  divider

  RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X $METHOD $URL)

  BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')
  STATUS=$(echo "$RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

  if [ "$STATUS" -eq 200 ] || [ "$STATUS" -eq 201 ]; then
      echo -e "${GREEN}Status: $STATUS${NC}"
  else
      echo -e "${RED}Status: $STATUS${NC}"
  fi

  echo ""
  echo "Response:"
  echo "$BODY" | jq . 2>/dev/null || echo "$BODY"

  divider
  echo ""
}

echo ""
echo "=========================================="
echo "        Revest API Endpoint Tests         "
echo "=========================================="

# ------------------------------------------
# Product Service
# ------------------------------------------

print_header "Product Management Service (Port 3000)"

test_endpoint "GET" "$PRODUCT_API/categories" "Retrieve all categories"

test_endpoint "GET" "$PRODUCT_API/products" "Retrieve all products"

# ------------------------------------------
# Order Service
# ------------------------------------------

print_header "Order Management Service (Port 3001)"

test_endpoint "GET" "$ORDER_API/orders" "Retrieve all orders"

echo ""
echo -e "${GREEN}API testing complete.${NC}"
echo ""
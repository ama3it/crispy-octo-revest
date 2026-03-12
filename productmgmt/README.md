## 📋 Prerequisites

- Node.js (v18+)
- npm (v9+)
- PostgreSQL (running instance)

## ⚙️ Setup Instructions

### 1. Clone & Install Dependencies
```bash
# Install dependencies
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and configure your database credentials:

```ini
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=productmgmt_db
```

### 3. Database Preparation
Ensure the database specified in `.env` exists. TypeORM is configured to synchronize schemas automatically in development mode.

## 🏃 Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The REST API will be available at `http://localhost:3000`.
The TCP Microservice will listen on `0.0.0.0:3003`.

## 🧪 Verification

You can verify all core API endpoints using the provided test script:

```bash
# Ensure the server is running first
chmod +x test_endpoints.sh
./test_endpoints.sh
```

## 📖 API Summary

- **Categories**: `POST /categories`, `GET /categories`, `PATCH /categories/:id`, `DELETE /categories/:id`
- **Products**: `POST /products`, `GET /products`, `PATCH /products/:id`, `DELETE /products/:id`
- **Variants**: `POST /products/:id/variants`
- **Inventory**: `GET /inventory/:sku`, `PATCH /inventory/:id/adjust`, `PATCH /inventory/:id/reserve`

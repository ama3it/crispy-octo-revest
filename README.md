# Revest Order Management Project

This project consists of three main services and a PostgreSQL database:
1. **Product Management Service (productmgmt)** - A NestJS backend service.
2. **Order Management Service (ordermgmt)** - A NestJS backend service.
3. **Dashboard** - A Next.js frontend application.
4. **PostgreSQL Database** - Stores data for the services.

## Prerequisites
- **Docker & Docker Compose** (for running with Docker)
- **Node.js** (v18 or higher recommended) and **npm** (for running without Docker)
- **PostgreSQL** (for running without Docker)

---

## 🚀 Running with Docker (Recommended)

This is the easiest way to run the entire stack.

1. **Clone the repository** and navigate to the root directory.
2. **Create the environment file**. Ensure you have a `.env` file at the root of the project with the following PostgreSQL credentials:

   ```env
   POSTGRES_USER=username
   POSTGRES_PASSWORD=password
   POSTGRES_DB=sampledb
   ```

3. **Start the containers** using Docker Compose:

   ```bash
   docker-compose up -d --build
   ```

   This command will:
   - Start the PostgreSQL database
   - Build and start the `productmgmt` service (Port `3000` & `3003`)
   - Build and start the `ordermgmt` service (Port `3001` & `3002`)
   - Build and start the `dashboard` Next.js app (Port `3004`)
   - Automatically run the database seeder (`seed_data.sql` and `init-db.sh`) to setup initial tables and data.

4. **Access the application**:
   - **Dashboard (UI):** [http://localhost:3004](http://localhost:3004)
   - **Product Service API:** [http://localhost:3000](http://localhost:3000)
   - **Order Service API:** [http://localhost:3001](http://localhost:3001)

5. **Stop the containers**:
   ```bash
   docker-compose down
   ```

---

## 🛠️ Running Without Docker

If you prefer to run the services locally on your host machine, follow these steps:

### 1. Database Setup
Ensure you have PostgreSQL installed and running on default port `5432`.
1. Create a database and user matching your `.env` credentials (or update `.env` to match your local postgres credentials).
   - Database Name: `sampledb`
   - Username: `username`
   - Password: `password`
2. Run the `seed_data.sql` file in your database to create the necessary tables and initial data.

### 2. Start the Product Management Service
Open a new terminal and run the following:

```bash
cd productmgmt
npm install
```

Set the required environment variables (you can create a `.env` file in the `productmgmt` directory) and run the app:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=astrocipher
DB_PASSWORD=Nova7812Matrix
DB_DATABASE=revestdb
```
```bash
npm run start:dev
```
*Service will start on port `3000` (and `3003`).*

### 3. Start the Order Management Service
Open another terminal:

```bash
cd ordermgmt
npm install
```

Set the required environment variables:
```env
DATABASE_URL=postgres://astrocipher:Nova7812Matrix@localhost:5432/revestdb
PRODUCT_SERVICE_HOST=localhost
PRODUCT_SERVICE_PORT=3003
```
```bash
npm run start:dev
```
*Service will start on port `3001` (and `3002`).*

### 4. Start the Dashboard (Frontend)
Open a final terminal:

```bash
cd dashboard
npm install
```

Set the required environment variable for the API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```
```bash
npm run dev
```
*Dashboard will start on port `3004`.*

---

## 📡 Available Endpoints

### Product Management Service (Port `3000`)

**Categories (`/categories`)**
- `GET /categories` - Retrieve all categories
- `GET /categories/:id` - Retrieve a specific category
- `POST /categories` - Create a new category
- `PATCH /categories/:id` - Update a category
- `DELETE /categories/:id` - Delete a category

**Products (`/products`)**
- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve a specific product
- `POST /products` - Create a new product
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product
- `POST /products/:id/variants` - Add a variant to a product
- `DELETE /products/:id/variants/:variantId` - Remove a variant from a product

**Inventory (`/inventory`)**
- `GET /inventory/:sku` - Retrieve inventory by SKU
- `PATCH /inventory/:id/adjust` - Adjust stock for an inventory item
- `PATCH /inventory/:id/reserve` - Reserve stock for an inventory item

### Order Management Service (Port `3001`)

**Orders (`/orders`)**
- `GET /orders` - Retrieve all orders
- `GET /orders/:id` - Retrieve a specific order
- `GET /orders/customer/:customerId` - Retrieve orders by customer ID
- `POST /orders` - Create a new order
- `PATCH /orders/:id/status` - Update the status of an order

---

## 🧪 Testing the Endpoints

A helper script is included at the root of the project to quickly ping the main GET endpoints and verify that the services are up and running.

1. Make sure the services are running (either via Docker or locally).
2. Run the test script from the project root:

```bash
./test-endpoints.sh
```

This will run a series of simple requests to the `productmgmt` and `ordermgmt` services and output their HTTP status codes.

---

## Summary
You can now access the dashboard application at [http://localhost:3004](http://localhost:3004).

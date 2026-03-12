# Order & Product Management POC

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Running with Docker (Recommended)](#-running-with-docker-recommended)
4. [Running Without Docker](#️-running-without-docker)
   - [1. Product Management Service](#1-start-the-product-management-service)
   - [2. Order Management Service](#2-start-the-order-management-service)
   - [3. Dashboard (Frontend)](#3-start-the-dashboard-frontend)
   - [4. Database Setup](#4-database-setup)
5. [Available Endpoints](#-available-endpoints)
   - [Product Management Service](#product-management-service-port-3000)
   - [Order Management Service](#order-management-service-port-3001)
6. [Testing the Endpoints](#-testing-the-endpoints)
7. [Form Fields Guide](#-form-fields-guide)
   - [1. Full Name](#1-full-name)
   - [2. Email](#2-email)
   - [3. Gender](#3-gender)
   - [4. Love React?](#4-love-react)
   - [Adding a New Field](#adding-a-new-field)
8. [Summary](#summary)

---

## Overview

This project consists of three main services and a PostgreSQL database:
1. **Product Management Service (productmgmt)** - A NestJS backend service.
2. **Order Management Service (ordermgmt)** - A NestJS backend service.
3. **Dashboard** - A Next.js frontend application.
4. **PostgreSQL Database** - Stores data for the services.

## Prerequisites
- **Docker & Docker Compose** (for running with Docker)
- **Node.js** (v20 or higher recommended) and **npm** (for running without Docker)
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
   docker compose up -d --build
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
   docker compose down
   ```

---

## 🛠️ Running Without Docker

If you prefer to run the services locally on your host machine, follow these steps:

### 1. Start the Product Management Service
Open a new terminal and run the following:

```bash
cd productmgmt
npm install
```

Set the required environment variables (you can create a `.env` file in the `productmgmt` directory) and run the app:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE= sampledb
```
```bash
npm run start:dev
```
*Service will start on port `3000` (and `3003`).*

### 2. Start the Order Management Service
Open another terminal:

```bash
cd ordermgmt
npm install
```

Set the required environment variables:
```env
DATABASE_URL=postgres://username:password@localhost:5432/sampledb
PRODUCT_SERVICE_HOST=localhost
PRODUCT_SERVICE_PORT=3003
```
```bash
npm run start:dev
```
*Service will start on port `3001` (and `3002`).*

### 3. Start the Dashboard (Frontend)
Open a final terminal:

```bash
cd dashboard
npm install
```
 start the application
```bash
npm run dev
```
*Dashboard will start on port `3004`.*

---

### 4. Database Setup
Ensure you have PostgreSQL installed and running on default port `5432`.
1. Create a database and user matching your `.env` credentials (or update `.env` to match your local postgres credentials).
   - Database Name: `sampledb`
   - Username: `username`
   - Password: `password`
2. Run the `seed_data.sql` file in your database to create the initial data.

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

---

## 📝 Form Fields Guide

The dashboard form fields are configured in [`dashboard/src/data/formData.json`](file:///home/amit/code/crispy-octo-revest/dashboard/src/data/formData.json).  
Each entry in the `data` array represents one form field.

### Index

| # | Field Name | Field Type | Required |
|---|------------|------------|----------|
| [1](#1-full-name) | Full Name | TEXT | ✅ |
| [2](#2-email) | Email | TEXT | ✅ |
| [3](#3-gender) | Gender | RADIO | ✅ |
| [4](#4-love-react) | Love React? | LIST | ✅ |

---

#### 1. Full Name

```json
{
  "id": 1,
  "name": "Full Name",
  "fieldType": "TEXT",
  "minLength": 1,
  "maxLength": 100,
  "defaultValue": "John Doe",
  "required": true
}
```

| Property | Description |
|----------|-------------|
| `name` | Label shown in the UI |
| `fieldType` | `TEXT` renders a plain text input |
| `minLength` | Minimum number of characters allowed |
| `maxLength` | Maximum number of characters allowed |
| `defaultValue` | Pre-filled value when the form loads |
| `required` | Whether the field must be filled before submission |

---

#### 2. Email

```json
{
  "id": 2,
  "name": "Email",
  "fieldType": "TEXT",
  "minLength": 1,
  "maxLength": 50,
  "defaultValue": "hello@mail.com",
  "required": true
}
```

| Property | Description |
|----------|-------------|
| `name` | Label shown in the UI |
| `fieldType` | `TEXT` renders a plain text input |
| `minLength` | Minimum number of characters allowed |
| `maxLength` | Maximum number of characters allowed |
| `defaultValue` | Pre-filled email address |
| `required` | Whether the field must be filled before submission |

---

#### 3. Gender

```json
{
  "id": 6,
  "name": "Gender",
  "fieldType": "RADIO",
  "defaultValue": "Male",
  "required": true,
  "listOfValues1": ["Male", "Female", "Others"]
}
```

| Property | Description |
|----------|-------------|
| `name` | Label shown in the UI |
| `fieldType` | `RADIO` renders a radio-button group |
| `defaultValue` | Option selected by default |
| `required` | Whether an option must be chosen |
| `listOfValues1` | Array of options displayed as radio buttons — add, remove, or rename entries here |

---

#### 4. Love React?

```json
{
  "id": 7,
  "name": "Love React?",
  "fieldType": "LIST",
  "defaultValue": "Yes",
  "required": true,
  "listOfValues1": ["Yes", "No"]
}
```

| Property | Description |
|----------|-------------|
| `name` | Label shown in the UI |
| `fieldType` | `LIST` renders a dropdown/select input |
| `defaultValue` | Option pre-selected when the form loads |
| `required` | Whether a selection must be made |
| `listOfValues1` | Array of dropdown options — add, remove, or rename entries here |

---

### Adding a New Field

Append a new object to the `data` array in `formData.json`:

```json
{
  "id": <unique_number>,
  "name": "Field Label",
  "fieldType": "TEXT | RADIO | LIST",
  "minLength": 1,
  "maxLength": 255,
  "defaultValue": "default",
  "required": true,
  "listOfValues1": []
}
```

> **Note:** `listOfValues1` is only required for `RADIO` and `LIST` field types.  
> `minLength` / `maxLength` apply only to `TEXT` fields.

---

## Summary
You can now access the dashboard application at [http://localhost:3004](http://localhost:3004).

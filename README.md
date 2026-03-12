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

## Summary
You can now access the dashboard application at [http://localhost:3004](http://localhost:3004).

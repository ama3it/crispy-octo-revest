#!/bin/sh

# Configuration from environment
USER=${POSTGRES_USER:-astrocipher}
DB=${POSTGRES_DB:-revestdb}
HOST=${DB_HOST:-postgres}

echo "Waiting for PostgreSQL to be ready on $HOST..."
until pg_isready -h $HOST -U $USER; do
  echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "Postgres is up - checking for tables..."

# Wait for the 'products' table to be created by the application services
until psql -h $HOST -U $USER -d $DB -c "SELECT 1 FROM products LIMIT 1;" > /dev/null 2>&1; do
  echo "Tables not found - waiting for application to initialize schema..."
  sleep 5
done

echo "Tables detected! Seeding data from /seed_data.sql..."
psql -h $HOST -U $USER -d $DB -f /seed_data.sql

echo "Seed data uploaded successfully!"

#!/bin/bash

echo " Resetting Food Inventory Database..."

DB_NAME="food_inventory_db"

# Check if we're in the right directory
if [ ! -f "backend/app/main.py" ]; then
    echo " Please run this script from the project root directory"
    exit 1
fi

# Navigate to backend
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo " Virtual environment not found. Please run setup_manual.sh first"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

echo "⚠️  This will delete all data in the database!"
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Database reset cancelled"
    exit 1
fi

# Drop and recreate database
echo "Dropping database $DB_NAME..."
dropdb $DB_NAME 2>/dev/null || echo "Database didn't exist"

echo "Creating database $DB_NAME..."
createdb $DB_NAME

# Run migrations
echo "Running migrations..."
alembic upgrade head

# Seed data
echo "Adding sample data..."
python seed_data.py

echo "✅ Database reset completed!"
echo "🌱 Sample data has been added"
echo ""
echo "You can now start the backend with: ./start_backend.sh"
#!/bin/bash

echo " Starting Food Inventory Backend..."

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
echo "Activating virtual environment..."
source venv/bin/activate

# Check if database is accessible
echo "Checking database connection..."
python -c "
from app.database import engine
try:
    with engine.connect() as conn:
        print('✅ Database connection successful')
except Exception as e:
    print(f' Database connection failed: {e}')
    print('Please ensure PostgreSQL is running and database exists')
    exit(1)
"

if [ $? -ne 0 ]; then
    exit 1
fi

# Start the server
echo " Starting FastAPI server..."
echo " Backend will be available at: http://localhost:8000"
echo " API Documentation at: http://localhost:8000/docs"
echo " Press Ctrl+C to stop the server"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
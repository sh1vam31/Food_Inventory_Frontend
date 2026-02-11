#!/bin/bash

# Script to run backend locally with SQLite database
# This ensures environment variables are set correctly for local development

echo "🚀 Starting backend in local development mode..."
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend"

# Unset any production DATABASE_URL that might be set
unset DATABASE_URL
unset ENVIRONMENT

# Export local development environment variables
export DATABASE_URL="sqlite:///./food_inventory.db"
export ENVIRONMENT="development"
export SECRET_KEY="your-secret-key-change-in-production-make-it-very-long-and-random"
export ALGORITHM="HS256"
export ACCESS_TOKEN_EXPIRE_MINUTES="30"
export REFRESH_TOKEN_EXPIRE_DAYS="7"

echo "✅ Environment configured for local development"
echo "📊 Using SQLite database: food_inventory.db"
echo ""

# Check if virtual environment exists
if [ -d "venv" ]; then
    echo "🐍 Activating virtual environment..."
    source venv/bin/activate
else
    echo "⚠️  Virtual environment not found. Creating one..."
    python3 -m venv venv
    source venv/bin/activate
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
fi

echo ""
echo "🌐 Starting Uvicorn server on http://localhost:8000"
echo "📚 API docs available at http://localhost:8000/docs"
echo ""

# Run the application
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

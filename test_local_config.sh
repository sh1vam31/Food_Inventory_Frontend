#!/bin/bash

# Quick test to verify local database configuration

echo "🧪 Testing local database configuration..."
echo ""

cd backend

# Unset production DATABASE_URL
unset DATABASE_URL
export DATABASE_URL="sqlite:///./food_inventory.db"
export ENVIRONMENT="development"

# Activate virtual environment
source venv/bin/activate

# Test configuration
echo "Testing configuration import..."
python3 -c "
from app.core.config import settings
print('✅ Configuration loaded successfully!')
print(f'   Environment: {settings.environment}')
print(f'   Database Type: {\"SQLite\" if not settings.is_postgresql else \"PostgreSQL\"}')
print(f'   Database URL: {settings.database_url}')
"

echo ""
echo "✅ Configuration test passed! You can now run the backend."

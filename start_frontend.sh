#!/bin/bash

echo " Starting Food Inventory Frontend..."

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    echo " Please run this script from the project root directory"
    exit 1
fi

# Navigate to frontend
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo " Node modules not found. Please run setup_manual.sh first"
    exit 1
fi

# Check if backend is running
echo "Checking if backend is running..."
if curl -s http://localhost:8000/health > /dev/null; then
    echo " Backend is running"
else
    echo "  Backend doesn't seem to be running on port 8000"
    echo "   Please start the backend first with: ./start_backend.sh"
    echo "   Continuing anyway..."
fi

# Start the development server
echo "Starting Next.js development server..."
echo "Frontend will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
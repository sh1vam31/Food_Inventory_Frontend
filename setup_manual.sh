#!/bin/bash

echo "🚀 Setting up Food Order & Inventory Management System (Manual Setup)"
echo "=================================================================="

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    echo "   macOS: brew install python"
    echo "   Ubuntu: sudo apt install python3 python3-pip python3-venv"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   macOS: brew install node"
    echo "   Ubuntu: curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs"
    exit 1
fi

# Check PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed, but that's OK - we'll use SQLite for development."
    echo "   If you want to use PostgreSQL later, install it with:"
    echo "   macOS: brew install postgresql && brew services start postgresql"
    echo "   Ubuntu: sudo apt install postgresql postgresql-contrib"
else
    echo "✅ PostgreSQL is available (optional for this setup)"
fi

echo "✅ All prerequisites are installed"
echo ""

# Setup Backend
echo "🔧 Setting up Backend..."
cd backend

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "✅ Backend dependencies installed"
cd ..

# Setup Frontend
echo "🔧 Setting up Frontend..."
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

echo "✅ Frontend dependencies installed"
cd ..

# Database setup
echo "🗄️ Setting up Database..."

# SQLite doesn't need manual database creation
echo "Using SQLite database (no setup required)"

# Run migrations
echo "Running database migrations..."
cd backend
source venv/bin/activate
alembic upgrade head
echo "✅ Database migrations completed"

# Seed sample data
echo "🌱 Adding sample data..."
python seed_data.py
echo "✅ Sample data added"

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 To start the application:"
echo ""
echo "1. Start the backend (Terminal 1):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload"
echo ""
echo "2. Start the frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "🌐 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "🧪 Test the system:"
echo "   python test_system.py"
echo ""
echo " The inventory deduction logic is ready to demo!"
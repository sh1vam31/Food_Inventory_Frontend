#!/bin/bash

echo "🚀 Setting up Git repository for Food Inventory Management System"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore file..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Production builds
.next/
dist/
build/

# Environment variables
.env
.env.local
.env.production
.env.staging
*.env

# Database
*.db
*.sqlite
*.sqlite3

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
*.log
logs/

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Vercel
.vercel

# Render
.render
EOF
    echo "✅ .gitignore created"
else
    echo "✅ .gitignore already exists"
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Food Inventory Management System

Features:
- FastAPI backend with SQLAlchemy ORM
- Next.js frontend with TypeScript
- Automatic inventory deduction system
- Raw materials management
- Food items with recipes
- Order processing with atomic transactions
- Dark/light theme support
- Production-ready deployment configuration"

echo "🎉 Git repository setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a repository on GitHub"
echo "2. Add remote origin: git remote add origin <your-repo-url>"
echo "3. Push to GitHub: git push -u origin main"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
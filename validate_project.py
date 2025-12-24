#!/usr/bin/env python3
"""
Project validation script to ensure all files are in place
"""

import os
import sys

def check_file(path, description):
    """Check if a file exists"""
    if os.path.exists(path):
        print(f"✅ {description}")
        return True
    else:
        print(f"❌ {description} - Missing: {path}")
        return False

def check_directory(path, description):
    """Check if a directory exists"""
    if os.path.isdir(path):
        print(f"✅ {description}")
        return True
    else:
        print(f"❌ {description} - Missing: {path}")
        return False

def main():
    """Validate project structure"""
    print("🔍 Validating Food Order & Inventory Management System")
    print("=" * 55)
    
    all_good = True
    
    # Root files
    all_good &= check_file("README.md", "README documentation")
    all_good &= check_file("setup_manual.sh", "Manual setup script")
    all_good &= check_file("start_backend.sh", "Backend start script")
    all_good &= check_file("start_frontend.sh", "Frontend start script")
    all_good &= check_file("test_system.py", "System test script")
    all_good &= check_file("check_requirements.py", "Requirements checker")
    
    # Backend structure
    print("\n📁 Backend Structure:")
    all_good &= check_directory("backend", "Backend directory")
    all_good &= check_file("backend/requirements.txt", "Python dependencies")
    all_good &= check_file("backend/alembic.ini", "Alembic configuration")
    all_good &= check_file("backend/seed_data.py", "Database seed script")
    
    # Backend app structure
    all_good &= check_directory("backend/app", "App directory")
    all_good &= check_file("backend/app/main.py", "FastAPI main application")
    all_good &= check_file("backend/app/database.py", "Database configuration")
    
    # Backend models
    all_good &= check_directory("backend/app/models", "Models directory")
    all_good &= check_file("backend/app/models/raw_material.py", "Raw Material model")
    all_good &= check_file("backend/app/models/food_item.py", "Food Item model")
    all_good &= check_file("backend/app/models/order.py", "Order model")
    
    # Backend schemas
    all_good &= check_directory("backend/app/schemas", "Schemas directory")
    all_good &= check_file("backend/app/schemas/raw_material.py", "Raw Material schema")
    all_good &= check_file("backend/app/schemas/food_item.py", "Food Item schema")
    all_good &= check_file("backend/app/schemas/order.py", "Order schema")
    
    # Backend services (CRITICAL LOGIC)
    all_good &= check_directory("backend/app/services", "Services directory")
    all_good &= check_file("backend/app/services/raw_material_service.py", "Raw Material service")
    all_good &= check_file("backend/app/services/food_item_service.py", "Food Item service")
    all_good &= check_file("backend/app/services/order_service.py", "Order service (CRITICAL)")
    
    # Backend routers
    all_good &= check_directory("backend/app/routers", "Routers directory")
    all_good &= check_file("backend/app/routers/raw_materials.py", "Raw Materials router")
    all_good &= check_file("backend/app/routers/food_items.py", "Food Items router")
    all_good &= check_file("backend/app/routers/orders.py", "Orders router")
    
    # Frontend structure
    print("\n📁 Frontend Structure:")
    all_good &= check_directory("frontend", "Frontend directory")
    all_good &= check_file("frontend/package.json", "Node.js dependencies")
    all_good &= check_file("frontend/tailwind.config.js", "Tailwind configuration")
    all_good &= check_file("frontend/tsconfig.json", "TypeScript configuration")
    
    # Frontend app structure
    all_good &= check_directory("frontend/app", "App directory")
    all_good &= check_file("frontend/app/layout.tsx", "Root layout")
    all_good &= check_file("frontend/app/page.tsx", "Dashboard page")
    all_good &= check_file("frontend/app/globals.css", "Global styles")
    
    # Frontend pages
    all_good &= check_directory("frontend/app/inventory", "Inventory pages")
    all_good &= check_file("frontend/app/inventory/page.tsx", "Inventory list page")
    all_good &= check_file("frontend/app/inventory/add/page.tsx", "Add raw material page")
    
    all_good &= check_directory("frontend/app/menu", "Menu pages")
    all_good &= check_file("frontend/app/menu/page.tsx", "Menu list page")
    all_good &= check_file("frontend/app/menu/add/page.tsx", "Add food item page")
    
    all_good &= check_directory("frontend/app/orders", "Order pages")
    all_good &= check_file("frontend/app/orders/page.tsx", "Orders list page")
    all_good &= check_file("frontend/app/orders/new/page.tsx", "New order page (CRITICAL)")
    
    # Frontend utilities
    all_good &= check_directory("frontend/lib", "Lib directory")
    all_good &= check_file("frontend/lib/api.ts", "API client")
    all_good &= check_file("frontend/types/index.ts", "TypeScript types")
    all_good &= check_file("frontend/components/Navigation.tsx", "Navigation component")
    
    print("\n" + "=" * 55)
    
    if all_good:
        print("🎉 PROJECT VALIDATION PASSED!")
        print("✅ All required files are present")
        print("✅ Backend structure is complete")
        print("✅ Frontend structure is complete")
        print("✅ Critical inventory logic files are present")
        print("\n🚀 Ready to run the system!")
        print("   Run: ./setup_manual.sh")
        print("   Then: ./start_backend.sh and ./start_frontend.sh")
        return 0
    else:
        print("❌ PROJECT VALIDATION FAILED!")
        print("Some required files are missing.")
        print("Please ensure all files are created properly.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
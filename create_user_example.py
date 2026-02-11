#!/usr/bin/env python3
"""
Script to create new users in the Food Inventory Management System
Run this after starting the backend server
"""

import requests
import json

# Configuration
API_BASE_URL = "http://localhost:8000"
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

def login_as_admin():
    """Login as admin and get access token"""
    login_data = {
        "username": ADMIN_USERNAME,
        "password": ADMIN_PASSWORD
    }
    
    response = requests.post(f"{API_BASE_URL}/api/auth/login", json=login_data)
    
    if response.status_code == 200:
        token_data = response.json()
        return token_data["access_token"]
    else:
        print(f"❌ Login failed: {response.json()}")
        return None

def create_user(access_token, user_data):
    """Create a new user"""
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(f"{API_BASE_URL}/api/auth/register", json=user_data, headers=headers)
    
    if response.status_code == 201:
        user = response.json()
        print(f"✅ User created successfully:")
        print(f"   Username: {user['username']}")
        print(f"   Email: {user['email']}")
        print(f"   Role: {user['role']}")
        print(f"   Full Name: {user['full_name']}")
        return user
    else:
        print(f"❌ User creation failed: {response.json()}")
        return None

def main():
    print("🔐 Food Inventory User Creation Tool")
    print("=" * 50)
    
    # Login as admin
    print("1. Logging in as admin...")
    access_token = login_as_admin()
    
    if not access_token:
        print("❌ Could not login as admin. Make sure the backend is running and admin credentials are correct.")
        return
    
    print("✅ Admin login successful!")
    print()
    
    # Example users to create
    example_users = [
        {
            "username": "john_manager",
            "email": "john@restaurant.com",
            "password": "manager123",
            "full_name": "John Smith",
            "role": "order_maintainer"
        },
        {
            "username": "sarah_admin",
            "email": "sarah@restaurant.com", 
            "password": "admin456",
            "full_name": "Sarah Johnson",
            "role": "admin"
        },
        {
            "username": "mike_staff",
            "email": "mike@restaurant.com",
            "password": "staff789",
            "full_name": "Mike Wilson",
            "role": "order_maintainer"
        }
    ]
    
    print("2. Creating example users...")
    print()
    
    for i, user_data in enumerate(example_users, 1):
        print(f"Creating user {i}/3: {user_data['username']}")
        create_user(access_token, user_data)
        print()
    
    print("🎉 User creation completed!")
    print()
    print("📋 Summary of created users:")
    print("=" * 50)
    for user in example_users:
        print(f"Username: {user['username']}")
        print(f"Password: {user['password']}")
        print(f"Role: {user['role']}")
        print(f"Email: {user['email']}")
        print("-" * 30)

if __name__ == "__main__":
    main()
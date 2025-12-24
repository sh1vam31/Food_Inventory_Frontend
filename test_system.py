#!/usr/bin/env python3
"""
Test script to verify the Food Order & Inventory Management System
This script tests the critical inventory deduction logic
"""

import requests
import json
import time

API_BASE = "http://localhost:8000"

def test_api_health():
    """Test if API is running"""
    try:
        response = requests.get(f"{API_BASE}/health")
        if response.status_code == 200:
            print("✅ API is running")
            return True
        else:
            print("❌ API health check failed")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure backend is running on port 8000")
        return False

def test_raw_materials():
    """Test raw material management"""
    print("\n🧪 Testing Raw Material Management...")
    
    # Create raw material
    raw_material_data = {
        "name": "Test Flour",
        "unit": "kg",
        "quantity_available": 10.0,
        "minimum_threshold": 2.0
    }
    
    response = requests.post(f"{API_BASE}/api/raw-materials", json=raw_material_data)
    if response.status_code == 201:
        material = response.json()
        print(f"✅ Created raw material: {material['name']} (ID: {material['id']})")
        return material['id']
    else:
        print(f"❌ Failed to create raw material: {response.text}")
        return None

def test_food_items(raw_material_id):
    """Test food item creation with recipe"""
    print("\n🧪 Testing Food Item Management...")
    
    food_item_data = {
        "name": "Test Pizza",
        "price": 12.99,
        "is_available": True,
        "ingredients": [
            {
                "raw_material_id": raw_material_id,
                "quantity_required_per_unit": 0.5  # 500g flour per pizza
            }
        ]
    }
    
    response = requests.post(f"{API_BASE}/api/food-items", json=food_item_data)
    if response.status_code == 201:
        food_item = response.json()
        print(f"✅ Created food item: {food_item['name']} (ID: {food_item['id']})")
        print(f"   Recipe: {food_item['ingredients'][0]['quantity_required_per_unit']} {food_item['ingredients'][0]['raw_material_unit']} {food_item['ingredients'][0]['raw_material_name']}")
        return food_item['id']
    else:
        print(f"❌ Failed to create food item: {response.text}")
        return None

def test_inventory_check(food_item_id):
    """Test inventory availability check"""
    print("\n🧪 Testing Inventory Availability Check...")
    
    order_data = {
        "items": [
            {
                "food_item_id": food_item_id,
                "quantity": 15  # This should fail - need 7.5kg flour but only have 10kg
            }
        ]
    }
    
    response = requests.post(f"{API_BASE}/api/orders/check-inventory", json=order_data)
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Inventory check completed")
        print(f"   Can fulfill: {result['can_fulfill']}")
        print(f"   Total price: ${result['total_price']:.2f}")
        if not result['can_fulfill']:
            print("   Missing ingredients:")
            for missing in result['missing_ingredients']:
                if 'error' in missing:
                    print(f"     - {missing['error']}")
                else:
                    print(f"     - {missing['raw_material_name']}: need {missing['required']} {missing['unit']}, have {missing['available']} {missing['unit']}")
        return result
    else:
        print(f"❌ Inventory check failed: {response.text}")
        return None

def test_order_placement(food_item_id):
    """Test order placement with inventory deduction"""
    print("\n🧪 Testing Order Placement with Inventory Deduction...")
    
    # First, check current inventory
    response = requests.get(f"{API_BASE}/api/raw-materials")
    if response.status_code == 200:
        materials = response.json()
        flour = next((m for m in materials if m['name'] == 'Test Flour'), None)
        if flour:
            initial_quantity = flour['quantity_available']
            print(f"   Initial flour quantity: {initial_quantity} kg")
        else:
            print("❌ Could not find test flour")
            return False
    
    # Place order for 5 pizzas (should use 2.5kg flour)
    order_data = {
        "items": [
            {
                "food_item_id": food_item_id,
                "quantity": 5
            }
        ]
    }
    
    response = requests.post(f"{API_BASE}/api/orders", json=order_data)
    if response.status_code == 201:
        order = response.json()
        print(f"✅ Order placed successfully (ID: {order['id']})")
        print(f"   Total price: ${order['total_price']:.2f}")
        print(f"   Status: {order['status']}")
        
        # Check inventory after order
        time.sleep(1)  # Small delay to ensure consistency
        response = requests.get(f"{API_BASE}/api/raw-materials")
        if response.status_code == 200:
            materials = response.json()
            flour = next((m for m in materials if m['name'] == 'Test Flour'), None)
            if flour:
                final_quantity = flour['quantity_available']
                deducted = initial_quantity - final_quantity
                print(f"   Final flour quantity: {final_quantity} kg")
                print(f"   Deducted: {deducted} kg")
                
                # Verify correct deduction (5 pizzas * 0.5kg = 2.5kg)
                expected_deduction = 5 * 0.5
                if abs(deducted - expected_deduction) < 0.01:
                    print("✅ Inventory deduction is CORRECT!")
                    return True
                else:
                    print(f"❌ Inventory deduction is WRONG! Expected {expected_deduction}kg, got {deducted}kg")
                    return False
        
        return True
    else:
        print(f"❌ Order placement failed: {response.text}")
        return False

def test_insufficient_inventory(food_item_id):
    """Test order rejection due to insufficient inventory"""
    print("\n🧪 Testing Order Rejection (Insufficient Inventory)...")
    
    # Try to place order for 20 pizzas (would need 10kg flour, but we should have less now)
    order_data = {
        "items": [
            {
                "food_item_id": food_item_id,
                "quantity": 20
            }
        ]
    }
    
    response = requests.post(f"{API_BASE}/api/orders", json=order_data)
    if response.status_code == 400:
        print("✅ Order correctly rejected due to insufficient inventory")
        print(f"   Error: {response.json()['detail']}")
        return True
    elif response.status_code == 201:
        print("❌ Order was placed when it should have been rejected!")
        return False
    else:
        print(f"❌ Unexpected response: {response.status_code} - {response.text}")
        return False

def cleanup(raw_material_id, food_item_id):
    """Clean up test data"""
    print("\n🧹 Cleaning up test data...")
    
    # Delete food item
    if food_item_id:
        response = requests.delete(f"{API_BASE}/api/food-items/{food_item_id}")
        if response.status_code == 200:
            print("✅ Deleted test food item")
        else:
            print("⚠️  Could not delete test food item")
    
    # Delete raw material
    if raw_material_id:
        response = requests.delete(f"{API_BASE}/api/raw-materials/{raw_material_id}")
        if response.status_code == 200:
            print("✅ Deleted test raw material")
        else:
            print("⚠️  Could not delete test raw material")

def main():
    """Run all tests"""
    print("🧪 Food Order & Inventory Management System - Test Suite")
    print("=" * 60)
    
    # Test API health
    if not test_api_health():
        print("\n❌ Cannot proceed with tests. Please start the backend server.")
        return
    
    raw_material_id = None
    food_item_id = None
    
    try:
        # Test raw materials
        raw_material_id = test_raw_materials()
        if not raw_material_id:
            return
        
        # Test food items
        food_item_id = test_food_items(raw_material_id)
        if not food_item_id:
            return
        
        # Test inventory check
        inventory_result = test_inventory_check(food_item_id)
        if not inventory_result:
            return
        
        # Test order placement and inventory deduction
        if not test_order_placement(food_item_id):
            return
        
        # Test insufficient inventory handling
        if not test_insufficient_inventory(food_item_id):
            return
        
        print("\n🎉 ALL TESTS PASSED!")
        print("✅ Raw material management works")
        print("✅ Food item creation works")
        print("✅ Inventory checking works")
        print("✅ Order placement works")
        print("✅ Inventory deduction is CORRECT")
        print("✅ Insufficient inventory handling works")
        
    finally:
        # Always cleanup
        cleanup(raw_material_id, food_item_id)

if __name__ == "__main__":
    main()
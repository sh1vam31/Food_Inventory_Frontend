'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Minus, ShoppingCart, AlertTriangle } from 'lucide-react'
import { api } from '@/lib/api'
import { FoodItem, OrderItemCreate, InventoryCheckResult } from '@/types'
import Link from 'next/link'

interface CartItem {
  food_item_id: number
  food_item: FoodItem
  quantity: number
}

export default function NewOrderPage() {
  const router = useRouter()
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [inventoryCheck, setInventoryCheck] = useState<InventoryCheckResult | null>(null)
  const [checkingInventory, setCheckingInventory] = useState(false)

  useEffect(() => {
    fetchFoodItems()
  }, [])

  useEffect(() => {
    if (cart.length > 0) {
      checkInventoryAvailability()
    } else {
      setInventoryCheck(null)
    }
  }, [cart])

  const fetchFoodItems = async () => {
    try {
      const data = await api.getFoodItems(true) // Only available items
      setFoodItems(data)
    } catch (error) {
      console.error('Error fetching food items:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkInventoryAvailability = async () => {
    if (cart.length === 0) return

    setCheckingInventory(true)
    try {
      const orderData = {
        items: cart.map(item => ({
          food_item_id: item.food_item_id,
          quantity: item.quantity
        }))
      }
      const result = await api.checkInventoryAvailability(orderData)
      setInventoryCheck(result)
    } catch (error) {
      console.error('Error checking inventory:', error)
    } finally {
      setCheckingInventory(false)
    }
  }

  const addToCart = (foodItem: FoodItem) => {
    const existingItem = cart.find(item => item.food_item_id === foodItem.id)
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.food_item_id === foodItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, {
        food_item_id: foodItem.id,
        food_item: foodItem,
        quantity: 1
      }])
    }
  }

  const updateQuantity = (foodItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.food_item_id !== foodItemId))
    } else {
      setCart(cart.map(item =>
        item.food_item_id === foodItemId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const removeFromCart = (foodItemId: number) => {
    setCart(cart.filter(item => item.food_item_id !== foodItemId))
  }

  const placeOrder = async () => {
    if (!inventoryCheck?.can_fulfill) {
      alert('Cannot place order due to insufficient inventory')
      return
    }

    setPlacing(true)
    try {
      const orderData = {
        items: cart.map(item => ({
          food_item_id: item.food_item_id,
          quantity: item.quantity
        }))
      }
      
      const order = await api.createOrder(orderData)
      alert(`Order #${order.id} placed successfully!`)
      router.push('/orders')
    } catch (error: any) {
      console.error('Error placing order:', error)
      alert(error.response?.data?.detail || 'Error placing order')
    } finally {
      setPlacing(false)
    }
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.food_item.price * item.quantity), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderBottomColor: '#2F855A' }}
        ></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/orders" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Place New Order</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Select food items and quantities for your order
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Available Menu Items</h2>
          
          {foodItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No menu items available</h3>
              <p className="text-gray-600 dark:text-gray-400">Add some food items to start taking orders.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300"
                  style={{
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Header Section */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                      <p className="text-xl font-bold dark:text-green-300" style={{ color: '#2F855A' }}>${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Ingredients Section - Flexible Content */}
                  <div className="flex-grow mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ingredients:</p>
                    <div className="space-y-1">
                      {item.ingredients.map((ingredient) => (
                        <div key={ingredient.id} className="text-sm text-gray-600 dark:text-gray-400">
                          {ingredient.quantity_required_per_unit} {ingredient.raw_material_unit} {ingredient.raw_material_name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart Button - Fixed at Bottom */}
                  <div className="mt-auto">
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg"
                      style={{ backgroundColor: '#2F855A' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#276749'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2F855A'
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="space-y-6">
          <div 
            className="sticky top-4 bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300"
            style={{
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.food_item_id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.food_item.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">${item.food_item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.food_item_id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-gray-900 dark:text-gray-100">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.food_item_id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Inventory Check Results */}
                {checkingInventory && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Checking inventory availability...</p>
                  </div>
                )}

                {inventoryCheck && !inventoryCheck.can_fulfill && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mr-2" />
                      <p className="text-sm font-medium text-red-800 dark:text-red-300">Insufficient Inventory</p>
                    </div>
                    <div className="space-y-1">
                      {inventoryCheck.missing_ingredients.map((missing, index) => (
                        <p key={index} className="text-sm text-red-700 dark:text-red-300">
                          {missing.error || `${missing.raw_material_name}: need ${missing.required} ${missing.unit}, have ${missing.available} ${missing.unit}`}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {inventoryCheck && inventoryCheck.can_fulfill && (
                  <div 
                    className="mb-4 p-3 rounded-lg border"
                    style={{ 
                      backgroundColor: 'rgba(47, 133, 90, 0.1)',
                      borderColor: 'rgba(47, 133, 90, 0.3)'
                    }}
                  >
                    <p className="text-sm font-medium" style={{ color: '#2F855A' }}>✓ All ingredients available</p>
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total:</span>
                    <span className="text-xl font-bold dark:text-green-300" style={{ color: '#2F855A' }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={placeOrder}
                    disabled={placing || !inventoryCheck?.can_fulfill || cart.length === 0}
                    className="w-full text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#2F855A' }}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.backgroundColor = '#276749'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.backgroundColor = '#2F855A'
                      }
                    }}
                  >
                    {placing ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, UtensilsCrossed } from 'lucide-react'
import { api } from '@/lib/api'
import { FoodItem } from '@/types'
import Link from 'next/link'

export default function MenuPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFoodItems()
  }, [])

  const fetchFoodItems = async () => {
    try {
      const data = await api.getFoodItems()
      setFoodItems(data)
    } catch (error) {
      console.error('Error fetching food items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAvailability = async (id: number, currentAvailability: boolean) => {
    try {
      await api.updateFoodItemAvailability(id, !currentAvailability)
      setFoodItems(foodItems.map(item => 
        item.id === id 
          ? { ...item, is_available: !currentAvailability }
          : item
      ))
    } catch (error) {
      console.error('Error updating availability:', error)
      alert('Error updating food item availability')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this food item?')) return

    try {
      await api.deleteFoodItem(id)
      setFoodItems(foodItems.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting food item:', error)
      alert('Error deleting food item')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 spinner-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Menu Items</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your food items and their recipes
          </p>
        </div>
        <Link href="/menu/add" className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Food Item
        </Link>
      </div>

      {/* Menu Items Grid */}
      {foodItems.length === 0 ? (
        <div className="text-center py-12">
          <UtensilsCrossed className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No menu items found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first food item to start building your menu.
          </p>
          <Link href="/menu/add" className="btn btn-primary">
            Add Food Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <div key={item.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${item.price.toFixed(2)}</p>
                </div>
                <span className={`badge ${item.is_available ? 'badge-success' : 'badge-danger'}`}>
                  {item.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              {/* Ingredients */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recipe:</h4>
                {item.ingredients.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No ingredients defined</p>
                ) : (
                  <div className="space-y-1">
                    {item.ingredients.map((ingredient) => (
                      <div key={ingredient.id} className="text-sm text-gray-600 dark:text-gray-400 flex justify-between">
                        <span>{ingredient.raw_material_name}</span>
                        <span>{ingredient.quantity_required_per_unit} {ingredient.raw_material_unit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleAvailability(item.id, item.is_available)}
                  className={`flex-1 btn ${item.is_available ? 'btn-secondary' : 'btn-success'}`}
                >
                  {item.is_available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-danger"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
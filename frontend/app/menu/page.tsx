'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, UtensilsCrossed, AlertTriangle } from 'lucide-react'
import { api } from '@/lib/api'
import { FoodItem } from '@/types'
import Link from 'next/link'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (deleteIngredients: boolean) => void
  foodItemName: string
}

function ConfirmationModal({ isOpen, onClose, onConfirm, foodItemName }: ConfirmationModalProps) {
  const [deleteIngredients, setDeleteIngredients] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Mark Item as Unavailable
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          You are about to mark "<strong>{foodItemName}</strong>" as unavailable.
        </p>
        
        <div className="mb-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={deleteIngredients}
              onChange={(e) => setDeleteIngredients(e.target.checked)}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Also remove ingredients from inventory
            </span>
          </label>
          {deleteIngredients && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-2 ml-7">
              This will reduce the quantity of raw materials used in this recipe by one unit each.
            </p>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => onConfirm(deleteIngredients)}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Mark Unavailable
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    foodItemId: number
    foodItemName: string
  }>({
    isOpen: false,
    foodItemId: 0,
    foodItemName: ''
  })

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
    // If marking as unavailable, show confirmation modal
    if (currentAvailability) {
      const foodItem = foodItems.find(item => item.id === id)
      if (foodItem) {
        setConfirmModal({
          isOpen: true,
          foodItemId: id,
          foodItemName: foodItem.name
        })
      }
    } else {
      // Marking as available - simple toggle
      try {
        await api.updateFoodItemAvailability(id, true)
        setFoodItems(foodItems.map(item => 
          item.id === id 
            ? { ...item, is_available: true }
            : item
        ))
      } catch (error) {
        console.error('Error updating availability:', error)
        alert('Error updating food item availability')
      }
    }
  }

  const handleConfirmUnavailable = async (deleteIngredients: boolean) => {
    const { foodItemId } = confirmModal
    
    try {
      const result = await api.updateFoodItemAvailability(foodItemId, false, deleteIngredients)
      
      setFoodItems(foodItems.map(item => 
        item.id === foodItemId 
          ? { ...item, is_available: false }
          : item
      ))
      
      // Show result message
      if (result.ingredients_deleted && result.deleted_ingredients) {
        const deletedCount = result.deleted_ingredients.filter(ing => !ing.error).length
        const errorCount = result.deleted_ingredients.filter(ing => ing.error).length
        
        let message = `Item marked as unavailable.\n`
        if (deletedCount > 0) {
          message += `${deletedCount} ingredient(s) removed from inventory.\n`
        }
        if (errorCount > 0) {
          message += `${errorCount} ingredient(s) could not be removed (insufficient stock).`
        }
        alert(message)
      } else if (deleteIngredients) {
        alert('Item marked as unavailable. No ingredients were removed from inventory.')
      } else {
        alert('Item marked as unavailable.')
      }
    } catch (error) {
      console.error('Error updating availability:', error)
      alert('Error updating food item availability')
    } finally {
      setConfirmModal({ isOpen: false, foodItemId: 0, foodItemName: '' })
    }
  }

  const handleCloseModal = () => {
    setConfirmModal({ isOpen: false, foodItemId: 0, foodItemName: '' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
        <Link href="/menu/add" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
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
          <Link href="/menu/add" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Add Food Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 flex flex-col h-full">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">${item.price.toFixed(2)}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.is_available 
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {item.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              {/* Ingredients Section - Flexible Content */}
              <div className="flex-grow mb-4">
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

              {/* Actions Section - Fixed at Bottom */}
              <div className="flex space-x-2 mt-auto">
                <Link
                  href={`/menu/edit/${item.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleToggleAvailability(item.id, item.is_available)}
                  className={`flex-1 font-medium py-2 px-3 rounded-lg transition-colors ${
                    item.is_available 
                      ? 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {item.is_available ? 'Mark Unavailable' : 'Mark Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmUnavailable}
        foodItemName={confirmModal.foodItemName}
      />
    </div>
  )
}
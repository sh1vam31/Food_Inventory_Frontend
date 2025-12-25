'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, AlertTriangle, Package, X } from 'lucide-react'
import { api } from '@/lib/api'
import { RawMaterial } from '@/types'
import Link from 'next/link'

interface RawMaterialWithUsage extends RawMaterial {
  is_used_in_recipes: boolean;
  food_items: string[];
  usage_count: number;
}

export default function InventoryPage() {
  const [rawMaterials, setRawMaterials] = useState<RawMaterialWithUsage[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'low-stock'>('all')

  useEffect(() => {
    fetchRawMaterials()
  }, [])

  const fetchRawMaterials = async () => {
    try {
      const data = await api.getRawMaterialsWithUsage()
      setRawMaterials(data)
    } catch (error) {
      console.error('Error fetching raw materials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const material = rawMaterials.find(item => item.id === id)
    if (!material) return

    let confirmMessage = `Are you sure you want to delete "${material.name}"?`
    
    if (material.is_used_in_recipes) {
      confirmMessage += `\n\n⚠️  WARNING: This ingredient is currently used in ${material.usage_count} food item(s):\n• ${material.food_items.join('\n• ')}\n\nDeleting this will prevent these food items from being prepared until you update their recipes.`
    }
    
    confirmMessage += '\n\nThis action cannot be undone.'
    
    if (!confirm(confirmMessage)) return

    try {
      await api.deleteRawMaterial(id)
      setRawMaterials(rawMaterials.filter(item => item.id !== id))
    } catch (error: any) {
      console.error('Error deleting raw material:', error)
      
      // Show the specific error message from the backend
      const errorMessage = error.response?.data?.detail || 'Error deleting raw material'
      alert(errorMessage)
    }
  }

  const filteredMaterials = filter === 'low-stock' 
    ? rawMaterials.filter(item => item.is_low_stock)
    : rawMaterials

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Raw Materials Inventory</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your raw materials and monitor stock levels
          </p>
        </div>
        <Link href="/inventory/add" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Raw Material
        </Link>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 dark:bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Items ({rawMaterials.length})
        </button>
        <button
          onClick={() => setFilter('low-stock')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'low-stock'
              ? 'bg-yellow-600 dark:bg-yellow-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Low Stock ({rawMaterials.filter(item => item.is_low_stock).length})
        </button>
      </div>

      {/* Inventory Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {filter === 'low-stock' ? 'No low stock items' : 'No raw materials found'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {filter === 'low-stock' 
              ? 'All your inventory levels are healthy!'
              : 'Get started by adding your first raw material.'
            }
          </p>
          {filter === 'all' && (
            <Link href="/inventory/add" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Add Raw Material
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{material.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unit: {material.unit}</p>
                </div>
                {material.is_low_stock && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Low Stock
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Available</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {Math.round(material.quantity_available * 100) / 100} {material.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        material.is_low_stock ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-green-500 dark:bg-green-400'
                      }`}
                      style={{
                        width: `${Math.min(
                          (material.quantity_available / (material.minimum_threshold * 2)) * 100,
                          100
                        )}%`
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Minimum Threshold</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {Math.round(material.minimum_threshold * 100) / 100} {material.unit}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  href={`/inventory/edit/${material.id}`}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium py-2 px-3 rounded-lg transition-colors text-center flex items-center justify-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium py-2 px-3 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
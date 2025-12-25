'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Plus, Trash2, X } from 'lucide-react'
import { api } from '@/lib/api'
import { RawMaterial, FoodItem } from '@/types'
import Link from 'next/link'

const ingredientSchema = z.object({
  raw_material_id: z.number().min(1, 'Please select a raw material'),
  quantity_required_per_unit: z.number().min(0.01, 'Quantity must be greater than 0')
})

const foodItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  is_available: z.boolean(),
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required')
})

type FormData = z.infer<typeof foodItemSchema>

export default function EditFoodItemPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([])
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(true)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(foodItemSchema),
    defaultValues: {
      name: '',
      price: 0,
      is_available: true,
      ingredients: [{ raw_material_id: 0, quantity_required_per_unit: 0 }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const [rawMaterialsData, foodItemData] = await Promise.all([
        api.getRawMaterials(),
        api.getFoodItem(parseInt(id))
      ])
      
      setRawMaterials(rawMaterialsData)
      setFoodItem(foodItemData)
      
      // Reset form with food item data
      reset({
        name: foodItemData.name,
        price: foodItemData.price,
        is_available: foodItemData.is_available,
        ingredients: foodItemData.ingredients.map(ing => ({
          raw_material_id: ing.raw_material_id,
          quantity_required_per_unit: ing.quantity_required_per_unit
        }))
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Error loading food item data')
    } finally {
      setFetchingData(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await api.updateFoodItem(parseInt(id), data)
      router.push('/menu')
    } catch (error: any) {
      console.error('Error updating food item:', error)
      alert(error.response?.data?.detail || 'Error updating food item')
    } finally {
      setLoading(false)
    }
  }

  const addIngredient = () => {
    append({ raw_material_id: 0, quantity_required_per_unit: 0 })
  }

  if (fetchingData) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!foodItem) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Food Item Not Found</h2>
        <Link href="/menu" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
          ← Back to Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/menu" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Food Item</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update "{foodItem.name}" and its recipe
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Basic Information</h3>
            
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                {...register('name')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Margherita Pizza, Chicken Sandwich"
              />
              {errors.name && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('price', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('is_available')}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Available for ordering
              </label>
            </div>
          </div>

          {/* Recipe */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recipe (Ingredients)</h3>
              <button
                type="button"
                onClick={addIngredient}
                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Ingredient
              </button>
            </div>

            {rawMaterials.length === 0 && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                  No raw materials found. You need to add raw materials first before updating food items.
                </p>
                <Link href="/inventory/add" className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 text-sm font-medium">
                  Add Raw Materials →
                </Link>
              </div>
            )}

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Raw Material *</label>
                    <select
                      {...register(`ingredients.${index}.raw_material_id`, { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value={0}>Select raw material</option>
                      {rawMaterials.map((material) => (
                        <option key={material.id} value={material.id}>
                          {material.name} ({material.unit})
                        </option>
                      ))}
                    </select>
                    {errors.ingredients?.[index]?.raw_material_id && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                        {errors.ingredients[index]?.raw_material_id?.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity per unit *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register(`ingredients.${index}.quantity_required_per_unit`, { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                      placeholder="0.00"
                    />
                    {errors.ingredients?.[index]?.quantity_required_per_unit && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                        {errors.ingredients[index]?.quantity_required_per_unit?.message}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 dark:text-gray-200 font-medium py-2 px-3 rounded-md transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {errors.ingredients && (
              <p className="text-red-600 dark:text-red-400 text-sm">{errors.ingredients.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading || rawMaterials.length === 0}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Updating...' : 'Update Food Item'}
            </button>
            <Link href="/menu" className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
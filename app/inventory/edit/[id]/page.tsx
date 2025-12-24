'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Package, AlertTriangle } from 'lucide-react'
import { api } from '@/lib/api'
import { RawMaterial, RawMaterialUpdate } from '@/types'
import Link from 'next/link'

const rawMaterialUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  unit: z.enum(['kg', 'gram', 'liter', 'piece'], {
    errorMap: () => ({ message: 'Please select a valid unit' })
  }),
  quantity_available: z.number().min(0, 'Quantity must be non-negative'),
  minimum_threshold: z.number().min(0, 'Minimum threshold must be non-negative')
})

type FormData = z.infer<typeof rawMaterialUpdateSchema>

export default function EditRawMaterialPage() {
  const params = useParams()
  const router = useRouter()
  const materialId = parseInt(params.id as string)
  
  const [material, setMaterial] = useState<RawMaterial | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(rawMaterialUpdateSchema)
  })

  useEffect(() => {
    if (materialId) {
      fetchMaterial()
    }
  }, [materialId])

  const fetchMaterial = async () => {
    try {
      const data = await api.getRawMaterial(materialId)
      setMaterial(data)
      
      // Reset form with fetched data
      reset({
        name: data.name,
        unit: data.unit as 'kg' | 'gram' | 'liter' | 'piece',
        quantity_available: data.quantity_available,
        minimum_threshold: data.minimum_threshold
      })
    } catch (error: any) {
      console.error('Error fetching raw material:', error)
      setError('Failed to load raw material details')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      await api.updateRawMaterial(materialId, data)
      router.push('/inventory')
    } catch (error: any) {
      console.error('Error updating raw material:', error)
      alert(error.response?.data?.detail || 'Error updating raw material')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 spinner-primary"></div>
      </div>
    )
  }

  if (error || !material) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/inventory" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Raw Material Not Found</h1>
        </div>
        
        <div className="card text-center py-12">
          <Package className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {error || 'Raw material not found'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The raw material you're trying to edit doesn't exist or has been removed.
          </p>
          <Link href="/inventory" className="btn btn-primary">
            Back to Inventory
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/inventory" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Raw Material</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Update the details of "{material.name}"
          </p>
        </div>
      </div>

      {/* Current Status Card */}
      <div className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center mb-4">
          <Package className="h-5 w-5 text-emerald-600 mr-2" />
          <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">Current Status</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-emerald-700 dark:text-emerald-400">Available Stock</p>
            <p className="text-xl font-bold text-emerald-800 dark:text-emerald-300">
              {Math.round(material.quantity_available * 100) / 100} {material.unit}
            </p>
          </div>
          <div>
            <p className="text-sm text-emerald-700 dark:text-emerald-400">Status</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              material.is_low_stock 
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
            }`}>
              {material.is_low_stock ? 'Low Stock' : 'In Stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="form-label">Name *</label>
            <input
              type="text"
              {...register('name')}
              className="form-input"
              placeholder="e.g., Flour, Sugar, Eggs"
            />
            {errors.name && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Unit */}
          <div>
            <label className="form-label">Unit *</label>
            <select {...register('unit')} className="form-input">
              <option value="">Select unit</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="gram">Gram (g)</option>
              <option value="liter">Liter (L)</option>
              <option value="piece">Piece</option>
            </select>
            {errors.unit && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.unit.message}</p>
            )}
          </div>

          {/* Quantity Available */}
          <div>
            <label className="form-label">Current Quantity *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('quantity_available', { valueAsNumber: true })}
              className="form-input"
              placeholder="0.00"
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Update the current stock quantity
            </p>
            {errors.quantity_available && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.quantity_available.message}</p>
            )}
          </div>

          {/* Quick Stock Adjustment */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Stock Adjustment</h4>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => {
                  const currentValue = material.quantity_available + 10
                  reset({
                    name: material.name,
                    unit: material.unit as 'kg' | 'gram' | 'liter' | 'piece',
                    quantity_available: currentValue,
                    minimum_threshold: material.minimum_threshold
                  })
                }}
                className="btn btn-secondary text-sm"
              >
                +10
              </button>
              <button
                type="button"
                onClick={() => {
                  const currentValue = Math.max(0, material.quantity_available + 5)
                  reset({
                    name: material.name,
                    unit: material.unit as 'kg' | 'gram' | 'liter' | 'piece',
                    quantity_available: currentValue,
                    minimum_threshold: material.minimum_threshold
                  })
                }}
                className="btn btn-secondary text-sm"
              >
                +5
              </button>
              <button
                type="button"
                onClick={() => {
                  const currentValue = Math.max(0, material.quantity_available - 5)
                  reset({
                    name: material.name,
                    unit: material.unit as 'kg' | 'gram' | 'liter' | 'piece',
                    quantity_available: currentValue,
                    minimum_threshold: material.minimum_threshold
                  })
                }}
                className="btn btn-secondary text-sm"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => {
                  const currentValue = Math.max(0, material.quantity_available - 10)
                  reset({
                    name: material.name,
                    unit: material.unit as 'kg' | 'gram' | 'liter' | 'piece',
                    quantity_available: currentValue,
                    minimum_threshold: material.minimum_threshold
                  })
                }}
                className="btn btn-secondary text-sm"
              >
                -10
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Click to quickly adjust the quantity, then save changes
            </p>
          </div>

          {/* Minimum Threshold */}
          <div>
            <label className="form-label">Minimum Threshold *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('minimum_threshold', { valueAsNumber: true })}
              className="form-input"
              placeholder="0.00"
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              You'll be alerted when stock falls below this level
            </p>
            {errors.minimum_threshold && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.minimum_threshold.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary flex-1"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/inventory" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>

      {/* Additional Info */}
      <div className="card bg-gray-50 dark:bg-gray-800/50">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Additional Information
        </h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p><strong>Created:</strong> {new Date(material.created_at).toLocaleString()}</p>
          <p><strong>ID:</strong> #{material.id}</p>
          {material.is_low_stock && (
            <div className="flex items-center text-yellow-600 dark:text-yellow-400">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>This item is currently below the minimum threshold</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
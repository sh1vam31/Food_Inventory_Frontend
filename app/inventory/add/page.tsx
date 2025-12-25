'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { api } from '@/lib/api'
import { RawMaterialCreate } from '@/types'
import Link from 'next/link'

const rawMaterialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  unit: z.enum(['kg', 'gram', 'liter', 'piece'], {
    errorMap: () => ({ message: 'Please select a valid unit' })
  }),
  quantity_available: z.number().min(0, 'Quantity must be non-negative'),
  minimum_threshold: z.number().min(0, 'Minimum threshold must be non-negative')
})

type FormData = z.infer<typeof rawMaterialSchema>

export default function AddRawMaterialPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(rawMaterialSchema)
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await api.createRawMaterial(data)
      router.push('/inventory')
    } catch (error: any) {
      console.error('Error creating raw material:', error)
      alert(error.response?.data?.detail || 'Error creating raw material')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/inventory" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Add Raw Material</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Add a new raw material to your inventory
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              placeholder="e.g., Flour, Sugar, Eggs"
            />
            {errors.name && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit *</label>
            <select {...register('unit')} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Initial Quantity *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('quantity_available', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              placeholder="0.00"
            />
            {errors.quantity_available && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.quantity_available.message}</p>
            )}
          </div>

          {/* Minimum Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Threshold *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('minimum_threshold', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
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
              disabled={loading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Creating...' : 'Create Raw Material'}
            </button>
            <Link href="/inventory" className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-md transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
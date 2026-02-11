'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, User, Calendar } from 'lucide-react'
import { api } from '@/lib/api'
import { Order } from '@/types'
import Link from 'next/link'

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = parseInt(params.id as string)
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const data = await api.getOrder(orderId)
      setOrder(data)
    } catch (error: any) {
      console.error('Error fetching order details:', error)
      setError('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteOrder = async () => {
    if (!order || !confirm('Mark this order as completed?')) return

    try {
      await api.completeOrder(order.id)
      setOrder({ ...order, status: 'COMPLETED' as const })
    } catch (error: any) {
      console.error('Error completing order:', error)
      alert(error.response?.data?.detail || 'Error completing order')
    }
  }

  const handleCancelOrder = async () => {
    if (!order || !confirm('Are you sure you want to cancel this order?')) return

    try {
      await api.cancelOrder(order.id)
      setOrder({ ...order, status: 'CANCELLED' as const })
    } catch (error: any) {
      console.error('Error cancelling order:', error)
      alert(error.response?.data?.detail || 'Error cancelling order')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PLACED':
        return <Clock className="h-5 w-5 text-teal-600" />
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PLACED':
        return 'badge badge-success'
      case 'CANCELLED':
        return 'badge badge-danger'
      case 'COMPLETED':
        return 'badge badge-gray'
      default:
        return 'badge badge-gray'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 spinner-primary"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/orders" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Not Found</h1>
        </div>
        
        <div className="card text-center py-12">
          <Package className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {error || 'Order not found'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/orders" className="btn btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/orders" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Order #{order.id}
            </h1>
            <span className={getStatusBadge(order.status)}>
              {order.status}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Order details and management
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="card">
            <div className="flex items-center mb-6">
              <Package className="h-5 w-5 text-emerald-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Order Items</h2>
            </div>
            
            <div className="space-y-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.food_item_name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${item.unit_price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      ${item.subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Total:</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ${order.total_price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          {order.status === 'PLACED' && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Actions</h2>
              <div className="flex space-x-4">
                <button
                  onClick={handleCompleteOrder}
                  className="btn btn-success flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </button>
                <button
                  onClick={handleCancelOrder}
                  className="btn btn-danger flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Info Sidebar */}
        <div className="space-y-6">
          {/* Order Status */}
          <div className="card">
            <div className="flex items-center mb-4">
              {getStatusIcon(order.status)}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 ml-2">
                Order Status
              </h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                <span className={getStatusBadge(order.status)}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Order ID</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">#{order.id}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="card">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Timeline</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Order Placed</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {order.status === 'COMPLETED' && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Order Completed</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Recently completed
                    </p>
                  </div>
                </div>
              )}
              
              {order.status === 'CANCELLED' && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Order Cancelled</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Recently cancelled
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Items</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {order.order_items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  ${order.total_price.toFixed(2)}
                </span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Total</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ${order.total_price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
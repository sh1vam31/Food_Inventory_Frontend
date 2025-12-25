'use client'

import { useEffect, useState } from 'react'
import { Package, AlertTriangle, ShoppingCart, TrendingUp } from 'lucide-react'
import { api } from '@/lib/api'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

interface DashboardStats {
  totalRawMaterials: number
  lowStockItems: number
  totalOrders: number
  totalRevenue: number
  recentOrders: any[]
  lowStockMaterials: any[]
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRawMaterials: 0,
    lowStockItems: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    lowStockMaterials: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [rawMaterials, orders] = await Promise.all([
        api.getRawMaterials(),
        api.getOrders()
      ])

      const lowStockMaterials = rawMaterials.filter(item => item.is_low_stock)
      const recentOrders = orders.slice(0, 4)
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total_price || 0), 0)

      setStats({
        totalRawMaterials: rawMaterials.length,
        lowStockItems: lowStockMaterials.length,
        totalOrders: orders.length,
        totalRevenue,
        recentOrders,
        lowStockMaterials
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-emerald-600 rounded-2xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-emerald-100 text-lg">
            Welcome to your Food Inventory Management System
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Raw Materials */}
          <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-600">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-100 dark:bg-emerald-600 p-3 rounded-xl mr-4">
                <Package className="h-6 w-6 text-emerald-600 dark:text-white" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">Raw Materials</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalRawMaterials}</p>
              </div>
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-600">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-600 p-3 rounded-xl mr-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-white" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">Low Stock Items</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.lowStockItems}</p>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-600">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-emerald-600 p-3 rounded-xl mr-4">
                <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-white" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-600">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-emerald-600 p-3 rounded-xl mr-4">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-white" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-slate-400 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Low Stock Alerts */}
          <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-600">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Low Stock Alerts</h3>
              <Link href="/inventory" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm">
                View All →
              </Link>
            </div>
            
            <div className="space-y-3">
              {stats.lowStockMaterials.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-300 dark:text-slate-500 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-slate-400">No low stock items</p>
                </div>
              ) : (
                stats.lowStockMaterials.map((material) => (
                  <div key={material.id} className="bg-gray-50 dark:bg-slate-600 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">{material.name}</p>
                      <p className="text-gray-500 dark:text-slate-400 text-sm">{material.quantity_available} {material.unit} remaining</p>
                    </div>
                    <span className="bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white px-3 py-1 rounded-lg text-sm font-medium">
                      Low Stock
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-600">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h3>
              <Link href="/orders" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 text-sm">
                View All →
              </Link>
            </div>
            
            <div className="space-y-3">
              {stats.recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-300 dark:text-slate-500 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-slate-400">No recent orders</p>
                </div>
              ) : (
                stats.recentOrders.map((order) => (
                  <Link key={order.id} href={`/orders/${order.id}`}>
                    <div className="bg-gray-50 dark:bg-slate-600 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">Order #{order.id}</p>
                          <p className="text-gray-500 dark:text-slate-400 text-sm">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-900 dark:text-white font-bold">${order.total_price?.toFixed(2) || '0.00'}</p>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'COMPLETED' 
                              ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-white'
                              : order.status === 'CANCELLED'
                              ? 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-white'
                              : 'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-600">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/inventory/add" className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl text-center font-semibold transition-colors">
              Add Raw Material
            </Link>
            <Link href="/menu/add" className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl text-center font-semibold transition-colors">
              Create Food Item
            </Link>
            <Link href="/orders/new" className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl text-center font-semibold transition-colors">
              Place New Order
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
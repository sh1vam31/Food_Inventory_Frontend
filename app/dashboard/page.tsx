'use client'

import { useEffect, useState } from 'react'
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react'
import { api } from '@/lib/api'
import { RawMaterial, Order } from '@/types'
import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRawMaterials: 0,
    lowStockCount: 0,
    totalOrders: 0,
    recentOrders: [] as Order[]
  })
  const [lowStockItems, setLowStockItems] = useState<RawMaterial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [rawMaterials, lowStock, orders] = await Promise.all([
        api.getRawMaterials(),
        api.getLowStockMaterials(),
        api.getOrders()
      ])

      setStats({
        totalRawMaterials: rawMaterials.length,
        lowStockCount: lowStock.length,
        totalOrders: orders.length,
        recentOrders: orders.slice(0, 5)
      })
      setLowStockItems(lowStock)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-green-600 text-white p-8 rounded-2xl">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-green-100 text-lg">
          Welcome to your Food Inventory Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <Package className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Raw Materials</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.totalRawMaterials}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
              <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.lowStockCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
              <ShoppingCart className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
              <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                ${stats.recentOrders.reduce((sum, order) => sum + order.total_price, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock Alert */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Low Stock Alerts</h2>
            <Link href="/inventory" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              View All →
            </Link>
          </div>
          
          {lowStockItems.length === 0 ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No low stock items</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.round(item.quantity_available * 100) / 100} {item.unit} remaining
                    </p>
                  </div>
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                    Low Stock
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h2>
            <Link href="/orders" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
              View All →
            </Link>
          </div>
          
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Order #{order.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">${order.total_price.toFixed(2)}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'PLACED' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                      order.status === 'CANCELLED' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/inventory/add" 
            className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 p-4 rounded-lg text-center font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            Add Raw Material
          </Link>
          <Link 
            href="/menu/add" 
            className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 p-4 rounded-lg text-center font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            Create Food Item
          </Link>
          <Link 
            href="/orders/new" 
            className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 p-4 rounded-lg text-center font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            Place New Order
          </Link>
        </div>
      </div>
    </div>
  )
}
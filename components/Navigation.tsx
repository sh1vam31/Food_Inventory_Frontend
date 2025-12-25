'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, UtensilsCrossed, ShoppingCart, BarChart3, LogOut, User, Settings, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useRef, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const navigation = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Inventory', href: '/inventory', icon: Package, adminOnly: true },
  { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
]

export default function Navigation() {
  const pathname = usePathname()
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Don't show navigation on login page
  if (pathname === '/login') {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center group">
            <div className="bg-green-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-green-600 dark:text-green-400">
              Food Inventory Pro
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-baseline space-x-2">
              {navigation.map((item) => {
                // For non-authenticated users, only show Home
                if (!isAuthenticated && item.href !== '/home') {
                  return null
                }
                
                // Hide admin-only routes for non-admin users
                if (item.adminOnly && !isAdmin) {
                  return null
                }

                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                        ? 'bg-green-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {isAuthenticated ? (
              /* User Menu */
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-600">
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user?.username || 'User'}
                        </div>
                        <div className={`text-xs ${
                          user?.role === 'admin' 
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-green-500 dark:text-green-300'
                        }`}>
                          {user?.role === 'admin' ? 'Admin' : 'Order Maintainer'}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setShowUserMenu(false)
                          logout()
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="p-2 rounded-lg text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-lg text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => {
              // For non-authenticated users, only show Home
              if (!isAuthenticated && item.href !== '/home') {
                return null
              }
              
              // Hide admin-only routes for non-admin users
              if (item.adminOnly && !isAdmin) {
                return null
              }

              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
            
            {/* Mobile Admin Link */}
            {isAuthenticated && isAdmin && (
              <Link
                href="/admin"
                className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Settings className="h-5 w-5 mr-3" />
                Admin Panel
              </Link>
            )}
            
            {/* Mobile Login Link for non-authenticated users */}
            {!isAuthenticated && (
              <Link
                href="/login"
                className="flex items-center px-3 py-2 rounded-lg text-base font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

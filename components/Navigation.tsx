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
            <div className="bg-emerald-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-emerald-600 dark:text-emerald-400">
              Food Inventory Pro
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-baseline space-x-2">
                  {navigation.map((item) => {
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
                            ? 'bg-emerald-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-600 dark:text-gray-300 nav-hover'
                          }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Link>
                    )
                  })}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-600">
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>{user?.username || 'User'}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user?.role === 'admin' 
                          ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      }`}>
                        {user?.role === 'admin' ? 'Admin' : 'Order Maintainer'}
                      </span>
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
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                Login
              </Link>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated && (
              <button
                onClick={logout}
                className="p-2 rounded-lg text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
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
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-600 dark:text-gray-300 nav-hover'
                      }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
              
              {/* Mobile Admin Link */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 nav-hover"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, UtensilsCrossed, ShoppingCart, BarChart3 } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navigation = [
  { name: 'Home', href: '/home', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
]

export default function Navigation() {
  const pathname = usePathname()

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
            <div className="flex items-baseline space-x-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
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
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 nav-hover'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
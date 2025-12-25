'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="inline-flex items-center justify-center mb-12">
              <div className="bg-emerald-600 p-4 rounded-2xl shadow-2xl">
                <BarChart3 className="h-12 w-12 text-white" strokeWidth={2} />
              </div>
              <span className="ml-4 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                Food Inventory Pro
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-gray-900 dark:text-white">Smart Food Inventory</span>
              <span className="block text-emerald-600 dark:text-emerald-400">Management System</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Revolutionize your food business with automatic inventory deduction,
              real-time tracking, and intelligent analytics. Built for modern
              restaurants and food services.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/demo"
                className="inline-flex items-center justify-center border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                View Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium">Production Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium">Real-time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium">Secure & Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Separate Container */}
      <div className="bg-gray-100 dark:bg-slate-700">
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Powerful Features for Modern Food Businesses
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Everything you need to manage inventory, process orders, and grow your food business efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Smart Inventory Management */}
              <div className="text-left">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Inventory Management</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                  Real-time tracking of raw materials with automatic low-stock alerts
                </p>
              </div>

              {/* Automatic Deduction */}
              <div className="text-left">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Automatic Deduction</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                  Inventory automatically updates when orders are placed - no manual work
                </p>
              </div>

              {/* Transaction Safety */}
              <div className="text-left">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Transaction Safety</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                  Atomic database transactions ensure data consistency and prevent overselling
                </p>
              </div>

              {/* Real-time Analytics */}
              <div className="text-left">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-time Analytics</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                  Live dashboard with insights, trends, and business intelligence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-24 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Benefits */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our System?
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 mb-8">
                Built with modern technology and best practices, our system provides enterprise-grade reliability with startup-level agility.
              </p>

              <div className="space-y-4">
                {[
                  'Prevent stockouts with smart alerts',
                  'Reduce manual inventory tracking by 90%',
                  'Eliminate overselling with atomic transactions',
                  'Get real-time business insights',
                  'Scale your food business efficiently'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-slate-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Demo Card */}
            <div className="relative">
              <div className="bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-slate-600">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    <span className="font-bold text-lg">Order Placed!</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { item: 'Flour', qty: '-0.3kg' },
                    { item: 'Tomato', qty: '-0.2kg' },
                    { item: 'Cheese', qty: '-0.15kg' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-600 rounded-xl">
                      <span className="text-gray-800 dark:text-slate-200 font-medium">{item.item}</span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm">
                        {item.qty}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    <span>Inventory automatically updated!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-24 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Food Business?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Join the future of food inventory management. Start managing your inventory like a pro with our intelligent system.
          </p>

          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            {isAuthenticated ? "Go to Dashboard" : "Start Your Journey"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-emerald-600 p-3 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Food Inventory Pro</span>
          </div>
          <p className="text-slate-400">
            Powered by FastAPI, Next.js, and PostgreSQL
          </p>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Package, ShoppingCart, BarChart3, CheckCircle, Zap, Shield, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Package className="h-8 w-8 text-emerald-600" />,
      title: "Smart Inventory Management",
      description: "Real-time tracking of raw materials with automatic low-stock alerts"
    },
    {
      icon: <Zap className="h-8 w-8 text-teal-600" />,
      title: "Automatic Deduction",
      description: "Inventory automatically updates when orders are placed - no manual work!"
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-700" />,
      title: "Transaction Safety",
      description: "Atomic database transactions ensure data consistency and prevent overselling"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-teal-700" />,
      title: "Real-time Analytics",
      description: "Live dashboard with insights, trends, and business intelligence"
    }
  ]

  const benefits = [
    "Prevent stockouts with smart alerts",
    "Reduce manual inventory tracking by 90%",
    "Eliminate overselling with atomic transactions",
    "Get real-time business insights",
    "Scale your food business efficiently"
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg">
                <BarChart3 className="h-12 w-12 text-white" />
              </div>
              <h1 className="ml-4 text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                Food Inventory Pro
              </h1>
            </div>

            {/* Main Headline */}
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              Smart Food Inventory
              <span className="block text-emerald-600 dark:text-emerald-400">
                Management System
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Revolutionize your food business with automatic inventory deduction, 
              real-time tracking, and intelligent analytics. Built for modern restaurants and food services.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/dashboard"
                className={`group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isHovered ? 'shadow-xl scale-105' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Get Started Now
                <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/demo"
                className="border-2 border-emerald-600 dark:border-emerald-500 text-emerald-600 dark:text-emerald-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300 hover:shadow-lg"
              >
                View Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-teal-500 mr-2" />
                Production Ready
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-teal-500 mr-2" />
                Real-time Updates
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-teal-500 mr-2" />
                Secure & Reliable
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Powerful Features for Modern Food Businesses
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage inventory, process orders, and grow your food business efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover-lift"
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-emerald-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Why Choose Our System?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Built with modern technology and best practices, our system provides 
                enterprise-grade reliability with startup-level agility.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="bg-teal-600 text-white p-4 rounded-xl mb-6">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2" />
                    <h4 className="text-xl font-semibold">Order Placed!</h4>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Flour</span>
                      <span className="text-red-500 dark:text-red-400 font-semibold">-0.3kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Tomato</span>
                      <span className="text-red-500 dark:text-red-400 font-semibold">-0.2kg</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-300">Cheese</span>
                      <span className="text-red-500 dark:text-red-400 font-semibold">-0.15kg</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    ✨ Inventory automatically updated!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-emerald-600 dark:bg-emerald-700">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Food Business?
          </h3>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join the future of food inventory management. Start managing your inventory 
            like a pro with our intelligent system.
          </p>
          
          <Link 
            href="/dashboard"
            className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-emerald-400 mr-3" />
            <span className="text-xl font-semibold">Food Inventory Pro</span>
          </div>
          <p className="text-gray-400">
            Powered by FastAPI, Next.js, and PostgreSQL.
          </p>
        </div>
      </div>
    </div>
  )
}
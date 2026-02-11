'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, CheckCircle, Package, ShoppingCart, TrendingDown } from 'lucide-react'

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    {
      title: "Raw Materials Inventory",
      description: "Start by adding raw materials to your inventory",
      content: (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Inventory</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-gray-100">Flour</span>
              <span className="text-green-600 dark:text-green-400 font-semibold">50.0 kg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-gray-100">Tomato</span>
              <span className="text-green-600 dark:text-green-400 font-semibold">20.0 kg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-gray-100">Cheese</span>
              <span className="text-green-600 dark:text-green-400 font-semibold">15.0 kg</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Create Food Items with Recipes",
      description: "Define your menu items and their ingredient requirements",
      content: (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Margherita Pizza Recipe</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-gray-100">Flour</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0.3 kg per pizza</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-gray-100">Tomato</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0.2 kg per pizza</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-gray-100">Cheese</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">0.15 kg per pizza</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-800 dark:text-green-300 font-medium">Price: $12.99 per pizza</p>
          </div>
        </div>
      )
    },
    {
      title: "Place an Order",
      description: "Customer orders 2 Margherita Pizzas",
      content: (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Margherita Pizza</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: 2</p>
              </div>
              <span className="text-teal-600 dark:text-teal-400 font-semibold">$25.98</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-800 dark:text-green-300 font-medium">Total: $25.98</p>
          </div>
        </div>
      )
    },
    {
      title: "Automatic Inventory Deduction",
      description: "Watch the magic happen - inventory updates automatically!",
      content: (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Inventory After Order</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center">
                <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                <span className="font-medium text-gray-900 dark:text-gray-100">Flour</span>
              </div>
              <div className="text-right">
                <span className="text-red-600 dark:text-red-400 font-semibold">49.4 kg</span>
                <p className="text-xs text-red-500 dark:text-red-400">-0.6 kg</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center">
                <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                <span className="font-medium text-gray-900 dark:text-gray-100">Tomato</span>
              </div>
              <div className="text-right">
                <span className="text-red-600 dark:text-red-400 font-semibold">19.6 kg</span>
                <p className="text-xs text-red-500 dark:text-red-400">-0.4 kg</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center">
                <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                <span className="font-medium text-gray-900 dark:text-gray-100">Cheese</span>
              </div>
              <div className="text-right">
                <span className="text-red-600 dark:text-red-400 font-semibold">14.7 kg</span>
                <p className="text-xs text-red-500 dark:text-red-400">-0.3 kg</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-800 dark:text-green-300 font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Inventory automatically updated!
            </p>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/home" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              System Demo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              See how automatic inventory deduction works in action
            </p>
          </div>
        </div>

        {/* Demo Steps */}
        <div className="max-w-4xl mx-auto">
          {/* Step Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-12 h-12 rounded-full font-semibold transition-all ${
                    index === currentStep
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : index < currentStep
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="h-5 w-5 mx-auto" /> : index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current Step */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {demoSteps[currentStep].title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {demoSteps[currentStep].description}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {demoSteps[currentStep].content}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {demoSteps.length}
            </div>

            {currentStep < demoSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all"
              >
                Next
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all"
              >
                Try It Live!
              </Link>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Key Features Demonstrated
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <Package className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Smart Inventory</h4>
              <p className="text-gray-600 dark:text-gray-400">Real-time tracking with automatic updates</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <ShoppingCart className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Order Processing</h4>
              <p className="text-gray-600 dark:text-gray-400">Seamless order placement with validation</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Atomic Transactions</h4>
              <p className="text-gray-600 dark:text-gray-400">Safe, consistent database operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
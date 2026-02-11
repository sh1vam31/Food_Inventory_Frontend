'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page
    router.push('/home')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 spinner-primary mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading Food Inventory Pro...</p>
      </div>
    </div>
  )
}
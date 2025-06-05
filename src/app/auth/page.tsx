'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { AuthForms } from '@/components/auth/AuthForms'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const mode = searchParams.get('mode') as 'signin' | 'signup' || 'signin'

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleSuccess = () => {
    router.push('/')
  }

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20">
      <AuthForms mode={mode} onSuccess={handleSuccess} />
    </div>
  )
}

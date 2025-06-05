'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignInFormData = z.infer<typeof signInSchema>
type SignUpFormData = z.infer<typeof signUpSchema>

interface AuthFormsProps {
  mode?: 'signin' | 'signup'
  onSuccess?: () => void
}

export function AuthForms({ mode = 'signin', onSuccess }: AuthFormsProps) {
  const [currentMode, setCurrentMode] = useState(mode)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { signIn, signUp } = useAuth()

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleSignIn = async (data: SignInFormData) => {
    setLoading(true)
    setError(null)
    
    try {
      await signIn(data.email, data.password)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (data: SignUpFormData) => {
    setLoading(true)
    setError(null)
    
    try {
      await signUp(data.email, data.password, data.firstName, data.lastName)
      setError('Please check your email to confirm your account')
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setCurrentMode(currentMode === 'signin' ? 'signup' : 'signin')
    setError(null)
    signInForm.reset()
    signUpForm.reset()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glass-dark">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gradient">
            {currentMode === 'signin' ? 'Welcome Back' : 'Join AniStream'}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {currentMode === 'signin' 
              ? 'Sign in to continue watching your favorite anime'
              : 'Create an account to start your anime journey'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className={`p-3 rounded-md text-sm ${
              error.includes('check your email') 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {error}
            </div>
          )}

          {currentMode === 'signin' ? (
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...signInForm.register('email')}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    error={signInForm.formState.errors.email?.message}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...signInForm.register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    error={signInForm.formState.errors.password?.message}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...signUpForm.register('firstName')}
                    placeholder="First name"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    error={signUpForm.formState.errors.firstName?.message}
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    {...signUpForm.register('lastName')}
                    placeholder="Last name"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    error={signUpForm.formState.errors.lastName?.message}
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...signUpForm.register('email')}
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  error={signUpForm.formState.errors.email?.message}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...signUpForm.register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  error={signUpForm.formState.errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  {...signUpForm.register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  error={signUpForm.formState.errors.confirmPassword?.message}
                />
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                loading={loading}
              >
                Create Account
              </Button>
            </form>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {currentMode === 'signin' 
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api'
import { setToken } from '@/lib/auth'
import GlassCard from '@/components/ui/GlassCard'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await login(email, password)
      if (res.success && res.data) {
        setToken(res.data.token)
        router.push('/admin')
      } else {
        setError(res.error ?? 'שגיאה בהתחברות')
      }
    } catch {
      setError('שגיאה בהתחברות')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-md">
        <h1 className="font-display-lg text-headline-md text-on-surface mb-6 text-center">
          InnerSky Admin
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="אימייל"
            className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="סיסמה"
            className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-electric text-white px-6 py-3 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:scale-105 transition-all glow-purple"
          >
            {loading ? 'מתחבר...' : 'התחבר'}
          </button>

          {error && <p className="text-error text-sm text-center">{error}</p>}
        </form>
      </GlassCard>
    </main>
  )
}

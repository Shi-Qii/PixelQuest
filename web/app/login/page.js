'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleStart() {
    const trimmed = name.trim().toLowerCase()
    if (!trimmed) return
    setLoading(true)

    await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: trimmed }),
    })

    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">PixelQuest</h1>
          <p className="text-slate-400 text-sm">解鎖你的圖片，一題一字一步</p>
        </div>

        <div className="bg-game-card border border-game-border rounded-2xl p-6 space-y-4">
          <p className="text-sm text-slate-400">輸入你的名字開始冒險</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="你的名字..."
            maxLength={20}
            autoFocus
            className="w-full bg-game-bg border border-game-border rounded-xl px-4 py-3 text-center text-lg outline-none focus:border-game-accent transition-colors"
          />
          <button
            onClick={handleStart}
            disabled={!name.trim() || loading}
            className="w-full bg-game-accent text-white rounded-xl py-3 font-semibold disabled:opacity-40 transition-opacity"
          >
            {loading ? '進入中...' : '開始冒險 →'}
          </button>
        </div>
      </div>
    </div>
  )
}

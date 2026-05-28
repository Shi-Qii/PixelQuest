'use client'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Header({ player, pct, unlockedPieces, totalPieces }) {
  const displayName = player.charAt(0).toUpperCase() + player.slice(1)

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold">PixelQuest</h1>
        <p className="text-sm text-slate-400">{displayName} 的冒險地圖</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <ThemeSwitcher />
        <div className="text-right">
          <p className="text-2xl font-bold text-game-gold">{pct}%</p>
          <p className="text-xs text-slate-500">{unlockedPieces}/{totalPieces} 片</p>
        </div>
      </div>
    </div>
  )
}

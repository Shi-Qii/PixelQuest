'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/', label: '地圖', icon: '🗺' },
  { href: '/vocab', label: '單字', icon: '📖' },
  { href: '/progress', label: '進度', icon: '🧩' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-game-card border-t border-game-border">
      <div className="max-w-lg mx-auto flex">
        {tabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center py-3 text-xs gap-1 transition-colors ${
                active ? 'text-game-accent' : 'text-slate-500'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

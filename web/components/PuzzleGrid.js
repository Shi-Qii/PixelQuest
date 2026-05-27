'use client'

export default function PuzzleGrid({ unlockedPieces, totalPieces = 100 }) {
  const cells = Array.from({ length: totalPieces }, (_, i) => i < unlockedPieces)

  return (
    <div className="w-full aspect-square rounded-xl overflow-hidden border border-game-border">
      <div className="grid grid-cols-10 w-full h-full">
        {cells.map((unlocked, i) => (
          <div
            key={i}
            className={`aspect-square transition-colors duration-300 ${
              unlocked
                ? 'bg-gradient-to-br from-game-accent to-purple-900'
                : 'bg-slate-900'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

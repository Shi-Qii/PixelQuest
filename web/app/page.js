import PuzzleGrid from '@/components/PuzzleGrid'
import StageCard from '@/components/StageCard'
import { STAGES, STAGE_ORDER } from '@/data/stages'
import supabase from '@/lib/supabase'

async function getProgress() {
  const { data, error } = await supabase
    .from('progress')
    .select('data')
    .eq('player', 'shiqi')
    .single()

  if (error || !data) return null
  return data.data
}

export default async function MapPage() {
  const progress = await getProgress()

  const unlockedPieces = progress?.unlocked_pieces ?? 0
  const totalPieces = progress?.total_pieces ?? 100
  const pct = Math.round((unlockedPieces / totalPieces) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">PixelQuest</h1>
          <p className="text-sm text-slate-400">Shiqi 的冒險地圖</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-game-gold">{pct}%</p>
          <p className="text-xs text-slate-500">{unlockedPieces}/{totalPieces} 片</p>
        </div>
      </div>

      {/* Puzzle */}
      <PuzzleGrid unlockedPieces={unlockedPieces} totalPieces={totalPieces} />

      {/* Stages */}
      <div>
        <h2 className="text-sm font-semibold text-slate-400 mb-3">關卡進度</h2>
        <div className="space-y-3">
          {STAGE_ORDER.map((stageId) => (
            <StageCard
              key={stageId}
              stage={stageId}
              stageData={STAGES[stageId]}
              progress={progress?.stages?.[stageId]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

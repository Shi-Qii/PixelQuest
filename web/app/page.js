import { cookies } from 'next/headers'
import PuzzleGrid from '@/components/PuzzleGrid'
import StageCard from '@/components/StageCard'
import Header from '@/components/Header'
import { STAGES, STAGE_ORDER } from '@/data/stages'
import supabase from '@/lib/supabase'

async function getProgress(player) {
  const { data } = await supabase
    .from('progress')
    .select('data')
    .eq('player', player)
    .single()
  return data?.data ?? null
}

export default async function MapPage() {
  const player = cookies().get('pq-player')?.value ?? 'unknown'
  const progress = await getProgress(player)

  const unlockedPieces = progress?.unlocked_pieces ?? 0
  const totalPieces = progress?.total_pieces ?? 100
  const pct = Math.round((unlockedPieces / totalPieces) * 100)

  return (
    <div className="space-y-6">
      <Header player={player} pct={pct} unlockedPieces={unlockedPieces} totalPieces={totalPieces} />

      <PuzzleGrid unlockedPieces={unlockedPieces} totalPieces={totalPieces} />

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

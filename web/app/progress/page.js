import supabase from '@/lib/supabase'
import { STAGES, STAGE_ORDER } from '@/data/stages'

async function getProgress() {
  const { data } = await supabase
    .from('progress')
    .select('data')
    .eq('player', 'shiqi')
    .single()
  return data?.data ?? null
}

export default async function ProgressPage() {
  const progress = await getProgress()
  const stats = progress?.stats ?? {}
  const weakVocab = progress?.weak_vocab ?? []

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">🧩 我的進度</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="LeetCode" value={stats.total_leetcode ?? 0} unit="題" />
        <StatCard label="單字" value={stats.total_vocab ?? 0} unit="個" />
        <StatCard label="連續天數" value={stats.streak_days ?? 0} unit="天" color="gold" />
      </div>

      {/* Weak vocab */}
      {weakVocab.length > 0 && (
        <div className="bg-game-card border border-game-border rounded-xl p-4">
          <h2 className="text-sm font-semibold mb-3 text-game-red">⚠ 需要加強的單字</h2>
          <div className="flex flex-wrap gap-2">
            {weakVocab.map((w) => (
              <span key={w} className="bg-game-red/10 border border-game-red/30 text-game-red text-xs px-2 py-1 rounded-lg">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stage detail */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-400">關卡詳情</h2>
        {STAGE_ORDER.map((stageId) => {
          const stageProgress = progress?.stages?.[stageId]
          const stageDef = STAGES[stageId]
          if (!stageProgress || stageProgress.status === 'locked') return null

          return (
            <div key={stageId} className="bg-game-card border border-game-border rounded-xl p-4">
              <p className="text-xs text-slate-500">{stageDef.name}</p>
              <h3 className="font-semibold text-sm mb-2">{stageDef.nameTw}</h3>
              <div className="text-xs text-slate-400 space-y-1">
                <p>⚔ LeetCode：{stageProgress.tracks?.leetcode?.done ?? 0} / {stageProgress.tracks?.leetcode?.required ?? stageDef.leetcode.required}</p>
                <p>📖 單字：{stageProgress.tracks?.vocab?.done ?? 0} / {stageProgress.tracks?.vocab?.required ?? stageDef.vocab.required}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({ label, value, unit, color }) {
  const textColor = color === 'gold' ? 'text-game-gold' : 'text-game-accent'
  return (
    <div className="bg-game-card border border-game-border rounded-xl p-3 text-center">
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      <p className="text-xs text-slate-500">{unit}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  )
}

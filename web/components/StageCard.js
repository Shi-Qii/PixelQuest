export default function StageCard({ stage, stageData, progress }) {
  const locked = progress?.status === 'locked'
  const cleared = progress?.cleared

  const leetcodeDone = progress?.tracks?.leetcode?.done ?? 0
  const leetcodeReq = progress?.tracks?.leetcode?.required ?? stageData.leetcode.required
  const vocabDone = progress?.tracks?.vocab?.done ?? 0
  const vocabReq = progress?.tracks?.vocab?.required ?? stageData.vocab.required

  return (
    <div className={`rounded-xl border p-4 transition-opacity ${
      locked ? 'border-game-border opacity-40' : 'border-game-border bg-game-card'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-slate-500">{stageData.name}</p>
          <h3 className="font-semibold text-sm">{stageData.nameTw}</h3>
        </div>
        <span className="text-lg">
          {locked ? '🔒' : cleared ? '✅' : '⚔'}
        </span>
      </div>

      {!locked && (
        <div className="space-y-2">
          <ProgressBar label="⚔ LeetCode" done={leetcodeDone} total={leetcodeReq} />
          <ProgressBar label="📖 單字" done={vocabDone} total={vocabReq} color="gold" />
        </div>
      )}
    </div>
  )
}

function ProgressBar({ label, done, total, color = 'accent' }) {
  const pct = Math.min(100, Math.round((done / total) * 100))
  const barColor = color === 'gold' ? 'bg-game-gold' : 'bg-game-accent'

  return (
    <div>
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>{label}</span>
        <span>{done}/{total}</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

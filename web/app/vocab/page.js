'use client'
import { useState, useEffect } from 'react'
import { STAGES } from '@/data/stages'

function generateQuiz(words) {
  if (words.length < 4) return null
  const idx = Math.floor(Math.random() * words.length)
  const correct = words[idx]
  const others = words.filter((_, i) => i !== idx)
  const distractors = others.sort(() => Math.random() - 0.5).slice(0, 3)
  const options = [...distractors, correct].sort(() => Math.random() - 0.5)
  return { correct, options }
}

export default function VocabPage() {
  const [stageId, setStageId] = useState('stage1')
  const [quiz, setQuiz] = useState(null)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const words = STAGES[stageId]?.words ?? []

  useEffect(() => {
    nextQuestion()
  }, [stageId])

  function nextQuestion() {
    setSelected(null)
    setResult(null)
    setQuiz(generateQuiz(words))
  }

  async function handleSelect(option) {
    if (selected) return
    setSelected(option)
    setLoading(true)

    try {
      const res = await fetch('/api/vocab/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: quiz.correct.word,
          correctZh: quiz.correct.zh,
          userAnswer: option.zh,
          stageId,
        }),
      })
      const data = await res.json()
      setResult(data)
      setScore((s) => ({
        correct: s.correct + (data.correct ? 1 : 0),
        total: s.total + 1,
      }))
    } catch {
      setResult({ correct: option.zh === quiz.correct.zh, feedback: '' })
    } finally {
      setLoading(false)
    }
  }

  if (!quiz) return (
    <div className="text-center py-20 text-slate-500">
      這一關還沒有單字，先用 /vocab add 新增！
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">📖 單字測驗</h1>
        <div className="text-right">
          <p className="text-sm font-bold text-game-gold">{score.correct}/{score.total}</p>
          <p className="text-xs text-slate-500">本次得分</p>
        </div>
      </div>

      {/* Stage selector */}
      <select
        value={stageId}
        onChange={(e) => setStageId(e.target.value)}
        className="w-full bg-game-card border border-game-border rounded-lg px-3 py-2 text-sm text-white"
      >
        <option value="stage1">Stage 1 — Array Plains</option>
        <option value="stage2">Stage 2 — String Caverns</option>
      </select>

      {/* Quiz Card */}
      <div className="bg-game-card border border-game-border rounded-2xl p-6 text-center">
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">
          {quiz.correct.pos}
        </p>
        <h2 className="text-3xl font-bold mb-1">{quiz.correct.word}</h2>
        <p className="text-slate-500 text-sm">這個單字的中文意思是？</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {quiz.options.map((opt, i) => {
          const isSelected = selected?.word === opt.word
          const isCorrect = opt.word === quiz.correct.word

          let style = 'bg-game-card border-game-border text-white'
          if (selected) {
            if (isCorrect) style = 'bg-game-green/20 border-game-green text-game-green'
            else if (isSelected) style = 'bg-game-red/20 border-game-red text-game-red'
            else style = 'bg-game-card border-game-border text-slate-500'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`border rounded-xl p-4 text-sm font-medium transition-all ${style}`}
            >
              {opt.zh}
            </button>
          )
        })}
      </div>

      {/* Result feedback */}
      {result && (
        <div className={`rounded-xl p-4 text-sm ${
          result.correct
            ? 'bg-game-green/10 border border-game-green/30 text-game-green'
            : 'bg-game-red/10 border border-game-red/30 text-game-red'
        }`}>
          <p className="font-bold mb-1">{result.correct ? '✅ 正確！' : `❌ 正確答案：${quiz.correct.zh}`}</p>
          {result.feedback && <p className="text-xs opacity-80">{result.feedback}</p>}
        </div>
      )}

      {/* Next button */}
      {result && !loading && (
        <button
          onClick={nextQuestion}
          className="w-full bg-game-accent text-white rounded-xl py-3 font-semibold text-sm"
        >
          下一題 →
        </button>
      )}

      {loading && (
        <div className="text-center text-slate-500 text-sm py-2">AI 評分中...</div>
      )}
    </div>
  )
}

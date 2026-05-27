import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  const { word, correctZh, userAnswer, stageId } = await request.json()

  const isCorrect = userAnswer === correctZh

  let feedback = ''
  try {
    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 120,
      messages: [
        {
          role: 'user',
          content: `英文單字：${word}
正確中文：${correctZh}
玩家選的：${userAnswer}
結果：${isCorrect ? '正確' : '錯誤'}

請用一句中文給出簡短例句或記憶技巧（不超過30字）。`,
        },
      ],
    })
    feedback = msg.content[0].text.trim()
  } catch {
    // 評分 API 失敗不影響答題結果
  }

  // 答錯記到 weak_vocab
  if (!isCorrect) {
    const { data } = await supabase
      .from('progress')
      .select('data')
      .eq('player', 'shiqi')
      .single()

    if (data?.data) {
      const progress = data.data
      const weak = progress.weak_vocab ?? []
      if (!weak.includes(word)) {
        progress.weak_vocab = [...weak, word]
        await supabase
          .from('progress')
          .upsert({ player: 'shiqi', data: progress, updated_at: new Date().toISOString() })
      }
    }
  }

  return Response.json({ correct: isCorrect, feedback })
}

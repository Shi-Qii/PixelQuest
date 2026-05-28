import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// TODO: 拿到 Anthropic API Key 後，取消註解以下區塊啟用 AI 回饋
// import Anthropic from '@anthropic-ai/sdk'
// const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
// async function getAIFeedback(word, correctZh, userAnswer, isCorrect) {
//   const msg = await anthropic.messages.create({
//     model: 'claude-haiku-4-5-20251001',
//     max_tokens: 120,
//     messages: [{ role: 'user', content:
//       `英文單字：${word}\n正確中文：${correctZh}\n玩家選的：${userAnswer}\n結果：${isCorrect ? '正確' : '錯誤'}\n請用一句中文給出簡短例句或記憶技巧（不超過30字）。`
//     }],
//   })
//   return msg.content[0].text.trim()
// }

export async function POST(request) {
  const { word, correctZh, userAnswer, stageId } = await request.json()

  const isCorrect = userAnswer === correctZh
  const feedback = '' // TODO: 改成 await getAIFeedback(word, correctZh, userAnswer, isCorrect)

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

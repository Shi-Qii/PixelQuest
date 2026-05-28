import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(request) {
  const { player } = await request.json()
  if (!player) return Response.json({ error: 'missing player' }, { status: 400 })

  // 確保 Supabase 有這個玩家的資料，沒有就建一筆空的
  const { data } = await supabase
    .from('progress')
    .select('player')
    .eq('player', player)
    .single()

  if (!data) {
    await supabase.from('progress').insert({
      player,
      data: {
        player,
        current_stage: 'stage1',
        unlocked_pieces: 0,
        total_pieces: 100,
        stages: {
          stage1: { status: 'in_progress', cleared: false, tracks: { leetcode: { done: 0, required: 5 }, vocab: { done: 0, required: 10 }, claude: { done: 0, required: 1 } } },
          stage2: { status: 'locked', cleared: false, tracks: { leetcode: { done: 0, required: 8 }, vocab: { done: 0, required: 15 }, claude: { done: 0, required: 1 } } },
          stage3: { status: 'locked', cleared: false, tracks: { leetcode: { done: 0, required: 8 }, vocab: { done: 0, required: 15 }, claude: { done: 0, required: 1 } } },
          stage4: { status: 'locked', cleared: false, tracks: { leetcode: { done: 0, required: 10 }, vocab: { done: 0, required: 20 }, claude: { done: 0, required: 1 } } },
          stage5: { status: 'locked', cleared: false, tracks: { leetcode: { done: 0, required: 10 }, vocab: { done: 0, required: 20 }, claude: { done: 0, required: 1 } } },
          boss:   { status: 'locked', cleared: false, tracks: { leetcode: { done: 0, required: 15 }, vocab: { done: 0, required: 25 }, claude: { done: 0, required: 1 } } },
        },
        weak_vocab: [],
        activity_log: [],
        stats: { total_leetcode: 0, total_vocab: 0, total_claude: 0, streak_days: 0, last_active: null },
      },
    })
  }

  cookies().set('pq-player', player, {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  return Response.json({ ok: true, player })
}

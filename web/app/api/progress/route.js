import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET() {
  const { data, error } = await supabase
    .from('progress')
    .select('data')
    .eq('player', 'shiqi')
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data?.data ?? {})
}

export async function PUT(request) {
  const body = await request.json()

  const { error } = await supabase
    .from('progress')
    .upsert({ player: 'shiqi', data: body, updated_at: new Date().toISOString() })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}

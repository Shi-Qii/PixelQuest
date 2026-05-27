-- 在 Supabase SQL Editor 執行這個檔案

create table if not exists progress (
  player text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 建好 table 之後，把 progress/shiqi.json 的內容複製進來執行：
-- insert into progress (player, data)
-- values ('shiqi', '<貼上 shiqi.json 內容>');

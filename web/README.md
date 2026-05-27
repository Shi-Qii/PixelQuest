# PixelQuest Web

PixelQuest 的手機版 Web 介面（版本 B）。

## 分支策略

```
main          CLI 版（電腦使用，不動）
main-web      Web 版穩定主線
feature/web   Web 開發分支（PR → main-web）
```

## Tech Stack

- **前端** Next.js (JS) + Tailwind CSS
- **資料庫** Supabase
- **AI 評分** Claude Haiku (Anthropic API)
- **部署** Vercel

## 頁面

| 路徑 | 功能 |
|---|---|
| `/` | 地圖 — 拼圖進度 + 關卡總覽 |
| `/vocab` | 單字測驗（4 選 1 + AI 評分）|
| `/progress` | 詳細進度 + 弱點單字 |

## 開始開發

### 1. 環境設定

```bash
cd web
cp .env.local.example .env.local
# 填入 .env.local 裡的三個 Key
npm install
npm run dev
```

### 2. Supabase 初始化

在 Supabase SQL Editor 執行 `supabase/schema.sql`，然後把 `progress/shiqi.json` 的內容匯入。

### 3. 部署 Vercel

1. 去 vercel.com 連接 GitHub repo
2. Root Directory 設為 `web`
3. 把 `.env.local` 的三個變數填入 Vercel 環境變數
4. Deploy

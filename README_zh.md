# PixelQuest: The Learning Arena

> 解鎖你的圖片，一道算法、一個單字、一個工具地拼回來。

三條並行學習軌道：**LeetCode 算法（Java）**、**多益單字**、**Claude AI 工具**。
每完成一個任務就解鎖一塊圖片，闖過六個主關卡，拼回你選定的完整畫面。

---

## 遊戲機制

上傳任何一張圖片，系統自動切成 100 塊。
三條軌道同時推進 → 解鎖圖塊 → 逐漸顯現你的圖片。

```
░░░░░░░░░░    ████░░░░░░    ██████████
░░░░░░░░░░ →  ████░░░░░░ →  ██████████
░░░░░░░░░░    ██░░░░░░░░    ████░░░░░░
    0%             30%            80%
```

---

## 三條學習軌道

每個主關卡下有三條獨立的子軌道，全部完成才算過關。

| 軌道 | 內容 | 解鎖 |
|---|---|---|
| ⚔ 算法 | LeetCode 題目（Java）| 圖塊 |
| 📖 多益 | 對應主題的多益單字 | 圖塊 |
| 🤖 AI 工具 | Claude Code 功能實作任務 | 額外圖塊 |

三條軌道進度各自獨立，順序自由，隨時切換。

---

## 關卡結構

| # | 關卡名稱 | 算法主題 | 多益主題 | AI 工具主題 | 解鎖塊數 |
|---|---|---|---|---|---|
| 1 | Array Plains 陣列平原 | Array / Two Pointer | 日常動詞、基礎形容詞 | CLAUDE.md + Skills | 10 |
| 2 | String Caverns 字串洞窟 | String / HashMap | IT 技術、辦公室詞彙 | Memory | 15 |
| 3 | LinkedList Labyrinth 鏈結迷宮 | Linked List / Stack | 商業流程、財務 | Hooks + Settings | 15 |
| 4 | Tree Forest 樹木森林 | Binary Tree / DFS / BFS | 旅遊、交通、描述詞 | Plan Mode + Agents | 20 |
| 5 | DP Desert 動態沙漠 | Dynamic Programming | 策略、決策、高階商業 | MCP | 20 |
| ★ | BOSS: Full Combo 終極挑戰 | 混合 Hard 題 | 全類混測 | Schedule + 自建功能 | 20 |

### 每關圖塊分配（以 Stage 1 共 10 塊為例）
```
⚔  算法   完成 5 題  →  4 塊
📖 多益   學會 10 字 →  4 塊
🤖 AI 工具 完成 1 任務 → 2 塊
```

主題固定，**題目、單字、節奏由你自己決定。**

---

## 遊玩模式

**單人模式** — 你的圖片，你的進度，你的節奏。

**組隊模式（2–4 人）** — 第 1–5 關每人各自闖關，各有一張圖片。
BOSS 關需要全員通過第 5 關才解鎖，解鎖後共同貢獻一張 **Party 圖片**完成終極挑戰。

---

## Claude 導師系統

Claude 是每一關的 **NPC 導師**，從不直接給答案，只引導你自己找出來。
隨著關卡難度提升，提示等級越來越低：

| 關卡 | Claude 的角色 |
|---|---|
| 第 1–2 關 | 主動提問，給方向不給解法 |
| 第 3–4 關 | 只給一個關鍵 hint |
| 第 5 關 | 只確認你的思路對或錯 |
| BOSS | 沉默，完全靠你自己 |

---

## 指令一覽

### 學習進度
| 指令 | 功能 |
|---|---|
| `/done leetcode <題目>` | 標記一題 LeetCode 完成 + 解鎖圖塊 |
| `/done vocab <單字>` | 標記一個單字學會 + 解鎖圖塊 |
| `/done claude <主題>` | 標記 AI 工具任務完成 + 解鎖額外圖塊 |
| `/hint` | 向 Claude 要提示（依關卡等級限制）|

### 單字練習
| 指令 | 功能 |
|---|---|
| `/vocab add <單字>` | 新增單字到當前關卡清單 |
| `/vocab quiz` | 當前關卡單字測驗（優先出錯誤單字）|
| `/vocab list` | 列出所有單字，依熟悉度排序 |

### 進度查看
| 指令 | 功能 |
|---|---|
| `/map` | 世界地圖 + 三條軌道的完整進度 |
| `/progress` | 重新生成並查看拼圖進度圖 |
| `/test-image` | 驗證圖片完整性 + 生成 100% 完成預覽 |

### 組隊
| 指令 | 功能 |
|---|---|
| `/party invite <github帳號>` | 邀請隊友加入 |
| `/party status` | 查看所有成員三條軌道的進度 |
| `/party boss` | 確認 BOSS 是否已對全隊解鎖 |

---

## 開始使用

**1. 安裝依賴套件**
```bash
pip3 install pillow
```

**2. 上傳並切割你的圖片**
```bash
python3 scripts/setup.py 你的圖片.png
```

**3. 測試圖片（建議）**
```bash
python3 scripts/test_image.py
```
這會生成一張 100% 完成預覽圖（`gallery/<玩家名>_preview_100.png`），讓你確認圖片可以完整拼回後再開始遊戲。

**4. 開啟 Claude Code 開始遊戲**
```bash
# 在此目錄下：
/map
```

---

## AI 工具學習路徑

每一關透過一個實作任務學習一個 Claude Code 功能：

| 關卡 | 主題 | 實作任務 |
|---|---|---|
| Stage 1 | CLAUDE.md + Skills | 建立一個自訂 `/mystats` 指令 |
| Stage 2 | Memory | 讓 Claude 跨對話記住你的學習弱點 |
| Stage 3 | Hooks + Settings | 設定 `/done` 後自動更新進度圖 |
| Stage 4 | Plan Mode + Agents | 用 Plan Mode 設計新功能並用 Sub-agent 執行 |
| Stage 5 | MCP | 串接字典 API 整合進 `/vocab add` |
| BOSS | Schedule + 自建功能 | 設定每日學習排程 + 為 PixelQuest 加一個新功能 |

每關的詳細教學在 `stages/<關卡>/claude/guide.md`。

---

## 專案結構

```
PixelQuest/
├── CLAUDE.md                      # Claude 角色設定、提示政策、遊戲規則
├── config/
│   ├── game.json                  # 模式、人數上限、提示政策
│   └── stages.json                # 六個關卡（每關含三條軌道）
├── progress/
│   ├── <玩家名>.json              # 個人進度（三條軌道分別追蹤）
│   └── party.json                 # 組隊狀態 + BOSS 共同進度
├── stages/
│   └── stage1-array/
│       ├── leetcode/              # Java 解題檔案
│       ├── vocab/
│       │   ├── wordlist.md        # 個人單字清單
│       │   ├── mistakes.md        # 自動記錄的答錯單字
│       │   └── toeic_bank.md      # 多益單字庫（約 200 字）
│       └── claude/
│           └── guide.md           # 本關 AI 工具學習指南
├── gallery/
│   ├── <玩家名>_original.png      # 你上傳的原始圖片
│   ├── <玩家名>_preview_100.png   # 100% 完成預覽（僅測試用）
│   ├── pieces/<玩家名>/           # 100 塊切片（00–99）
│   └── <玩家名>_current.png       # 當前進度圖（自動生成）
├── scripts/
│   ├── setup.py                   # 圖片切割成 100 塊
│   ├── generate.py                # 生成當前進度圖
│   ├── unlock.py                  # 標記任務完成 + 自動 commit
│   └── test_image.py              # 驗證圖片 + 生成 100% 預覽
└── .claude/commands/              # 所有自訂 slash 指令
    ├── map.md
    ├── done.md
    ├── vocab.md
    ├── hint.md
    ├── progress.md
    ├── party.md
    └── test-image.md
```

---

## 加入組隊

1. Fork 此 repo
2. 執行 `python3 scripts/setup.py <你的圖片>` 設定你的圖片
3. 執行 `python3 scripts/test_image.py` 確認圖片正常
4. 你的進度會記錄在 `progress/<你的github名>.json`
5. 請隊長執行 `/party invite <你的github名>` 完成邀請

---

Built with [Claude Code](https://claude.ai/code)

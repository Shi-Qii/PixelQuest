# PixelQuest: The Learning Arena

> 解鎖你的圖片，一道算法一個單字地拼回來。

結合 **LeetCode（Java）** 與 **多益單字** 的遊戲化學習系統。
每完成一個學習任務，就解鎖一塊你選定的圖片。闖過六個關卡，拼回完整的畫面。

---

## 遊戲機制

上傳任何一張圖片，系統自動切成 100 塊。
完成任務 → 解鎖圖塊 → 逐漸顯現你的圖片。

```
░░░░░░░░░░    ████░░░░░░    ██████████
░░░░░░░░░░ →  ████░░░░░░ →  ██████████
░░░░░░░░░░    ██░░░░░░░░    ████░░░░░░
    0%             30%            80%
```

---

## 關卡結構

| # | 關卡名稱 | 題型 | 解鎖塊數 |
|---|---|---|---|
| 1 | Array Plains 陣列平原 | Array / Two Pointer | 10 |
| 2 | String Caverns 字串洞窟 | String / HashMap | 15 |
| 3 | LinkedList Labyrinth 鏈結迷宮 | Linked List / Stack | 15 |
| 4 | Tree Forest 樹木森林 | Binary Tree / DFS / BFS | 20 |
| 5 | DP Desert 動態沙漠 | Dynamic Programming | 20 |
| ★ | BOSS: Full Combo 終極挑戰 | 混合 Hard 題 | 20 |

主題固定，**但題目和單字由你自己選擇**。

---

## 遊玩模式

**單人模式** — 你的圖片，你的進度，你的節奏。

**組隊模式（2–4 人）** — 每位玩家在第 1–5 關各自闖關、各自有一張圖片。
BOSS 關需要所有成員都通過第 5 關，解鎖後共同貢獻一張 Party 圖片。

---

## Claude 導師系統

Claude 在每一關都是你的 **NPC 導師**，不直接給答案，而是引導你自己想出來。
隨著關卡難度提升，提示也會越來越少：

| 關卡 | Claude 的角色 |
|---|---|
| 第 1–2 關 | 主動提問，給方向不給解法 |
| 第 3–4 關 | 只給一個關鍵 hint |
| 第 5 關 | 只確認你的思路對或錯 |
| BOSS | 沉默，靠你自己 |

---

## 多益單字系統

內建多益必考單字庫，依關卡主題分類：

| 關卡 | 單字主題 | 收錄數量 |
|---|---|---|
| Stage 1 | 日常生活、基礎動詞 | 200 字 |
| Stage 2 | IT 技術、辦公室 | 200 字 |
| Stage 3 | 商業流程、財務 | 200 字 |
| Stage 4 | 旅遊、交通、描述詞 | 200 字 |
| Stage 5 | 策略、決策、高階商業 | 200 字 |
| BOSS | 全類混合進階 | 200 字 |

每關完成任務同時練對應主題的單字，學 LeetCode 的同時把多益一起準備好。

---

## 指令一覽

| 指令 | 功能 |
|---|---|
| `/map` | 世界地圖 + 所有玩家進度 |
| `/done leetcode <題目>` | 標記一題 LeetCode 完成 |
| `/vocab add <單字>` | 新增單字到當前關卡 |
| `/vocab quiz` | 當前關卡單字測驗 |
| `/hint` | 向 Claude 要提示 |
| `/progress` | 重新生成並查看拼圖進度 |
| `/party invite <github帳號>` | 邀請隊友加入 |
| `/party status` | 查看所有成員進度 |

---

## 開始使用

**1. 安裝依賴套件**
```bash
pip install pillow
```

**2. 設定你的圖片**
```bash
python scripts/setup.py 你的圖片.png
```

**3. 開始遊戲**

在此目錄下開啟 Claude Code，執行 `/map` 查看地圖。

---

## 專案結構

```
PixelQuest/
├── CLAUDE.md                  # Claude 角色設定與遊戲規則
├── config/
│   ├── game.json              # 模式、人數上限、提示政策
│   └── stages.json            # 六個關卡完整定義
├── progress/
│   ├── <玩家名>.json           # 個人進度
│   └── party.json             # 組隊狀態
├── stages/
│   └── stage1-array/
│       ├── leetcode/          # Java 解題檔案
│       └── vocab/             # 單字清單 + 錯誤紀錄
├── gallery/
│   ├── <玩家>_original.png    # 你上傳的圖片
│   ├── pieces/                # 100 塊切片
│   └── <玩家>_current.png     # 當前進度圖（自動生成）
├── scripts/
│   ├── setup.py               # 圖片切割
│   ├── generate.py            # 生成進度圖
│   └── unlock.py              # 任務完成 + 自動 commit
└── .claude/commands/          # 自訂 slash 指令
```

---

## 加入組隊

1. Fork 此 repo
2. 執行 `python scripts/setup.py <你的圖片>` 設定你的圖片
3. 你的進度會記錄在 `progress/<你的github名>.json`
4. 請隊長執行 `/party invite <你的github名>` 完成邀請

---

Built with [Claude Code](https://claude.ai/code)

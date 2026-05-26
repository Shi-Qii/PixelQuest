# Stage 1 — AI Tools：CLAUDE.md + Skills

## 你要學什麼

這一關學兩件最基礎的事：讓 Claude 認識你的專案，以及自訂你自己的指令。

---

## Part 1：CLAUDE.md 是什麼

CLAUDE.md 是放在專案根目錄的說明檔。每次你在這個資料夾開啟 Claude Code，它都會自動讀取這份檔案。

**沒有 CLAUDE.md：**
```
你：我在第幾關？
Claude：我不知道，你沒告訴我
```

**有 CLAUDE.md：**
```
你：我在第幾關？
Claude：根據你的設定，你在 Stage 1，還需要完成 4 題 LeetCode
```

### 練習：觀察 CLAUDE.md
打開這個專案的 `CLAUDE.md`，讀一遍，注意它定義了哪些東西：
- Claude 的角色（導師 NPC）
- Hint 政策（幾關給幾成提示）
- 所有可用指令

---

## Part 2：Skills 是什麼

Skills 是你自訂的 slash 指令。放在 `.claude/commands/` 資料夾，每個 `.md` 檔就是一個指令。

**檔案名稱 = 指令名稱：**
```
.claude/commands/map.md     →  /map
.claude/commands/done.md    →  /done
.claude/commands/vocab.md   →  /vocab
```

**檔案內容 = Claude 要做什麼：**
打開 `.claude/commands/map.md` 看一下，它告訴 Claude 讀哪些檔案、用什麼格式顯示結果。

### 練習：建立你自己的 /mystats 指令

在 `.claude/commands/` 建一個 `mystats.md`，內容是：

```
讀取 progress/shiqi.json，顯示以下統計：
- 總共完成幾題 LeetCode
- 總共學了幾個單字
- 目前連續幾天有活動
- 最近 5 筆 activity_log

格式要有趣，可以加 emoji，讓它看起來像個個人成就頁面。
```

建完之後輸入 `/mystats` 看看效果。

---

## 完成任務

當你成功建立並執行 `/mystats`，執行：
```
/done claude CLAUDE.md+Skills
```

解鎖 2 塊圖片。

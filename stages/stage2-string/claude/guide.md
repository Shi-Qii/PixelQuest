# Stage 2 — AI Tools：Memory

## 你要學什麼

Claude 的 Memory 讓它跨對話記住事情。這一關學怎麼讓 Claude 記住你的弱點，下次對話不用重新說明。

---

## Memory 是什麼

CLAUDE.md 是你手動寫的靜態說明。Memory 是 Claude 自己在對話中動態記錄的內容，存在 `~/.claude/projects/` 下面。

```
CLAUDE.md  → 你寫的，手動更新，每個專案一份
Memory     → Claude 寫的，自動更新，跨對話持續存在
```

**實際差別：**
```
今天你說：「我覺得 HashMap 的題目比較難」
Claude 把這件事記下來

下次對話（全新的 session）：
你：/vocab quiz
Claude：（知道你 HashMap 比較弱）出了幾題跟 mapping 相關的單字
```

---

## 怎麼讓 Claude 記住東西

直接告訴它：
```
請記住：我在 two pointer 的題目常常忘記移動指針的條件
請記住：我的英文弱點是 finance 類單字
```

Claude 會自動儲存。下次新對話它還記得。

---

## 練習

1. 在目前對話告訴 Claude 你的三個弱點（可以是單字、題型、任何學習上的困難）
2. 關掉這個對話，重新開一個新的
3. 直接問 Claude：「你記得我有哪些學習弱點嗎？」
4. 確認它還記得

---

## 完成任務

驗證 Memory 跨對話有效後，執行：
```
/done claude Memory
```

解鎖 3 塊圖片。

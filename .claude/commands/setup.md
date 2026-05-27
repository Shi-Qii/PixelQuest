進入當前關卡的選題設定流程。可在開始前或任何時候呼叫。

## 流程

1. 讀取 `progress/<player>.json` 確認當前 stage
2. 讀取 `config/stages.json` 取得該 stage 的 defaults 和主題
3. 先顯示 LeetCode 預設題目清單，再顯示單字預設清單
4. 問玩家選哪個模式

---

### 顯示格式

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STAGE 1 — Array Plains  選題設定
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚔  LEETCODE（需完成 5 題）
   預設推薦：
   ① TwoSum              ★☆☆  HashMap     最經典入門，必做
   ② ContainsDuplicate   ★☆☆  HashSet     練 Set 判重
   ③ MoveZeroes          ★☆☆  Two Pointer 雙指針基礎
   ④ MaximumSubarray     ★★☆  Kadane      子陣列最大和
   ⑤ BestTimeToBuyStock  ★★☆  One Pass    一次遍歷技巧

📖  TOEIC 單字（需完成 10 個）
   預設推薦：
   obtain / require / ensure / improve / complete /
   available / significant / efficient / accurate / appropriate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  你想要：
  [1] 用預設，直接開始
  [2] 換掉幾題 / 幾個單字
  [3] 完全自訂
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 選 [1] 用預設

把 defaults 寫入 `progress/<player>.json` 的 `stages.<stage>.tracks.leetcode.selected` 和 `.vocab.selected`，顯示確認訊息後結束。

---

### 選 [2] 換掉幾題

問玩家：「你想換哪幾題？可以說題號（如「換掉第 3 題」）或描述（如「我想練 sliding window」）」

- 如果說題號 → 直接替換
- 如果說描述 → 根據該 stage 主題推薦 2–3 個符合的題目讓玩家選
- 單字同理：說「換掉 obtain」→ 問要換什麼，或說「給我 finance 相關的」→ 從 toeic_bank 推薦

每換一題都即時顯示更新後的清單，確認完才儲存。

---

### 選 [3] 完全自訂

**LeetCode 自訂：**
問玩家：「你想練什麼方向？（例如：雙指針、前綴和、排序... 或直接說題目名稱）」

- 說方向 → 推薦 5–8 題讓玩家選夠數量
- 說題目名稱 → 確認題目存在，加入清單，不足的繼續補

**單字自訂：**
問玩家：「你要加哪些單字？一個一個說，我幫你查詞性和例句加進去。」

每個單字：
1. 查詞性、中文意思、一個 TOEIC 情境例句
2. 顯示給玩家確認
3. 確認後加入 wordlist.md 和 selected 清單

---

### 中途換題（已開始的關卡）

如果 selected 已有資料（已設定過）：
1. 顯示目前的選題清單（標注哪些已完成）
2. 問：「你想調整哪個？」
3. 已完成的題目不能移除（只能新增替補），未完成的可以替換
4. 儲存更新後的清單

---

### 儲存格式

完成設定後，更新 `progress/<player>.json`：

```json
"tracks": {
  "leetcode": {
    "selected": ["TwoSum", "ContainsDuplicate", "MoveZeroes", "MaximumSubarray", "BestTimeToBuyAndSellStock"],
    "setup_done": true
  },
  "vocab": {
    "selected": ["obtain", "require", "ensure", "improve", "complete", "available", "significant", "efficient", "accurate", "appropriate"],
    "setup_done": true
  }
}
```

設定完成後說：「選好了，輸入 /map 看進度，或直接 /done leetcode TwoSum 開始！」

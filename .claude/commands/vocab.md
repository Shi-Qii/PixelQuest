支援三種用法：

## /vocab add <單字>
1. 讀取當前 stage（從 progress/shiqi.json）
2. 查詢單字的詞性、中文意思、一個自然的英文例句
3. 新增到對應 stage 的 vocab/wordlist.md
4. 執行：python scripts/unlock.py vocab <單字>

## /vocab quiz
1. 讀取當前 stage 的 vocab/wordlist.md
2. 優先出 mistakes.md 裡的錯誤單字（如果有）
3. 每次出 **5 題**，三種題型**輪替**出現：

   **題型 A — 看中文 → 拼出英文（填空）**
   例：「充足的、豐富的」→ 請填入英文單字：___

   **題型 B — 看英文 → 選出中文（4 選 1 選擇題）**
   例：abundant → (a) 貧乏的 (b) 充足的 (c) 模糊的 (d) 緊迫的

   **題型 C — 看例句填空 → 填入正確單字**
   例：We have an ___ supply of clean water this season.

4. 評分規則：
   - 答對 → 熟悉度 +1（上限 3，達到 3 表示「已精熟」）
   - 答錯 → 記錄到 mistakes.md，**立刻**顯示正確答案和例句解說，熟悉度不變
5. 5 題全部作答後，顯示本次得分和需要複習的單字清單

## /vocab list
列出當前 stage 所有單字，依熟悉度排序（0 最優先，3 為精熟）

測驗結束後詢問：「要繼續練還是換 LeetCode？」

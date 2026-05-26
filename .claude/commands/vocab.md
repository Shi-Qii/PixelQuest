支援三種用法：

## /vocab add <單字>
1. 讀取當前 stage（從 progress/shiqi.json）
2. 查詢單字的詞性、中文意思、一個自然的英文例句
3. 新增到對應 stage 的 vocab/wordlist.md
4. 執行：python scripts/unlock.py vocab <單字>

## /vocab quiz
1. 讀取當前 stage 的 vocab/wordlist.md
2. 優先出 mistakes.md 裡的錯誤單字（如果有）
3. 出 5 題，格式輪替：
   - 看中文猜英文
   - 看英文猜中文
   - 填空造句
4. 每題答對 → 更新熟悉度
   答錯 → 記錄到 mistakes.md，說明正確答案和用法
5. 最後顯示得分和需要複習的單字

## /vocab list
列出當前 stage 所有單字，依熟悉度排序（0最優先）

測驗結束後詢問：「要繼續練還是換 LeetCode？」

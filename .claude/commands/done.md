用法：/done leetcode <題目名稱>  或  /done vocab <單字>

步驟：
1. 讀取 `progress/shiqi.json` 確認當前 stage 和進度
2. 執行：python scripts/unlock.py <type> <name>
3. 如果是 leetcode，先問玩家：
   「你的解法是什麼複雜度？有沒有更好的方式？」
   等玩家回答後，根據 hint_policy 給出適當反饋
4. 如果是 vocab，出一道造句題確認真的會用
5. 顯示解鎖結果：新增幾塊、目前總進度

範例輸出：
```
✓ [stage1] leetcode: TwoSum
🧩 +1 piece unlocked  (3/100)
━━━━━━━━━━━━━━━━━━━━━
Stage 1 進度：3/15 tasks  █░░░░░░░░░
還需要：4 leetcode + 8 vocab → 解鎖剩餘 7 塊
```

如果 stage 完成了，顯示：
```
★ STAGE 1 — ARRAY PLAINS CLEARED!
→ Stage 2: String Caverns 已解鎖
```

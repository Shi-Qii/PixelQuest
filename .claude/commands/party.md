支援三種用法：

## /party invite <github帳號>
1. 讀取 party/members.json
2. 確認人數未超過 max_members（上限 4）
3. 新增成員到 members 陣列
4. 建立 progress/<github帳號>.json（複製 template）
5. 顯示：「已邀請 @xxx，請對方 fork 這個 repo 並開始闖關」

## /party status
讀取所有成員的 progress/*.json，顯示：

```
╔══════════════════════════════════════╗
║          PARTY STATUS                ║
╠══════════════════════════════════════╣
║  shiqi    ████░░░░░░  Stage 3  38%  ║
║  [隊友A]  ██░░░░░░░░  Stage 2  18%  ║
║  [隊友B]  ░░░░░░░░░░  Stage 1   5%  ║
╠══════════════════════════════════════╣
║  BOSS: 🔒 需要全員通過 Stage 5       ║
║  shiqi: Stage 3/5  隊友A: Stage 2/5  ║
╚══════════════════════════════════════╝
```

## /party boss
確認所有成員是否都通過 Stage 5，
如果是，解鎖 BOSS 並說明共同作戰規則：
- 每人負責自己的 BOSS 任務
- 各自的貢獻累加到共同圖片
- 全員完成才算 CLEAR

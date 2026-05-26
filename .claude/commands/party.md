支援三種用法：

## /party invite <github帳號>
組隊採用「**Collaborator 模式**」，不需要 fork：

1. 在本地建立 `progress/<github帳號>.json`（複製 template 初始化）
2. 通知對方：
   - 請隊長到 GitHub repo → Settings → Collaborators → 手動新增對方帳號（給予 Write 權限）
   - 對方接受邀請後，直接 clone 同一個 repo，推自己的 `progress/<名字>.json` 到 main
3. 顯示：「已為 @xxx 建立本地進度檔，請在 GitHub repo settings 手動加為 Collaborator」

> 注意：`/party invite` 只負責在本地建立進度檔案。
> 實際的 repo 寫入權限必須在 GitHub repo Settings → Collaborators 手動設定，無法由指令自動完成。

## /party status
自動讀取 `progress/*.json`（所有隊員的進度檔），**不需要手動更新 party.json**，顯示：

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

每人只需推自己的 `progress/<名字>.json`，隊長執行 `/party status` 時系統自動彙整所有人的進度。

## /party boss
確認所有 `progress/*.json` 裡的成員是否都通過 Stage 5，
如果是，解鎖 BOSS 並說明共同作戰規則：
- 每人負責自己的 BOSS 任務
- 各自的貢獻累加到共同圖片
- 全員完成才算 CLEAR

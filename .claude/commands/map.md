讀取 `config/stages.json`、`progress/shiqi.json`、`party/members.json`，
然後用以下格式印出世界地圖：

```
╔══════════════════════════════════════════╗
║         SHIQI — LEARNING WORLD MAP       ║
╠══════════════════════════════════════════╣
║  [1] Array Plains          ✓ CLEARED    ║
║  [2] String Caverns        ⚔ IN PROGRESS║
║  [3] LinkedList Labyrinth  🔒 LOCKED    ║
║  [4] Tree Forest           🔒 LOCKED    ║
║  [5] DP Desert             🔒 LOCKED    ║
║  [★] BOSS: Full Combo      🔒 LOCKED    ║
╠══════════════════════════════════════════╣
║  Pieces: 10/100  ██░░░░░░░░ 10%         ║
║  Streak: 3 days                         ║
╠══════════════════════════════════════════╣
║  PARTY: solo  [/party invite to add]    ║
╚══════════════════════════════════════════╝
```

狀態對應：
- cleared → ✓ CLEARED
- in_progress → ⚔ IN PROGRESS（顯示當前進度 lc x/n vocab x/n）
- locked → 🔒 LOCKED

如果是 Party 模式，在 PARTY 區塊列出所有成員和他們各自的進度百分比。

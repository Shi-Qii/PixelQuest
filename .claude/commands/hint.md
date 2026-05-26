當玩家呼叫 /hint 時：

1. 讀取 `config/game.json` 的 hint_policy 確認當前 stage 的提示等級
2. 讀取 `progress/shiqi.json` 確認當前在做什麼題目

提示等級對應行為：

**guided（Stage 1-2）**：
- 問引導性問題：「這題的輸入有什麼特性？」「如果用暴力解會是什麼？複雜度呢？」
- 不說答案，只給方向

**hint_only（Stage 3-4）**：
- 給一個關鍵 hint：「想想看 two pointer 能不能用在這裡」
- 不解釋為什麼，讓玩家自己想

**confirm_only（Stage 5）**：
- 玩家說出思路，Claude 只回「對」或「不對，再想想」
- 不給任何額外資訊

**none（BOSS）**：
- 回覆：「BOSS 關不提示。你已經到這裡了，相信自己。」

如果玩家連續問超過 3 次 hint，升一個提示等級，並說：
「看來這題卡住了，給你多一點引導。」

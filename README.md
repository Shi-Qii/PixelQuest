# PixelQuest: The Learning Arena

> Unlock your picture. One algorithm, one word, one tool at a time.

A gamified learning system with **three parallel tracks**: LeetCode algorithms (Java), TOEIC vocabulary, and Claude AI tools.
Every task you complete reveals a piece of your chosen image. Clear all 6 stages to unlock the full picture.

---

## How It Works

Upload any image. It gets cut into 100 pieces.
Complete tasks across all three tracks → unlock pieces → reveal your image.

```
░░░░░░░░░░    ████░░░░░░    ██████████
░░░░░░░░░░ →  ████░░░░░░ →  ██████████
░░░░░░░░░░    ██░░░░░░░░    ████░░░░░░
  0%             30%            80%
```

---

## Three Learning Tracks

Each stage contains three independent sub-tracks. All three must be completed to clear the stage.

| Track | Content | Unlocks |
|---|---|---|
| ⚔ Algorithm | LeetCode problems in Java | pieces |
| 📖 TOEIC | Vocabulary matching the stage theme | pieces |
| 🤖 AI Tools | Claude Code features (hands-on tasks) | bonus pieces |

Progress within each track is independent — do them in any order.

---

## Stage Structure

| # | Stage | Algorithm | TOEIC Theme | AI Tools Topic | Pieces |
|---|---|---|---|---|---|
| 1 | Array Plains | Array / Two Pointer | Daily life, basic verbs | CLAUDE.md + Skills | 10 |
| 2 | String Caverns | String / HashMap | IT, office vocabulary | Memory | 15 |
| 3 | LinkedList Labyrinth | Linked List / Stack | Business, finance | Hooks + Settings | 15 |
| 4 | Tree Forest | Binary Tree / DFS / BFS | Travel, transport | Plan Mode + Agents | 20 |
| 5 | DP Desert | Dynamic Programming | Strategy, advanced business | MCP | 20 |
| ★ | BOSS: Full Combo | Mixed Hard | All categories mixed | Schedule + Build | 20 |

### Piece breakdown per stage (example: Stage 1 — 10 pieces)
```
⚔  Algorithm   5 problems  →  4 pieces
📖 TOEIC       10 words    →  4 pieces
🤖 AI Tools    1 task      →  2 pieces
```

Theme is fixed. **Problems, words, and pace are your choice.**

---

## Player Modes

**Solo** — Your image, your pace, your journey.

**Party (2–4 players)** — Each player has their own image for Stages 1–5.
The BOSS stage requires all members to reach Stage 5 first.
Then everyone contributes to a **shared Party image** to clear it together.

---

## Claude as Your Guide

Claude acts as the **NPC mentor** — it never gives direct answers, only guidance.
The level of help decreases as you progress:

| Stage | Claude's Role |
|---|---|
| 1–2 | Asks guiding questions, gives direction |
| 3–4 | One hint only, you figure out the rest |
| 5 | Confirms your approach: right or wrong |
| BOSS | Silent. You're on your own. |

---

## Commands

### Learning
| Command | Action |
|---|---|
| `/done leetcode <problem>` | Mark a LeetCode problem complete + unlock pieces |
| `/done vocab <word>` | Mark a vocab word as learned + unlock pieces |
| `/done claude <topic>` | Mark an AI Tools task complete + unlock bonus pieces |
| `/hint` | Ask Claude for a hint (level-gated) |

### Vocabulary
| Command | Action |
|---|---|
| `/vocab add <word>` | Add a word to the current stage word list |
| `/vocab quiz` | Practice current stage vocabulary (weak words first) |
| `/vocab list` | List all words sorted by familiarity |

### Progress
| Command | Action |
|---|---|
| `/map` | World map with all tracks' progress |
| `/progress` | Regenerate and view your picture progress |
| `/test-image` | Verify image integrity + generate 100% preview |

### Party
| Command | Action |
|---|---|
| `/party invite <github>` | Invite a teammate |
| `/party status` | View all members' progress across all tracks |
| `/party boss` | Check if BOSS is unlocked for the party |

---

## Getting Started

**1. Install dependencies**
```bash
pip3 install pillow
```

**2. Upload and cut your image**
```bash
python3 scripts/setup.py path/to/your/image.png
```

**3. Test your image (recommended)**
```bash
python3 scripts/test_image.py
```
This generates a 100% preview (`gallery/<player>_preview_100.png`) so you can confirm the image reassembles correctly before you start.

**4. Open Claude Code and start**
```bash
# In this directory:
/map
```

---

## AI Tools Learning Path

Each stage teaches one Claude Code concept through a hands-on task:

| Stage | Topic | Task |
|---|---|---|
| 1 | CLAUDE.md + Skills | Build a custom `/mystats` command |
| 2 | Memory | Make Claude remember your weak points across sessions |
| 3 | Hooks + Settings | Auto-update progress image after every `/done` |
| 4 | Plan Mode + Agents | Design and delegate a new feature |
| 5 | MCP | Connect a dictionary API to `/vocab add` |
| BOSS | Schedule + Build | Set up daily reminders + ship your own feature |

Guides are in `stages/<stage>/claude/guide.md`.

---

## Project Structure

```
PixelQuest/
├── CLAUDE.md                      # Claude's role, hint policy, game rules
├── config/
│   ├── game.json                  # Mode, party size, hint policy
│   └── stages.json                # All 6 stages with 3 tracks each
├── progress/
│   ├── <player>.json              # Per-player progress (all 3 tracks)
│   └── party.json                 # Shared party + BOSS state
├── stages/
│   └── stage1-array/
│       ├── leetcode/              # Java solutions
│       ├── vocab/
│       │   ├── wordlist.md        # Your personal word list
│       │   ├── mistakes.md        # Auto-logged wrong answers
│       │   └── toeic_bank.md      # Built-in TOEIC word bank (~200 words)
│       └── claude/
│           └── guide.md           # AI Tools learning guide for this stage
├── gallery/
│   ├── <player>_original.png      # Your uploaded image
│   ├── <player>_preview_100.png   # 100% complete preview (test only)
│   ├── pieces/<player>/           # 100 image pieces (00–99)
│   └── <player>_current.png       # Live progress image (auto-generated)
├── scripts/
│   ├── setup.py                   # Cut image into 100 pieces
│   ├── generate.py                # Render current progress image
│   ├── unlock.py                  # Mark tasks done + auto-commit
│   └── test_image.py              # Validate image + generate 100% preview
└── .claude/commands/              # All custom slash commands
    ├── map.md
    ├── done.md
    ├── vocab.md
    ├── hint.md
    ├── progress.md
    ├── party.md
    └── test-image.md
```

---

## Joining as a Teammate

1. Fork this repo
2. Run `python3 scripts/setup.py <your_image>` with your own image
3. Run `python3 scripts/test_image.py` to verify
4. Your progress is tracked in `progress/<your_github>.json`
5. Ask the party leader to run `/party invite <your_github>`

---

Built with [Claude Code](https://claude.ai/code)

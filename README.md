# PixelQuest: The Learning Arena

> Unlock your picture. One algorithm at a time.

A gamified learning system combining **LeetCode (Java)** and **TOEIC vocabulary** practice.
Every task you complete reveals a piece of your chosen image. Clear all 6 stages to unlock the full picture.

---

## How It Works

Upload any image. It gets cut into 100 pieces.
Complete learning tasks → unlock pieces → reveal your image.

```
░░░░░░░░░░    ████░░░░░░    ██████████
░░░░░░░░░░ →  ████░░░░░░ →  ██████████
░░░░░░░░░░    ██░░░░░░░░    ████░░░░░░
  0%             30%            80%
```

---

## Stages

| # | Stage | Type | Pieces |
|---|---|---|---|
| 1 | Array Plains | Array / Two Pointer | 10 |
| 2 | String Caverns | String / HashMap | 15 |
| 3 | LinkedList Labyrinth | Linked List / Stack | 15 |
| 4 | Tree Forest | Binary Tree / DFS / BFS | 20 |
| 5 | DP Desert | Dynamic Programming | 20 |
| ★ | BOSS: Full Combo | Mixed Hard | 20 |

Each stage has a fixed theme but **you choose the problems and vocabulary** within it.

---

## Player Modes

**Solo** — Your image, your pace, your journey.

**Party (2–4 players)** — Each player has their own image for Stages 1–5.
The BOSS stage requires all members to reach Stage 5, then everyone contributes to a shared Party image.

---

## TOEIC Vocabulary System

Built-in TOEIC essential word bank, themed by stage:

| Stage | Vocabulary Theme | Words |
|---|---|---|
| Stage 1 | Daily life, basic verbs | 200 |
| Stage 2 | IT, office & technology | 200 |
| Stage 3 | Business process, finance | 200 |
| Stage 4 | Travel, transport, descriptive | 200 |
| Stage 5 | Strategy, decisions, advanced business | 200 |
| BOSS | Mixed advanced vocabulary | 200 |

Learn the vocabulary that matches the stage you're playing — LeetCode and TOEIC prep at the same time.

---

## Claude as Your Guide

Claude acts as the **NPC mentor** for every stage. The guidance style changes as you progress:

| Stage | Claude's Role |
|---|---|
| 1–2 | Asks guiding questions, gives direction |
| 3–4 | One hint only, you figure out the rest |
| 5 | Confirms your approach: right or wrong |
| BOSS | Silent. You're on your own. |

---

## Commands

| Command | Action |
|---|---|
| `/map` | World map + all players' progress |
| `/done leetcode <problem>` | Mark a LeetCode problem complete |
| `/vocab add <word>` | Add a word to the current stage |
| `/vocab quiz` | Practice current stage vocabulary |
| `/hint` | Ask Claude for a hint |
| `/progress` | Regenerate and view your picture progress |
| `/party invite <github>` | Invite a teammate |
| `/party status` | View all members' progress |

---

## Getting Started

**1. Install dependencies**
```bash
pip install pillow
```

**2. Set up your image**
```bash
python scripts/setup.py path/to/your/image.png
```

**3. Initialize git and start playing**
```bash
git init
```
Then open Claude Code in this directory and run `/map`.

---

## Project Structure

```
PixelQuest/
├── CLAUDE.md              # Claude's role and game rules
├── config/
│   ├── game.json          # Mode, party size, hint policy
│   └── stages.json        # All 6 stage definitions
├── progress/
│   ├── <player>.json      # Per-player progress
│   └── party.json         # Shared party state
├── stages/
│   └── stage1-array/
│       ├── leetcode/      # Your Java solutions
│       └── vocab/         # Word list + mistake log
├── gallery/
│   ├── <player>_original.png
│   ├── pieces/            # 100 image pieces
│   └── <player>_current.png
├── scripts/
│   ├── setup.py           # Cut image into 100 pieces
│   ├── generate.py        # Render current progress image
│   └── unlock.py          # Mark tasks done + auto-commit
└── .claude/commands/      # Custom slash commands
```

---

## Joining as a Teammate

1. Fork this repo
2. Run `python scripts/setup.py <your_image>` with your own image
3. Your progress is tracked in `progress/<your_github>.json`
4. Ask the party leader to run `/party invite <your_github>`

---

Built with [Claude Code](https://claude.ai/code)

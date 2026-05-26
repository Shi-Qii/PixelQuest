#!/usr/bin/env python3
"""
unlock.py — Mark a task complete, unlock pieces, auto-commit.
Usage:
  python scripts/unlock.py leetcode TwoSum [--player shiqi]
  python scripts/unlock.py vocab abundant [--player shiqi]
"""
import sys
import os
import json
import subprocess
from datetime import date

STAGE_CONFIG = {
    "stage1": {"start": 0,  "count": 10, "lc": 5,  "vocab": 10},
    "stage2": {"start": 10, "count": 15, "lc": 8,  "vocab": 15},
    "stage3": {"start": 25, "count": 15, "lc": 8,  "vocab": 15},
    "stage4": {"start": 40, "count": 20, "lc": 10, "vocab": 20},
    "stage5": {"start": 60, "count": 20, "lc": 10, "vocab": 20},
    "boss":   {"start": 80, "count": 20, "lc": 15, "vocab": 25},
}

def load_progress(player):
    with open(f"progress/{player}.json") as f:
        return json.load(f)

def save_progress(player, data):
    with open(f"progress/{player}.json", "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def calc_pieces(stage_id, lc_done, vocab_done, cfg):
    total_tasks    = cfg["lc"] + cfg["vocab"]
    completed      = min(lc_done, cfg["lc"]) + min(vocab_done, cfg["vocab"])
    ratio          = completed / total_tasks
    unlocked_count = int(ratio * cfg["count"])
    pieces = list(range(cfg["start"], cfg["start"] + unlocked_count))
    return pieces

def mark_done(task_type, task_name, player="shiqi"):
    progress = load_progress(player)
    stage_id = progress["current_stage"]
    stage    = progress["stages"][stage_id]
    cfg      = STAGE_CONFIG[stage_id]

    old_lc    = stage["leetcode_done"]
    old_vocab = stage["vocab_done"]

    if task_type == "leetcode":
        if stage["leetcode_done"] >= cfg["lc"]:
            print(f"✓ LeetCode quota for {stage_id} already complete")
        else:
            stage["leetcode_done"] += 1
    elif task_type == "vocab":
        stage["vocab_done"] += 1
    elif task_type == "claude":
        # Claude track is non-blocking: completion grants bonus pieces
        # but does NOT gate stage clear (leetcode + vocab are sufficient)
        if not stage.get("claude_done"):
            stage["claude_done"] = True
            bonus_start = cfg["start"] + cfg["count"]  # bonus pieces follow stage's range
            bonus_pieces = list(range(bonus_start - cfg.get("claude_bonus", 0), bonus_start))
            all_unlocked_bonus = set(progress["unlocked_pieces"])
            all_unlocked_bonus.update(bonus_pieces)
            progress["unlocked_pieces"] = sorted(list(all_unlocked_bonus))
            print(f"✓ [{stage_id}] claude task complete — bonus pieces unlocked!")
        else:
            print(f"✓ [{stage_id}] claude task already completed (bonus already granted)")

    new_pieces = calc_pieces(stage_id, stage["leetcode_done"], stage["vocab_done"], cfg)
    all_unlocked = set(progress["unlocked_pieces"])
    newly_unlocked = [p for p in new_pieces if p not in all_unlocked]
    all_unlocked.update(new_pieces)
    progress["unlocked_pieces"] = sorted(list(all_unlocked))

    total = len(progress["unlocked_pieces"])

    progress["activity_log"].append({
        "date": str(date.today()),
        "type": task_type,
        "name": task_name,
        "stage": stage_id,
        "pieces_after": total
    })
    stat_key = "total_leetcode" if task_type == "leetcode" else ("total_vocab" if task_type == "vocab" else "total_claude")
    progress["stats"][stat_key] += 1
    progress["stats"]["last_active"] = str(date.today())

    # Stage clear requires only leetcode + vocab (claude track is non-blocking bonus)
    stage_cleared = (
        stage["leetcode_done"] >= cfg["lc"] and
        stage["vocab_done"]    >= cfg["vocab"] and
        not stage["cleared"]
    )

    if stage_cleared:
        stage["cleared"] = True
        stage["status"]  = "cleared"
        stage_ids = list(STAGE_CONFIG.keys())
        idx = stage_ids.index(stage_id)
        if idx + 1 < len(stage_ids):
            next_stage = stage_ids[idx + 1]
            progress["stages"][next_stage]["status"] = "in_progress"
            progress["current_stage"] = next_stage

    save_progress(player, progress)

    print(f"✓ [{stage_id}] {task_type}: {task_name}")
    if newly_unlocked:
        print(f"  🧩 +{len(newly_unlocked)} piece(s) unlocked  ({total}/100)")
    if stage_cleared:
        print(f"  ★  {stage_id.upper()} CLEARED!")

    subprocess.run(["python", "scripts/generate.py", "--player", player])

    commit_msg = f"[{stage_id}] {task_type}: {task_name} ({total}/100 pieces)"
    if stage_cleared:
        commit_msg = f"[{stage_id}] CLEARED ★ — {total}/100 pieces unlocked"

    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", commit_msg])

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python scripts/unlock.py <leetcode|vocab> <name> [--player name]")
        sys.exit(1)

    t    = sys.argv[1]
    name = sys.argv[2]
    p    = "shiqi"
    if "--player" in sys.argv:
        p = sys.argv[sys.argv.index("--player") + 1]

    mark_done(t, name, p)

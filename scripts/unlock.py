#!/usr/bin/env python3
"""
unlock.py — Mark a task complete, unlock pieces, auto-commit.
Usage:
  python3 scripts/unlock.py leetcode TwoSum [--player shiqi]
  python3 scripts/unlock.py vocab abundant [--player shiqi]
  python3 scripts/unlock.py claude "CLAUDE.md task" [--player shiqi]
"""
import sys
import os
import json
import subprocess
from datetime import date

STAGE_CONFIG = {
    "stage1": {"start": 0,  "count": 10, "lc": 5,  "lc_pieces": 4, "vocab": 10, "vocab_pieces": 4, "claude_pieces": 2},
    "stage2": {"start": 10, "count": 15, "lc": 8,  "lc_pieces": 6, "vocab": 15, "vocab_pieces": 6, "claude_pieces": 3},
    "stage3": {"start": 25, "count": 15, "lc": 8,  "lc_pieces": 6, "vocab": 15, "vocab_pieces": 6, "claude_pieces": 3},
    "stage4": {"start": 40, "count": 20, "lc": 10, "lc_pieces": 8, "vocab": 20, "vocab_pieces": 8, "claude_pieces": 4},
    "stage5": {"start": 60, "count": 20, "lc": 10, "lc_pieces": 8, "vocab": 20, "vocab_pieces": 8, "claude_pieces": 4},
    "boss":   {"start": 80, "count": 20, "lc": 15, "lc_pieces": 8, "vocab": 25, "vocab_pieces": 8, "claude_pieces": 4},
}

def load_progress(player):
    with open(f"progress/{player}.json") as f:
        return json.load(f)

def save_progress(player, data):
    with open(f"progress/{player}.json", "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def calc_pieces(stage_id, lc_done, vocab_done, claude_done, cfg):
    start = cfg["start"]
    pieces = []

    # LeetCode pieces: first lc_pieces slots of this stage
    lc_ratio = min(lc_done, cfg["lc"]) / cfg["lc"]
    lc_count = int(lc_ratio * cfg["lc_pieces"])
    pieces.extend(range(start, start + lc_count))

    # Vocab pieces: next vocab_pieces slots
    vocab_ratio = min(vocab_done, cfg["vocab"]) / cfg["vocab"]
    vocab_count = int(vocab_ratio * cfg["vocab_pieces"])
    pieces.extend(range(start + cfg["lc_pieces"], start + cfg["lc_pieces"] + vocab_count))

    # Claude pieces: last claude_pieces slots (all unlocked at once when done)
    if claude_done:
        claude_start = start + cfg["lc_pieces"] + cfg["vocab_pieces"]
        pieces.extend(range(claude_start, claude_start + cfg["claude_pieces"]))

    return pieces

def mark_done(task_type, task_name, player="shiqi"):
    progress = load_progress(player)
    stage_id = progress["current_stage"]
    stage    = progress["stages"][stage_id]
    tracks   = stage["tracks"]
    cfg      = STAGE_CONFIG[stage_id]

    if task_type == "leetcode":
        if tracks["leetcode"]["done"] >= cfg["lc"]:
            print(f"✓ LeetCode quota for {stage_id} already complete")
        else:
            tracks["leetcode"]["done"] += 1
    elif task_type == "vocab":
        if tracks["vocab"]["done"] >= cfg["vocab"]:
            print(f"✓ Vocab quota for {stage_id} already complete")
        else:
            tracks["vocab"]["done"] += 1
    elif task_type == "claude":
        if tracks["claude"]["done"] >= 1:
            print(f"✓ [{stage_id}] claude task already completed (bonus already granted)")
        else:
            tracks["claude"]["done"] = 1

    lc_done     = tracks["leetcode"]["done"]
    vocab_done  = tracks["vocab"]["done"]
    claude_done = tracks["claude"]["done"] >= 1

    new_pieces = calc_pieces(stage_id, lc_done, vocab_done, claude_done, cfg)
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

    stage_cleared = (
        tracks["leetcode"]["done"] >= cfg["lc"] and
        tracks["vocab"]["done"]    >= cfg["vocab"] and
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

    subprocess.run(["python3", "scripts/generate.py", "--player", player])

    commit_msg = f"[{stage_id}] {task_type}: {task_name} ({total}/100 pieces)"
    if stage_cleared:
        commit_msg = f"[{stage_id}] CLEARED ★ — {total}/100 pieces unlocked"

    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", commit_msg])

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 scripts/unlock.py <leetcode|vocab|claude> <name> [--player name]")
        sys.exit(1)

    t    = sys.argv[1]
    name = sys.argv[2]
    p    = "shiqi"
    if "--player" in sys.argv:
        p = sys.argv[sys.argv.index("--player") + 1]

    mark_done(t, name, p)

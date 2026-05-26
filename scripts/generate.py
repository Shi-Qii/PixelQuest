#!/usr/bin/env python3
"""
generate.py — Generates current progress image based on unlocked pieces.
Usage: python scripts/generate.py [--player shiqi]
"""
import sys
import os
import json
from PIL import Image, ImageDraw, ImageFont

STAGE_COLORS = {
    "stage1": (59, 130, 246),
    "stage2": (16, 185, 129),
    "stage3": (245, 158, 11),
    "stage4": (239, 68, 68),
    "stage5": (139, 92, 246),
    "boss":   (236, 72, 153),
}

def generate(player="shiqi"):
    progress_path = f"progress/{player}.json"
    pieces_dir    = f"gallery/pieces/{player}"
    output_path   = f"gallery/{player}_current.png"

    with open(progress_path) as f:
        progress = json.load(f)

    unlocked = set(progress["unlocked_pieces"])

    sample = Image.open(os.path.join(pieces_dir, "00.png"))
    pw, ph = sample.size

    canvas = Image.new("RGB", (pw * 10, ph * 10), (15, 15, 15))
    draw = ImageDraw.Draw(canvas)

    for i in range(100):
        row = i // 10
        col = i % 10
        x = col * pw
        y = row * ph

        if i in unlocked:
            piece = Image.open(os.path.join(pieces_dir, f"{i:02d}.png"))
            canvas.paste(piece, (x, y))
        else:
            draw.rectangle([x+1, y+1, x+pw-1, y+ph-1], fill=(25, 25, 25))
            draw.rectangle([x, y, x+pw, y+ph], outline=(40, 40, 40), width=1)

    total = len(unlocked)
    pct   = total
    bar_h = 24
    bar_w = pw * 10
    bar   = Image.new("RGB", (bar_w, bar_h), (10, 10, 10))
    bd    = ImageDraw.Draw(bar)
    filled = int(bar_w * pct / 100)
    bd.rectangle([0, 0, filled, bar_h], fill=(99, 202, 134))
    bd.text((8, 4), f"  {total}/100 pieces  ({pct}%)", fill=(255, 255, 255))

    final = Image.new("RGB", (pw * 10, ph * 10 + bar_h))
    final.paste(bar, (0, 0))
    final.paste(canvas, (0, bar_h))
    final.save(output_path)
    print(f"✓ Progress image saved → {output_path}  ({total}/100 pieces)")

if __name__ == "__main__":
    player = "shiqi"
    if "--player" in sys.argv:
        player = sys.argv[sys.argv.index("--player") + 1]
    generate(player)

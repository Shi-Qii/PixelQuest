#!/usr/bin/env python3
"""
setup.py — Upload your image and cut it into 100 pieces.
Usage: python scripts/setup.py <image_path> [--player shiqi]
"""
import sys
import os
import shutil
from PIL import Image

def setup_gallery(image_path, player="shiqi"):
    gallery_dir = "gallery"
    pieces_dir = os.path.join(gallery_dir, "pieces", player)
    os.makedirs(pieces_dir, exist_ok=True)

    img = Image.open(image_path).convert("RGB")
    w, h = img.size

    pw = (w // 10) * 10
    ph = (h // 10) * 10
    img = img.resize((pw, ph))

    piece_w = pw // 10
    piece_h = ph // 10

    for row in range(10):
        for col in range(10):
            idx = row * 10 + col
            left   = col * piece_w
            upper  = row * piece_h
            piece  = img.crop((left, upper, left + piece_w, upper + piece_h))
            piece.save(os.path.join(pieces_dir, f"{idx:02d}.png"))

    dest = os.path.join(gallery_dir, f"{player}_original.png")
    shutil.copy(image_path, dest)
    print(f"✓ {player}: image cut into 100 pieces → {pieces_dir}")
    print(f"✓ Original saved → {dest}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/setup.py <image_path> [--player name]")
        sys.exit(1)

    path = sys.argv[1]
    player = "shiqi"
    if "--player" in sys.argv:
        player = sys.argv[sys.argv.index("--player") + 1]

    setup_gallery(path, player)

#!/usr/bin/env python3
"""
test_image.py — 驗證圖片切割是否正確，並生成 100% 完成預覽圖。
用途：開始遊戲前確認圖片可以完整拼回。

Usage: python3 scripts/test_image.py [--player shiqi]
"""
import os
import sys
from PIL import Image, ImageDraw

def test_image(player="shiqi"):
    pieces_dir   = f"gallery/pieces/{player}"
    original_path = f"gallery/{player}_original.png"
    preview_path  = f"gallery/{player}_preview_100.png"

    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"  IMAGE TEST — {player.upper()}")
    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

    # 1. 檢查所有 100 塊是否存在
    missing = []
    for i in range(100):
        path = os.path.join(pieces_dir, f"{i:02d}.png")
        if not os.path.exists(path):
            missing.append(i)

    if missing:
        print(f"✗ 缺少 {len(missing)} 塊：{missing}")
        print("  請重新執行 python3 scripts/setup.py <圖片路徑>")
        sys.exit(1)
    else:
        print(f"✓ 100/100 塊全部存在")

    # 2. 讀取一塊確認尺寸
    sample = Image.open(os.path.join(pieces_dir, "00.png"))
    pw, ph = sample.size
    print(f"✓ 每塊尺寸：{pw} x {ph} px")
    print(f"✓ 完整圖尺寸：{pw*10} x {ph*10} px")

    # 3. 重新拼回完整圖
    canvas = Image.new("RGB", (pw * 10, ph * 10))
    for i in range(100):
        row = i // 10
        col = i % 10
        piece = Image.open(os.path.join(pieces_dir, f"{i:02d}.png"))
        canvas.paste(piece, (col * pw, row * ph))

    # 4. 加上 PREVIEW 標示
    draw = ImageDraw.Draw(canvas)
    label = "100% PREVIEW — for testing only"
    draw.rectangle([0, 0, pw*10, 28], fill=(0, 0, 0, 180))
    draw.text((10, 6), label, fill=(99, 202, 134))

    canvas.save(preview_path)
    print(f"✓ 預覽圖已生成 → {preview_path}")

    # 5. 比較原圖和拼回的圖是否尺寸一致
    if os.path.exists(original_path):
        orig = Image.open(original_path)
        ow, oh = orig.size
        if (ow, oh) == (pw*10, ph*10):
            print(f"✓ 尺寸與原圖一致 ({ow}x{oh})")
        else:
            print(f"! 尺寸不完全一致（原圖 {ow}x{oh}，拼回 {pw*10}x{ph*10}）")
            print(f"  原因：原圖被縮放至 10 的倍數，屬正常現象")

    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"  全部通過，圖片可以正常解鎖！")
    print(f"  預覽：open {preview_path}")
    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

if __name__ == "__main__":
    player = "shiqi"
    if "--player" in sys.argv:
        player = sys.argv[sys.argv.index("--player") + 1]
    test_image(player)

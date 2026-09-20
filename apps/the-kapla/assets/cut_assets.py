#!/usr/bin/env python3
"""
Cut 'all fighter.jpeg' into individual assets.
Run: python3 assets/cut_assets.py
"""
from PIL import Image
import os

BASE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(BASE, "all fighter.jpeg")
FIGHTERS_DIR = os.path.join(BASE, "fighters")
SPRITES_DIR = os.path.join(BASE, "sprites")

os.makedirs(FIGHTERS_DIR, exist_ok=True)
os.makedirs(SPRITES_DIR, exist_ok=True)

img = Image.open(IMG)
W, H = img.size
print(f"Image: {W}x{H}")

# ── PRESET FIGHTERS (8 chars, top row) ──────────────────────
# Each card ~160px wide, char art from y~100 to y~310
preset_w = W // 8
preset_y1, preset_y2 = 100, 310
presets = [
    "jax-reyes", "ryuan-kai", "dante-cole", "niko-vale",
    "kairo-morgan-preset", "luna-tan", "bruno-santos", "tetsu-mori"
]

# ── PREMIUM FIGHTERS (5 chars, middle row) ──────────────────
# Each card ~256px wide, char art from y~400 to y~590
premium_w = W // 5
premium_y1, premium_y2 = 400, 590
premiums = [
    "kairo-apex", "victor-stone", "malik-cross",
    "adrian-vega", "elias-ross"
]

# ── SPRITES (2x4 grid, bottom-right) ───────────────────────
# Exact bounding boxes from pixel content scan
sprite_names = ["idle", "punch", "kick", "takedown",
                "ground", "block", "hurt", "ko"]
sprite_positions = {
    "idle":     (940, 780, 1024, 835),
    "punch":    (1025, 780, 1134, 835),
    "kick":     (1135, 780, 1209, 835),
    "takedown": (1210, 794, 1252, 835),
    "ground":   (940, 863, 995, 909),
    "block":    (1027, 847, 1134, 909),
    "hurt":     (1135, 847, 1209, 909),
    "ko":       (1210, 875, 1252, 909),
}

print("\n--- PRESET FIGHTERS ---")
for i, name in enumerate(presets):
    x1 = i * preset_w
    x2 = x1 + preset_w
    crop = img.crop((x1, preset_y1, x2, preset_y2))
    out = os.path.join(FIGHTERS_DIR, f"{name}.png")
    crop.save(out)
    print(f"  {name}.png  ({x2-x1}x{preset_y2-preset_y1})")

print("\n--- PREMIUM FIGHTERS ---")
for i, name in enumerate(premiums):
    x1 = i * premium_w
    x2 = x1 + premium_w
    crop = img.crop((x1, premium_y1, x2, premium_y2))
    out = os.path.join(FIGHTERS_DIR, f"{name}.png")
    crop.save(out)
    print(f"  {name}.png  ({x2-x1}x{premium_y2-premium_y1})")

print("\n--- SPRITES ---")
for name in sprite_names:
    x1, y1, x2, y2 = sprite_positions[name]
    crop = img.crop((x1, y1, x2, y2))
    out = os.path.join(SPRITES_DIR, f"{name}.png")
    crop.save(out)
    print(f"  {name}.png  ({x2-x1}x{y2-y1})")

total = len(presets) + len(premiums) + len(sprite_names)
print(f"\n{'='*40}")
print(f"TOTAL: {total} files")

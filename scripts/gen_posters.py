import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'assets')
os.makedirs(OUT, exist_ok=True)

PAPER = "#f7f5ef"
INK = "#1a1a1a"
PINK = "#ff86ad"
YELLOW = "#ffe72e"
PURPLE = "#6948dc"

def blocks(cx, cy, w, h, seed):
    import random
    r = random.Random(seed)
    parts = []
    x = 0
    while x < w - 40:
        bw = r.randint(34, 70)
        bh = r.randint(60, 130)
        bx = cx + x
        by = cy + (h - bh)
        fill = r.choice([PAPER, PAPER, "#ffffff"])
        parts.append(f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" fill="{fill}" stroke="{INK}" stroke-width="3" rx="4"/>')
        # window row
        wy = by + 14
        while wy < by + bh - 12:
            parts.append(f'<rect x="{bx+8}" y="{wy}" width="8" height="8" fill="{r.choice([INK, PINK, YELLOW])}" opacity="0.9"/>')
            wy += 18
        x += bw + r.randint(10, 26)
    return "".join(parts)

def poster(title, tag, seed, extra=""):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="{PAPER}"/>
  <rect x="18" y="18" width="1244" height="684" fill="none" stroke="{INK}" stroke-width="6" rx="18"/>
  {blocks(40, 40, 1200, 620, seed)}
  {extra}
  <rect x="40" y="40" width="300" height="74" rx="14" fill="{YELLOW}" stroke="{INK}" stroke-width="4"/>
  <text x="64" y="88" font-family="Georgia, serif" font-weight="700" font-size="30" fill="{INK}">VIDEO PLACEHOLDER</text>
  <rect x="40" y="618" width="{22 + len(tag) * 15}" height="56" rx="12" fill="{PURPLE}" stroke="{INK}" stroke-width="4"/>
  <text x="64" y="654" font-family="Georgia, serif" font-weight="700" font-size="26" fill="#ffffff">{tag}</text>
</svg>
'''

# Gear Zero room posters: one per brief in the hero cycling panel
rooms = [
    "A first-person shooter in a city buried in ash",
    "A kart racer through a neon sunset town",
    "A top-down extraction shooter in a shipping yard",
    "A survival shooter on a frozen sea",
]
for i, r in enumerate(rooms, 1):
    with open(os.path.join(OUT, f'room-{i}.svg'), 'w') as f:
        f.write(poster("ROOM", f"room {i}", 100 + i))

# World Model scrolling wall (6 tiles)
for i in range(1, 7):
    with open(os.path.join(OUT, f'vw-{i}.svg'), 'w') as f:
        f.write(poster("WORLD MODEL", f"world {i}", 200 + i))

# World Compilation & Rendering grid (4 tiles)
for i in range(1, 5):
    with open(os.path.join(OUT, f'gr-{i}.svg'), 'w') as f:
        f.write(poster("RENDER", f"render {i}", 300 + i))

# Game Agent grid (4 tiles)
for i in range(1, 5):
    with open(os.path.join(OUT, f'ag-{i}.svg'), 'w') as f:
        f.write(poster("GAME AGENT", f"agent {i}", 400 + i))

# Hero Gear Zero panel room poster
with open(os.path.join(OUT, 'hero-room.svg'), 'w') as f:
    f.write(poster("GEAR ZERO", "live build", 500))

# Product service posters
with open(os.path.join(OUT, 'svc-gear.svg'), 'w') as f:
    f.write(poster("GEAR ZERO", "product", 600))
with open(os.path.join(OUT, 'svc-syn.svg'), 'w') as f:
    f.write(poster("SYNTHETIC WORLD", "product", 700))

print("generated", len(os.listdir(OUT)), "assets")
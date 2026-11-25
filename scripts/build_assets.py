"""Extracts original artwork from the portfolio PDF into public/assets.

Usage:  py scripts/build_assets.py "path/to/portfolio 8.pdf"

- Embedded images are exported at their native resolution as WebP (alpha kept).
- Decorative vector layers (wavy checkerboards, press floors) are re-drawn on top of
  the original paper texture, without cards or text, so they can sit behind live HTML.
- A few composite panels that cannot be separated are rendered as high-res crops.
- Writes src/data/assets.json with dimensions so <img> tags never shift layout.
"""
import collections, json, os, sys
import pymupdf
from PIL import Image

PDF = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "assets")
doc = pymupdf.open(PDF)
manifest = {}

IMAGES = {  # xref: (folder/name)
    371: "cover/cover-sunburst", 373: "cover/cover-illustration", 375: "cover/portfolio-badge",
    5: "about/about-portrait", 4: "about/tool-icons",
    328: "decorations/paper-frame", 332: "decorations/sunburst-orange", 337: "decorations/sunburst-teal",
    10: "decorations/contents-sunburst", 338: "decorations/sunburst-yellow",
    19: "typography/custom-alphabet", 20: "typography/sketchbook-photo", 21: "typography/letterform-process",
    30: "logofolio/velune-hero", 36: "logofolio/velune-logo-horizontal", 38: "logofolio/velune-logo-block",
    40: "logofolio/velune-wordmark-small", 42: "logofolio/velune-mark-small",
    54: "logofolio/velune-logo-final", 56: "logofolio/velune-calla-lily-to-mark", 61: "logofolio/velune-palette-mockup",
    86: "social-media/brigade-post-homes", 88: "social-media/brigade-post-lifestyle", 87: "social-media/brigade-post-communities",
    89: "social-media/brigade-post-wellness", 90: "social-media/brigade-post-sustainable", 91: "social-media/brigade-post-legacy",
    96: "social-media/brigade-grid-01", 103: "social-media/brigade-grid-02", 99: "social-media/brigade-grid-03",
    105: "social-media/brigade-grid-04", 102: "social-media/brigade-grid-05", 101: "social-media/brigade-grid-06",
    100: "social-media/brigade-grid-07", 104: "social-media/brigade-grid-08", 98: "social-media/brigade-grid-09",
    97: "social-media/brigade-grid-10", 110: "social-media/brigade-instagram-mockup",
    118: "social-media/stackd-campaign-grid",
    130: "social-media/stackd-post-lunch-deal", 123: "social-media/stackd-post-stack", 124: "social-media/stackd-post-packaging",
    125: "social-media/stackd-post-combo", 129: "social-media/stackd-post-doorstep", 127: "social-media/stackd-post-double-stack",
    128: "social-media/stackd-post-burger-type", 126: "social-media/stackd-post-crunchy",
    137: "social-media/stackd-instagram-mockup",
    147: "posters/sprite-press", 152: "posters/sprite-subway-mockup", 161: "posters/sprite-six-pack",
    166: "posters/sprite-vintage-wall", 167: "posters/sprite-modern-wall",
    173: "posters/madbury-press", 178: "posters/madbury-cafe-mockup", 186: "posters/madbury-poster", 191: "posters/madbury-subway-mockup",
    197: "posters/happy-feet-press", 202: "posters/happy-feet-cinema-mockup",
    210: "posters/happy-feet-poster-1", 211: "posters/happy-feet-poster-2", 212: "posters/happy-feet-poster-3",
    217: "posters/happy-feet-series",
    223: "posters/sock-racing-press", 228: "posters/sock-racing-wall-mockup", 236: "posters/sock-racing-poster",
    241: "posters/sock-racing-blue-red", 242: "posters/sock-racing-yellow-red", 243: "posters/sock-racing-blue-pink",
    252: "print-media/macbeth-banner-mockup", 261: "print-media/macbeth-book-back", 263: "print-media/macbeth-book-front",
    271: "print-media/macbeth-stage-1-rough", 272: "print-media/macbeth-stage-2-sketch",
    273: "print-media/macbeth-stage-3-colour", 274: "print-media/macbeth-stage-4-final", 279: "print-media/macbeth-book-mockup",
    288: "packaging/anyaberry-ice-bucket", 296: "packaging/anyaberry-bottle", 298: "packaging/anyaberry-can-small",
    300: "packaging/anyaberry-can", 305: "packaging/anyaberry-sketches", 306: "packaging/anyaberry-visual-inspiration",
    307: "packaging/anyaberry-elements", 314: "packaging/anyaberry-label",
    325: "contact/get-in-touch",
}


def save(img: Image.Image, name: str, quality=90, small=True):
    path = os.path.join(OUT, name + ".webp")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "WEBP", quality=quality, method=6)
    entry = {"src": f"/assets/{name}.webp", "w": img.width, "h": img.height}
    if small and img.width > 1100:
        sw = img.width // 2
        sm = img.resize((sw, round(img.height * sw / img.width)), Image.LANCZOS)
        sm.save(os.path.join(OUT, name + "-sm.webp"), "WEBP", quality=quality - 4, method=6)
        entry["sm"] = f"/assets/{name}-sm.webp"
        entry["smw"] = sw
    manifest[os.path.basename(name)] = entry


def pix_to_pil(pm: pymupdf.Pixmap) -> Image.Image:
    mode = "RGBA" if pm.alpha else ("L" if pm.n == 1 else "RGB")
    return Image.frombytes(mode, (pm.width, pm.height), pm.samples).convert("RGBA" if pm.alpha else "RGB")


# 1. embedded images --------------------------------------------------------
for xref, name in IMAGES.items():
    info = doc.xref_get_key(xref, "SMask")
    smask = int(info[1].split()[0]) if info[0] == "xref" else 0
    pm = pymupdf.Pixmap(doc, xref)
    if pm.colorspace and pm.colorspace.n not in (1, 3):
        pm = pymupdf.Pixmap(pymupdf.csRGB, pm)
    if smask:
        if pm.alpha:
            pm = pymupdf.Pixmap(pm, 0)
        pm = pymupdf.Pixmap(pm, pymupdf.Pixmap(doc, smask))
    save(pix_to_pil(pm), name, quality=88 if xref in (328, 332, 337, 10, 371, 338) else 92)

# 2. decorative vector layers ----------------------------------------------
H = lambda c: "#%02x%02x%02x" % tuple(int(v * 255) for v in c[:3]) if c else None
ZOOM = 2


def measure_opacity(page, fill):
    """The checker groups are faded through a transparency group that get_drawings does not
    report. Recover the effective alpha from the original rendering of the left page margin."""
    pm = page.get_pixmap(clip=pymupdf.Rect(14, 20, 58, 556))
    paper = (243, 228, 202)
    f = tuple(int(fill[i:i + 2], 16) for i in (1, 3, 5))
    k = max(range(3), key=lambda i: abs(f[i] - paper[i]))
    vals = sorted(max(0.0, min(1.0, (pm.pixel(x, y)[k] - paper[k]) / (f[k] - paper[k])))
                  for x in range(0, pm.width, 2) for y in range(0, pm.height, 2))
    return round(vals[int(len(vals) * 0.9)], 2)


def render_decor(pn, name, all_shapes=False, exclude=(), exclude_region=None):
    page = doc[pn - 1]
    W, Hh = page.rect.width, page.rect.height
    paths = page.get_drawings()
    common = collections.Counter(H(p.get("fill")) for p in paths if (p.get("width") or 0) <= 0.3).most_common(1)[0][0]
    alpha = 1.0 if all_shapes else measure_opacity(page, common)
    keep = []
    for p in paths:
        r = p["rect"]
        if r.width * r.height > 100_000 and not all_shapes:
            continue
        if any(abs(r.x0 - e[0]) < 4 and abs(r.y0 - e[1]) < 4 for e in exclude):
            continue
        if exclude_region and pymupdf.Rect(*exclude_region).contains(r):
            continue
        if not all_shapes and r.x0 < 130 and r.y0 < 70 and 95 < r.width < 260 and 26 < r.height < 40:
            continue  # label pill drawn in the checker colour (rebuilt in HTML)
        if all_shapes or ((p.get("width") or 0) <= 0.3 and H(p.get("fill")) in (common, None) and (p.get("fill") or p.get("color"))):
            keep.append(p)
    out = pymupdf.open()
    np_ = out.new_page(width=W, height=Hh)
    np_.insert_image(pymupdf.Rect(0, 0, W, Hh), pixmap=pymupdf.Pixmap(doc, 328))
    shape = np_.new_shape()
    for p in keep:
        for it in p["items"]:
            if it[0] == "l": shape.draw_line(it[1], it[2])
            elif it[0] == "re": shape.draw_rect(it[1])
            elif it[0] == "qu": shape.draw_quad(it[1])
            elif it[0] == "c": shape.draw_bezier(it[1], it[2], it[3], it[4])
        shape.finish(fill=p.get("fill"), color=p.get("color"), width=p.get("width") or 0,
                     even_odd=p.get("even_odd", False), closePath=p.get("closePath", False),
                     fill_opacity=(p.get("fill_opacity") or 1) * alpha, stroke_opacity=(p.get("stroke_opacity") or 1) * alpha)
    shape.commit()
    img = pix_to_pil(np_.get_pixmap(matrix=pymupdf.Matrix(ZOOM, ZOOM)))
    save(img, f"decorations/{name}", quality=86)
    # inner crop (inside the drawn frame) for the reflowed mobile layout
    inner = img.crop((16 * ZOOM, 17 * ZOOM, 1136 * ZOOM, 555 * ZOOM))
    inner = inner.resize((1120, round(1120 * inner.height / inner.width)), Image.LANCZOS)
    save(inner, f"decorations/{name}-inner", quality=84, small=False)
    print("decor", pn, name, common, len(keep), "alpha", alpha)


DECOR = {
    14: ("checker-orange-brigade", {}), 17: ("checker-yellow-stackd", {}), 23: ("checker-green-sprite", {"exclude_region": (670, 36, 1115, 540)}),
    27: ("checker-brown-madbury", {}), 31: ("checker-orange-happy-feet", {}), 35: ("checker-red-sock-racing", {}),
    39: ("checker-crimson-macbeth", {}), 40: ("diamonds-crimson-macbeth", {"exclude": [(66, 40)]}),
    44: ("checker-red-anyaberry", {}), 46: ("checker-red-anyaberry-label", {}),
    21: ("press-floor-green", {"all_shapes": True}), 25: ("press-floor-brown", {"all_shapes": True}),
    29: ("press-floor-navy", {"all_shapes": True}), 33: ("press-floor-red", {"all_shapes": True}),
}
for pn, (name, kw) in DECOR.items():
    render_decor(pn, name, **kw)

# 3. crops / full renders of composite artwork -----------------------------


def crop(pn, rect, name, zoom=3, alpha=False):
    page = doc[pn - 1]
    pm = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), clip=pymupdf.Rect(*rect), alpha=alpha)
    save(pix_to_pil(pm), name)


# the paper frame inner crop is shared by all cream pages on mobile
paper = Image.open(os.path.join(OUT, "decorations/paper-frame.webp"))
sx = paper.width / 1152
inner = paper.crop((int(16 * sx), int(17 * sx), int(1136 * sx), int(555 * sx)))
save(inner, "decorations/paper-inner", quality=84, small=False)

for nm, frac in [("sunburst-orange", (16/1152, 17/576, 1136/1152, 555/576)), ("sunburst-teal", (16/1152, 17/576, 1136/1152, 555/576)),
                 ("contents-sunburst", (16/1152, 17/576, 1136/1152, 555/576)), ("cover-sunburst", (0.025, 0.025, 0.975, 0.975))]:
    im = Image.open(os.path.join(OUT, f"decorations/{nm}.webp" if nm != "cover-sunburst" else "cover/cover-sunburst.webp"))
    c = im.crop((int(frac[0]*im.width), int(frac[1]*im.height), int(frac[2]*im.width), int(frac[3]*im.height)))
    save(c, f"decorations/{nm}-inner", quality=84, small=False)

crop(11, (0, 0, 1152, 576), "logofolio/zevro-logo", zoom=2)
crop(12, (0, 0, 1152, 576), "logofolio/zevro-identity-mockups", zoom=2)
crop(9, (78, 212, 516, 458), "logofolio/velune-logo-exploration", zoom=3)
crop(19, (128, 96, 302, 200), "social-media/stackd-logo", zoom=4)
crop(23, (674, 40, 1098, 517), "posters/sprite-six-pack-panel", zoom=3)
crop(48, (588, 42, 1012, 206), "contact/get-in-touch-lettering", zoom=3)
crop(48, (22, 22, 588, 556), "contact/telephone", zoom=2)

# report P48 cover patches (used to hide the image's baked-in contact text)
for p in doc[47].get_drawings():
    r = p["rect"]; print("P48 patch", round(r.x0), round(r.y0), round(r.x1), round(r.y1), H(p.get("fill")))

# updated artwork supplied after the PDF (replaces the PDF version of that page)
OVERRIDES = {"anyaberry-lifestyle.jpg": "packaging/anyaberry-lifestyle"}
for fn, name in OVERRIDES.items():
    src = os.path.join(ROOT, "assets-src", fn)
    if os.path.exists(src):
        save(Image.open(src).convert("RGB"), name, quality=90)

os.makedirs(os.path.join(ROOT, "src", "data"), exist_ok=True)
with open(os.path.join(ROOT, "src", "data", "assets.json"), "w") as f:
    json.dump(manifest, f, indent=1)
print("assets:", len(manifest))

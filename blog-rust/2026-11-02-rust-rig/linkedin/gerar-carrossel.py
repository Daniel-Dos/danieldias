import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1350
BG = "#171009"
SURFACE = "#241811"
BORDER = "#4a3220"
TEXT = "#f2e6d4"
MUTED = "#bda07a"
ACCENT = "#e0913f"
BLUE = "#7fd8b4"
GREEN = "#9fb37c"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

F = "/usr/share/fonts/truetype/noto/"
FONT_BOLD = F + "NotoSans-Bold.ttf"
FONT_REG = F + "NotoSans-Regular.ttf"
FONT_MONO = F + "NotoSansMono-Regular.ttf"
FONT_MONO_BOLD = F + "NotoSansMono-Bold.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

def font(path, size):
    return ImageFont.truetype(path, size)

def wrap(draw, text, f, max_width):
    lines, cur = [], ""
    for w in text.split():
        test = (cur + " " + w).strip()
        if draw.textlength(test, font=f) <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def base():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # moldura de poster antigo (mesmo tratamento da capa)
    d.rounded_rectangle([22, 22, W - 22, H - 22], radius=18, outline=ACCENT, width=3)
    d.rounded_rectangle([34, 34, W - 34, H - 34], radius=12, outline="#7a4f28", width=1)
    return img, d

def footer(d, page):
    d.text((90, H - 80), "Daniel Dias  ·  Rust & IA", font=font(FONT_REG, 24), fill=MUTED)
    d.text((W - 90, H - 80), f"{page}/7", font=font(FONT_REG, 24), fill=MUTED, anchor="ra")

def heading(d, kicker, title_lines, y=170, size=64):
    d.text((90, y), kicker, font=font(FONT_BOLD, 26), fill=ACCENT)
    yy = y + 55
    fb = font(FONT_SERIF, size)
    for line in title_lines:
        d.text((90, yy), line, font=fb, fill=TEXT)
        yy += int(size * 1.18)
    return yy

def bullet(d, x, y, text, f, color=TEXT, gap=22, dot=ACCENT, max_w=None):
    r = 7
    d.ellipse([x, y + 16, x + 2 * r, y + 16 + 2 * r], fill=dot)
    tx = x + 2 * r + gap
    if max_w is None:
        max_w = W - tx - 90
    lines = wrap(d, text, f, max_w)
    for line in lines:
        d.text((tx, y), line, font=f, fill=color)
        y += int(f.size * 1.35)
    return y + 12

def code_block(d, x, y, w, lines, size=25, title=None):
    lh = int(size * 1.55)
    pad = 26
    head = 44 if title else 0
    h = pad * 2 + head + lh * len(lines)
    d.rounded_rectangle([x, y, x + w, y + h], radius=16, fill="#0f0904", outline=BORDER, width=2)
    for i, c in enumerate(["#ff5f56", "#ffbd2e", "#27c93f"]):
        d.ellipse([x + 24 + i * 24, y + 20, x + 36 + i * 24, y + 32], fill=c)
    if title:
        d.text((x + w / 2, y + 16), title, font=font(FONT_REG, 20), fill=MUTED, anchor="ma")
    yy = y + pad + head
    fm = font(FONT_MONO, size)
    for line in lines:
        d.text((x + pad, yy), line, font=fm, fill=TEXT)
        yy += lh
    return y + h

# ---------------- Slide 1: capa (arte original + logo Rust) ----------------
cover = Image.open(os.path.join(BASE_DIR, "..", "img", "rust-rig.jpeg")).convert("RGB")
scale = max(W / cover.width, H / cover.height)
cover = cover.resize((int(cover.width * scale) + 1, int(cover.height * scale) + 1), Image.LANCZOS)
cx0 = (cover.width - W) // 2
cy0 = (cover.height - H) // 2
img = cover.crop((cx0, cy0, cx0 + W, cy0 + H)).convert("RGBA")

overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
for i in range(420):
    a = int(250 * (i / 420) ** 0.55)
    od.line([(0, H - 420 + i), (W, H - 420 + i)], fill=(14, 9, 5, a))
for i in range(540):
    if i < 400:
        a = 248
    else:
        a = int(248 * (1 - (i - 400) / 140) ** 0.8)
    od.line([(0, i), (W, i)], fill=(14, 9, 5, a))
img = Image.alpha_composite(img, overlay).convert("RGB")
d = ImageDraw.Draw(img)

# moldura de poster antigo
d.rounded_rectangle([22, 22, W - 22, H - 22], radius=18, outline=ACCENT, width=3)
d.rounded_rectangle([34, 34, W - 34, H - 34], radius=12, outline="#7a4f28", width=1)

# medalhao com o logo oficial do Rust
logo = Image.open(os.path.join(BASE_DIR, "rust-logo.png")).convert("RGBA")
logo = logo.resize((132, 132), Image.LANCZOS)
lcx, lcy, lr = 946, 132, 84
d.ellipse([lcx - lr, lcy - lr, lcx + lr, lcy + lr], fill="#1a1008", outline=ACCENT, width=3)
d.ellipse([lcx - lr + 9, lcy - lr + 9, lcx + lr - 9, lcy + lr - 9], outline="#8a5a2b", width=1)
img.paste(logo, (lcx - 66, lcy - 66), logo)

# titulo em serifa sobre a area escurecida
def ctext(x, y, txt, f, fill, anchor="mm"):
    d.text((x + 2, y + 3), txt, font=f, fill="#0b0603", anchor=anchor)
    d.text((x + 1, y + 2), txt, font=f, fill="#0b0603", anchor=anchor)
    d.text((x, y), txt, font=f, fill=fill, anchor=anchor)

ctext(W // 2, 76, "RUST  ·  IA GENERATIVA", font(FONT_BOLD, 24), "#d79a55")
ctext(W // 2, 160, "Primeiros Passos", font(FONT_SERIF, 62), "#f7e2c0")
ctext(W // 2, 246, "com IA em Rust", font(FONT_SERIF, 62), "#f7e2c0")
ctext(W // 2, 332, "usando Rig", font(FONT_SERIF, 62), "#f7e2c0")

# gancho na base
def stext(x, y, txt, f, fill):
    d.text((x + 2, y + 2), txt, font=f, fill="#0d0704")
    d.text((x + 1, y + 1), txt, font=f, fill="#0d0704")
    d.text((x, y), txt, font=f, fill=fill)

stext(80, H - 250, "Em menos de 30 linhas de código",
      font(FONT_SERIF, 42), "#f5d7a8")
stext(80, H - 180, "Daniel Dias  ·  Java · Go · Rust",
      font(FONT_REG, 26), MUTED)
d.rounded_rectangle([W - 250, H - 200, W - 80, H - 140], radius=30, outline="#7a4f28", width=2)
d.text((W - 165, H - 170), "arraste  »", font=font(FONT_BOLD, 24), fill=ACCENT, anchor="mm")
d.text((W - 80, H - 80), "1/7", font=font(FONT_REG, 24), fill=MUTED, anchor="ra")
slides = [img]

# ---------------- Slide 2: problema ----------------
img, d = base()
y = heading(d, "O PROBLEMA", ["O trabalho chato", "que ninguém quer fazer"])
y = max(y + 40, 480)
f_body = font(FONT_REG, 34)
for t in [
    "Montar requisições HTTP na mão",
    "Fazer parsing de JSON manualmente",
    "Gerenciar contexto e histórico da conversa",
    "Reescrever tudo ao trocar de provedor",
]:
    y = bullet(d, 90, y, t, f_body, max_w=880)
d.rounded_rectangle([90, 1000, 990, 1110], radius=16, fill="#241408", outline="#8a4c1c", width=2)
d.text((120, 1030), "É exatamente isso que o Rig resolve.", font=font(FONT_BOLD, 34), fill=ACCENT)
footer(d, 2)
slides.append(img)

# ---------------- Slide 3: o que é Rig ----------------
img, d = base()
y = heading(d, "A SOLUÇÃO", ["Rig: LLM para Rust,", "do jeito Rust"])
fr = font(FONT_REG, 32)
body = ("Framework leve e open source que abstrai as chamadas HTTP e o parsing "
        "de JSON para você focar na aplicação.")
yy = y + 30
for line in wrap(d, body, fr, 880):
    d.text((90, yy), line, font=fr, fill=MUTED)
    yy += 46

cards = [
    ("Agentes", "Comandos simples e prompt de sistema"),
    ("Ferramentas", "Agentes que executam código e funções"),
    ("RAG", "Acesso a documentos privados"),
]
cy = yy + 60
for i, (title, desc) in enumerate(cards):
    xx = 90 + i * 300
    d.rounded_rectangle([xx, cy, xx + 280, cy + 260], radius=18, fill=SURFACE, outline=BORDER, width=2)
    d.rectangle([xx, cy, xx + 280, cy + 6], fill=ACCENT if i == 0 else BLUE if i == 1 else GREEN)
    d.text((xx + 26, cy + 44), title, font=font(FONT_BOLD, 32), fill=TEXT)
    fd = font(FONT_REG, 24)
    ty = cy + 100
    for line in wrap(d, desc, fd, 228):
        d.text((xx + 26, ty), line, font=fd, fill=MUTED)
        ty += 34

d.text((90, 1190), "open source  ·  leve  ·  type-safe", font=font(FONT_BOLD, 26), fill=MUTED)
footer(d, 3)
slides.append(img)

# ---------------- Slide 4: pré-requisitos ----------------
img, d = base()
y = heading(d, "PREPARAÇÃO", ["Antes de escrever", "qualquer código"])
d.text((90, y + 30), "1. Autentique no Ollama Cloud", font=font(FONT_BOLD, 32), fill=TEXT)
y2 = code_block(d, 90, y + 90, 900, ["$ ollama signin"], size=28)
d.text((90, y2 + 50), "2. Crie o projeto e adicione as dependências", font=font(FONT_BOLD, 32), fill=TEXT)
y3 = code_block(d, 90, y2 + 110, 900, [
    "$ cargo new rust-rig-example",
    "$ cd rust-rig-example",
], size=25)
y4 = code_block(d, 90, y3 + 40, 900, [
    "[dependencies]",
    'rig = "0.46.0"',
    "",
    "[dependencies.tokio]",
    'version = "1.54.1"',
    'features = ["rt", "rt-multi-thread", "macros"]',
], size=21, title="Cargo.toml")
d.text((90, y4 + 40), "tokio é necessário para as operações assíncronas do Rig.",
       font=font(FONT_REG, 26), fill=MUTED)
footer(d, 4)
slides.append(img)

# ---------------- Slide 5: código ----------------
img, d = base()
y = heading(d, "MÃO NA MASSA", ["O código completo"], size=60)
code = [
    "use rig::AgentBuilder;",
    "use rig::providers::ollama;",
    "use rig::providers::ollama::Ollama;",
    "",
    "#[tokio::main]",
    "async fn main() -> Result<(), anyhow::Error> {",
    "    let client = Ollama::new()",
    '        .completion(ollama::GEMMA4.to_owned() + ":31b-cloud");',
    "",
    "    let agent = AgentBuilder::new(client)",
    '        .preamble("você é um especialista em Rust")',
    "        .build();",
    "",
    '    println!("{}", agent',
    '        .prompt("Explique as vantagens de Rust com IA.")',
    "        .await?.output());",
    "    Ok(())",
    "}",
]
code_block(d, 70, y + 30, 940, code, size=23, title="src/main.rs")
d.text((90, 1190), "Menos boilerplate. Mais lógica de negócio.", font=font(FONT_BOLD, 30), fill=ACCENT)
footer(d, 5)
slides.append(img)

# ---------------- Slide 6: diagrama ----------------
img, d = base()
y = heading(d, "POR DENTRO", ["Como o fluxo funciona"], size=60)
diagram = Image.open(os.path.join(BASE_DIR, "..", "img", "rust-rig-arquitetura.png")).convert("RGB")
max_w, max_h = 820, 790
scale = min(max_w / diagram.width, max_h / diagram.height)
dw, dh = int(diagram.width * scale), int(diagram.height * scale)
diagram = diagram.resize((dw, dh), Image.LANCZOS)
card_w, card_h = dw + 40, dh + 40
cx = (W - card_w) // 2
cy = y + 30
d.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=18, fill="#ffffff")
img.paste(diagram, (cx + 20, cy + 20))
footer(d, 6)
slides.append(img)

# ---------------- Slide 7: CTA ----------------
img, d = base()
d.text((90, 220), "PRÓXIMOS PASSOS", font=font(FONT_BOLD, 26), fill=ACCENT)
fb = font(FONT_SERIF, 82)
d.text((90, 300), "Coloque", font=fb, fill=TEXT)
d.text((90, 400), "em prática", font=fb, fill=TEXT)
d.rectangle([90, 540, 250, 548], fill=ACCENT)

fr = font(FONT_REG, 32)
texts = [
    ("Artigo completo", "Passo a passo, código e diagrama"),
    ("Código no GitHub", "Repositório com o exemplo pronto"),
]
yy = 610
for t, s in texts:
    d.text((90, yy), t, font=font(FONT_BOLD, 34), fill=TEXT)
    d.text((90, yy + 46), s, font=font(FONT_REG, 26), fill=MUTED)
    yy += 130

d.rounded_rectangle([90, 900, 990, 1020], radius=18, fill=SURFACE, outline=BORDER, width=2)
d.text((120, 930), "daniel-dos.github.io/danieldias/blog-rust", font=font(FONT_MONO, 26), fill=BLUE)
d.text((120, 974), "Artigo completo no blog", font=font(FONT_REG, 26), fill=MUTED)
footer(d, 7)
slides.append(img)


# ---------------- Capa alternativa: fundo escuro + logo ----------------
alt = Image.new("RGB", (W, H), BG)
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
for r in range(420, 0, -12):
    a = int(26 * (1 - r / 420))
    gd.ellipse([W // 2 - r, 330 - r, W // 2 + r, 330 + r], fill=(224, 145, 63, a))
alt = Image.alpha_composite(alt.convert("RGBA"), glow).convert("RGB")
ad = ImageDraw.Draw(alt)

# marca d'agua do logo no canto
wm = Image.open(os.path.join(BASE_DIR, "rust-logo.png")).convert("RGBA").resize((640, 640), Image.LANCZOS)
wm.putalpha(wm.split()[3].point(lambda px: int(px * 0.08)))
alt.paste(wm, (W - 560, H - 620), wm)

# moldura
ad.rounded_rectangle([22, 22, W - 22, H - 22], radius=18, outline=ACCENT, width=3)
ad.rounded_rectangle([34, 34, W - 34, H - 34], radius=12, outline="#7a4f28", width=1)

def atext(x, y, txt, f, fill, anchor="mm"):
    ad.text((x + 2, y + 3), txt, font=f, fill="#0b0603", anchor=anchor)
    ad.text((x, y), txt, font=f, fill=fill, anchor=anchor)

atext(W // 2, 120, "RUST  ·  IA GENERATIVA", font(FONT_BOLD, 24), "#d79a55")

# medalhao central
big_logo = Image.open(os.path.join(BASE_DIR, "rust-logo.png")).convert("RGBA").resize((196, 196), Image.LANCZOS)
br = 122
ad.ellipse([W // 2 - br, 330 - br, W // 2 + br, 330 + br], fill="#1a1008", outline=ACCENT, width=3)
ad.ellipse([W // 2 - br + 12, 330 - br + 12, W // 2 + br - 12, 330 + br - 12], outline="#8a5a2b", width=1)
alt.paste(big_logo, (W // 2 - 98, 330 - 98), big_logo)

atext(W // 2, 560, "Primeiros Passos", font(FONT_SERIF, 64), "#f7e2c0")
atext(W // 2, 650, "com IA em Rust", font(FONT_SERIF, 64), "#f7e2c0")
atext(W // 2, 740, "usando Rig", font(FONT_SERIF, 64), "#f7e2c0")
ad.rectangle([W // 2 - 70, 805, W // 2 + 70, 812], fill=ACCENT)
atext(W // 2, 880, "Em menos de 30 linhas de código", font(FONT_SERIF, 34), "#e0913f")
atext(W // 2, 940, "Rig + Ollama Cloud", font(FONT_REG, 27), MUTED)

atext(80, H - 180, "Daniel Dias  ·  Java · Go · Rust", font(FONT_REG, 26), MUTED, anchor="lm")
ad.rounded_rectangle([W - 250, H - 200, W - 80, H - 140], radius=30, outline="#7a4f28", width=2)
ad.text((W - 165, H - 170), "arraste  »", font=font(FONT_BOLD, 24), fill=ACCENT, anchor="mm")
ad.text((W - 80, H - 80), "1/7", font=font(FONT_REG, 24), fill=MUTED, anchor="ra")
alt_slides = [alt] + slides[1:]

out_dir = BASE_DIR
os.makedirs(out_dir, exist_ok=True)
for i, s in enumerate(slides, 1):
    s.save(os.path.join(out_dir, f"slide-{i:02d}.png"))

slides[0].save(
    os.path.join(out_dir, "rust-rig-carrossel.pdf"),
    save_all=True,
    append_images=slides[1:],
    resolution=144,
)
alt.save(os.path.join(out_dir, "slide-01-alternativa.png"))
alt_slides[0].save(
    os.path.join(out_dir, "rust-rig-carrossel-alternativo.pdf"),
    save_all=True,
    append_images=alt_slides[1:],
    resolution=144,
)
print("ok", len(slides))

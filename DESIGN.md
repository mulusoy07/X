# Oracle Gamer - Design System

## Genel Bakis
Oracle Gamer, Knight Online temali bir oyun toplulugu platformudur. Tasarim dili, antik kehanetle modern oyun estetigi harmanlanarak karanlik, zengin ve epik bir gorsel kimlik sunar.

---

## Renk Paleti

### Ana Renkler (Primary - Gold/Altin Tonlari)
Markanin ana kimligi altin tonlarina dayanir. Epik, antik ve degerli hissi yaratir.

| Token | HEX | CSS Variable | Kullanim |
|-------|-----|--------------|----------|
| `gold-300` | `#ffd86b` | `--gold-300` | Hover durumlari, vurgular |
| `gold-400` | `#f5b836` | `--gold-400` | Basliklar, ikonlar, aktif durumlar, ring |
| `gold-500` | `#e89a1f` | `--gold-500` | Primary butonlar, gradientler |
| `gold-600` | `#c97e10` | `--gold-600` | Gradient bitisleri, scrollbar |

### Karanlik Tonlar (Ink - Arka Plan Tonlari)
Derin, zengin kahverengi-siyah tonlari. Mistik ve premium his verir.

| Token | HEX | CSS Variable | Kullanim |
|-------|-----|--------------|----------|
| `ink-950` | `#0f0c0a` | `--ink-950` | En koyu arka plan, hero overlay |
| `ink-900` | `#14100d` | `--ink-900` | Ana arka plan (body, html) |
| `ink-850` | `#1a1410` | `--ink-850` | Hero gradient, kart gradient bitis |
| `ink-800` | `#1f1814` | `--ink-800` | Kartlar, paneller, dropdown |
| `ink-750` | `#261e18` | `--ink-750` | Hover arka planlari |
| `ink-700` | `#2e251e` | `--ink-700` | Secondary arka plan, input |
| `ink-600` | `#3a2f26` | `--ink-600` | Aktif durumlar, border |

### Metin Renkleri
| Token | HEX | CSS Variable | Kullanim |
|-------|-----|--------------|----------|
| `cream` | `#f4e7cf` | `--cream` | Ana metin rengi (primary text) |
| `cream-dim` | `#c9b89a` | `--cream-dim` | Ikincil metin, aciklamalar |
| `muted` | `#8a7c69` | `--muted` | Meta bilgiler, tarihler, placeholder |
| `line` | `#2b2218` | `--line` | Border, cizgiler, ayiricilar |

### Durum Renkleri (Status Colors)
| Durum | Ana Renk | Light | Kullanim |
|-------|----------|-------|----------|
| Online/Basari | `emerald-500` (#22c55e) | `emerald-400` (#4ade80) | Aktif durumlar, basarili islemler |
| Bakim/Uyari | `amber-500` (#f5b836) | `amber-400` (#fbbf24) | Bakim modu, uyarilar |
| Offline/Hata | `rose-500` (#f43f5e) | `rose-400` (#fb7185) | Kapali durumlar, hatalar |
| Info | `sky-500` (#0ea5e9) | `sky-400` (#38bdf8) | Bilgilendirme |
| Premium | `violet-500` (#8b5cf6) | `violet-400` (#a78bfa) | Premium icerikler |

### Event/Kategori Renkleri (Badge)
| Kategori | Renk | Tailwind Class |
|----------|------|----------------|
| News | Rose | `bg-rose-500` |
| Guides | Sky | `bg-sky-500` |
| Events | Emerald | `bg-emerald-500` |
| Maintenance | Amber | `bg-amber-500` |

---

## Tipografi

### Font Aileleri

```css
--font-display: "Inter", system-ui, sans-serif;
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "Geist Mono", monospace;
```

### Tailwind Kullanimi
```html
<h1 class="font-display">Baslik</h1>
<p class="font-sans">Normal metin</p>
<code class="font-mono">Kod</code>
```

### Tipografi Olcekleri

| Element | Boyut | Agirlik | Tailwind Class | Ek Ozellikler |
|---------|-------|---------|----------------|---------------|
| Hero Baslik | 60-96px | 800 | `text-6xl md:text-7xl lg:text-8xl font-extrabold` | text-gold-400, drop-shadow |
| Sayfa Basligi | 24-30px | 700 | `text-2xl md:text-3xl font-bold` | font-display |
| Kart Basligi | 20px | 700 | `text-xl font-bold` | font-display |
| Section Label | 11px | 700 | `text-[11px] font-bold` | tracking-[0.25em], uppercase, text-gold-400 |
| Body Text | 14-16px | 400 | `text-sm text-base` | text-cream-dim, leading-relaxed |
| Meta Text | 10-12px | 400-600 | `text-[10px] text-[11px] text-xs` | text-cream-dim, text-muted |
| Badge Text | 10px | 700 | `text-[10px] font-bold` | uppercase, tracking-wider |

---

## Layout Sistemi

### Container
```css
max-w-[1400px] mx-auto px-4 lg:px-6
```

### Grid Sistemi (Masonry Yaklasimi)
Ana sayfa 3 kolonlu grid kullanir. Sol ve sag kolonlar flex ile dikey dizilir, her bilesen dogal yuksekliginde kalir.

```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <!-- Sol Kolon - 2/3 genislik -->
  <div class="lg:col-span-2 flex flex-col gap-6">
    <FeaturedNews />
    <NewsGrid />
    <RankingsSection />
  </div>
  
  <!-- Sag Kolon - 1/3 genislik -->
  <div class="lg:col-span-1 flex flex-col gap-6">
    <ServerStatus />
    <EventsSection />
    <ForumTopics />
  </div>
</div>
```

### Breakpoints
| Breakpoint | Boyut | Kullanim |
|------------|-------|----------|
| Default | < 768px | Mobil (tek kolon) |
| `md:` | >= 768px | Tablet |
| `lg:` | >= 1024px | Desktop (3 kolon) |
| `xl:` | >= 1280px | Genis ekran |

### Spacing Skalasi
| Token | Boyut | Kullanim |
|-------|-------|----------|
| `gap-1` / `p-1` | 4px | Ikon-metin arasi |
| `gap-2` / `p-2` | 8px | Kucuk elemanlar |
| `gap-3` / `p-3` | 12px | Liste itemlari |
| `gap-4` / `p-4` | 16px | Kart icerigi |
| `gap-6` / `p-6` | 24px | Sectionlar arasi |

---

## Bilesenler (Components)

### Butonlar

#### Gold Button (Primary)
```css
.gold-btn {
  background: linear-gradient(180deg, #fbc24a 0%, #e89a1f 100%);
  color: #1a1410;
}
.gold-btn:hover {
  filter: brightness(1.05);
}
```

**ONEMLI: Gold butonlarda shadow KULLANILMAZ!**

```html
<!-- DOGRU -->
<button class="gold-btn rounded-lg px-5 h-11">Oyunu Indir</button>

<!-- YANLIS - shadow kullanmayin -->
<button class="gold-btn shadow-lg shadow-gold-500/25">...</button>
```

#### Outline Button (Secondary)
```css
.outline-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
}
.outline-btn:hover {
  border-color: var(--gold-500);
  color: var(--gold-300);
}
```

#### Buton Boyutlari
| Boyut | Class |
|-------|-------|
| Small | `h-9 px-3 text-sm rounded-md` |
| Medium | `h-10 px-4 text-sm rounded-lg` |
| Large | `h-11 px-5 text-sm rounded-lg` |
| XL | `h-12 px-6 text-base rounded-xl` |

### Kartlar

```css
.card {
  background: linear-gradient(180deg, #1f1814 0%, #1a1410 100%);
  border: 1px solid var(--line);
}
```

```html
<div class="card rounded-xl overflow-hidden">
  <!-- Section Header -->
  <div class="section-header">...</div>
  <!-- Content -->
  <div class="p-4">...</div>
</div>
```

### Section Header
```css
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  background: linear-gradient(90deg, rgba(245, 184, 54, 0.06) 0%, transparent 60%);
}
```

```html
<div class="section-header">
  <div class="flex items-center gap-3">
    <div class="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
      <IconTrophy class="w-4 h-4" />
    </div>
    <div>
      <h3 class="font-semibold text-cream">Baslik</h3>
      <p class="text-xs text-cream-dim">Aciklama</p>
    </div>
  </div>
  <Link class="text-xs text-gold-400 hover:text-gold-300">
    Tumunu Gor <IconChevronRight />
  </Link>
</div>
```

### Tab Pills
```css
.tab-pill {
  background: var(--ink-800);
  border: 1px solid var(--line);
}
.tab-pill.active {
  background: linear-gradient(180deg, #fbc24a, #e89a1f);
  color: #1a1410;
  border-color: transparent;
}
```

### Badge/Tag Stilleri
```html
<!-- News Tag -->
<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-white tracking-wider">
  News
</span>

<!-- Title Badge -->
<span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
  TITLE #1
</span>
```

### Status Badge
```css
.status-on {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.35);
  color: #4ade80;
}
.status-maint {
  background: rgba(245, 184, 54, 0.1);
  border: 1px solid rgba(245, 184, 54, 0.4);
  color: #fbbf24;
}
.status-off {
  background: rgba(244, 63, 94, 0.1);
  border: 1px solid rgba(244, 63, 94, 0.35);
  color: #fb7185;
}
```

### Progress Bar
```html
<div class="h-2 rounded-full bg-ink-900 overflow-hidden">
  <div 
    class="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400"
    style="width: 65%"
  />
</div>
```

Gradient varyantlari:
- Gold: `from-gold-500 to-gold-400`
- Emerald: `from-emerald-500 to-emerald-400`
- Amber: `from-amber-500 to-amber-400`
- Rose: `from-rose-500 to-rose-400`

### Checkbox (Custom)
Tema ile uyumlu ozel checkbox tasarimi. Gold gradient checked state.

```html
<input type="checkbox" class="oracle-checkbox" />
```

```css
.oracle-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid var(--line);
  border-radius: 4px;
  background: var(--ink-900);
  cursor: pointer;
  transition: all 0.2s ease;
}

.oracle-checkbox:hover {
  border-color: var(--gold-500);
  background: rgba(245, 184, 54, 0.05);
}

.oracle-checkbox:checked {
  background: linear-gradient(180deg, #fbc24a 0%, #e89a1f 100%);
  border-color: var(--gold-500);
}

.oracle-checkbox:checked::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 9px;
  border: solid var(--ink-900);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
```

### Switch (Custom)
Tema ile uyumlu toggle switch. Gold gradient aktif state.

```html
<input type="checkbox" class="oracle-switch" />
```

```css
.oracle-switch {
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: var(--ink-700);
  border: 1px solid var(--line);
  cursor: pointer;
  transition: all 0.3s ease;
}

.oracle-switch::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--cream-dim);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.oracle-switch:checked {
  background: linear-gradient(180deg, #fbc24a 0%, #e89a1f 100%);
  border-color: var(--gold-500);
}

.oracle-switch:checked::before {
  transform: translateX(20px);
  background: var(--ink-900);
}
```

### Checkbox + Label Pattern
```html
<label class="flex items-center gap-3 cursor-pointer group">
  <input type="checkbox" class="oracle-checkbox" />
  <span class="text-sm text-cream-dim group-hover:text-cream transition-colors">
    Beni hatirla
  </span>
</label>
```

---

## Hero Section

### Sabit Yukseklik (ONEMLI!)
Hero slider sabit yukseklikte olmalidir, icerik degistiginde sayfa hareket etmemeli.

```html
<div class="h-[480px] md:h-[520px] lg:h-[560px]">
  <!-- Slider content -->
</div>
```

### Hero Arka Plan
```css
.bg-hero {
  background:
    radial-gradient(70% 60% at 50% 35%, rgba(245, 184, 54, 0.18), transparent 70%),
    radial-gradient(40% 40% at 20% 80%, rgba(70, 30, 90, 0.55), transparent 70%),
    radial-gradient(50% 50% at 85% 70%, rgba(20, 90, 140, 0.45), transparent 70%),
    linear-gradient(180deg, #1a120d 0%, #14100d 70%, #0f0c0a 100%);
}
```

---

## Border & Radius

### Border Radius Skalasi
| Token | Boyut | Kullanim |
|-------|-------|----------|
| `rounded` | 4px | Kucuk badge |
| `rounded-md` | 6px | Input, kucuk buton |
| `rounded-lg` | 8px | Buton, kucuk kart |
| `rounded-xl` | 12px | Kart |
| `rounded-2xl` | 16px | Modal, buyuk panel |
| `rounded-full` | 9999px | Avatar, pill, dot |

### Border Stilleri
```html
<!-- Normal border -->
<div class="border border-line">

<!-- Vurgulu border -->
<div class="border border-gold-500/20">

<!-- Hover border -->
<div class="hover:border-gold-500/30">

<!-- Status border -->
<div class="border border-emerald-500/40">
```

---

## Efektler

### Shadow (Dikkatli Kullanin!)
```css
/* Kart/Modal shadow */
shadow-2xl shadow-black/50

/* Modal ozel shadow */
shadow-[0_40px_80px_-16px_rgba(0,0,0,0.8),0_0_0_1px_rgba(245,184,54,0.1)_inset]
```

**ONEMLI: Gold butonlarda shadow KULLANILMAZ!**

### Backdrop Blur
```html
<div class="backdrop-blur-sm">  <!-- 4px -->
<div class="backdrop-blur-xl">  <!-- 24px -->
```

### Gradient Ornekleri
```css
/* Kart arka plan */
background: linear-gradient(180deg, #1f1814 0%, #1a1410 100%);

/* Gold Button */
background: linear-gradient(180deg, #fbc24a 0%, #e89a1f 100%);

/* Section header gold glow */
background: linear-gradient(90deg, rgba(245, 184, 54, 0.06) 0%, transparent 60%);
```

---

## Scrollbar

```css
* {
  scrollbar-color: #c97e10 #14100d;
  scrollbar-width: thin;
}
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
*::-webkit-scrollbar-track {
  background: #14100d;
}
*::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #f5b836 0%, #c97e10 100%);
  border: 2px solid #14100d;
  border-radius: 999px;
}
*::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #ffd86b, #e89a1f);
}
```

### Ince Scrollbar (Paneller icin)
```css
.scrollbar-slim::-webkit-scrollbar {
  width: 6px;
}
```

---

## Animasyonlar

### Pulse (Status Dot)
```css
.dot-pulse {
  box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7);
  animation: pulse 1.8s infinite;
}
@keyframes pulse {
  70% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); }
  100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
}
```

### Ticker (News Ticker)
```css
.ticker-track {
  animation: ticker 60s linear infinite;
}
@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

### Logo Hover
```css
.logo-hover:hover {
  transform: scale(1.03) translateY(-2px);
  filter: drop-shadow(0 4px 16px rgba(245, 184, 54, 0.25)) brightness(1.05);
}
```

### Transition Degerleri
```html
<div class="transition-all duration-300">      <!-- Tum ozellikler, 300ms -->
<div class="transition-colors duration-200">   <!-- Sadece renk -->
<div class="transition-transform duration-500 ease-out"> <!-- Transform -->
```

---

## Ikonlar

### Ikon Kutuphanesi
**@tabler/icons-react** kullanilir.

```tsx
import { IconTrophy, IconDownload, IconUser } from "@tabler/icons-react"
```

### Ikon Boyutlari
| Boyut | Class | Kullanim |
|-------|-------|----------|
| XS | `w-3 h-3` | Meta ikonlari (tarih, yazar) |
| SM | `w-4 h-4` | Buton ikonlari, badge |
| MD | `w-5 h-5` | Nav ikonlari |
| LG | `w-6 h-6` | Kart header ikonlari |
| XL | `w-7 h-7` | Buyuk vurgular |

### Ikon Renkleri
```html
<Icon class="text-gold-400" />      <!-- Vurgulu -->
<Icon class="text-gold-500/60" />   <!-- Soluk -->
<Icon class="text-cream-dim" />     <!-- Normal -->
<Icon class="text-emerald-400" />   <!-- Basari -->
<Icon class="text-rose-400" />      <!-- Hata -->
<Icon class="text-amber-400" />     <!-- Uyari -->
```

### Ikon Container
```html
<!-- Section header icon -->
<div class="w-9 h-9 rounded-md bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
  <IconTrophy class="w-4 h-4" />
</div>

<!-- Avatar style icon -->
<div class="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
  <IconUser class="w-5 h-5 text-ink-900" />
</div>
```

---

## Ozel Siniflar

### Placeholder Image
```css
.placeholder-img {
  background: linear-gradient(
      135deg,
      rgba(245, 184, 54, 0.08),
      rgba(70, 30, 90, 0.18)
    ),
    repeating-linear-gradient(45deg, #1f1814 0 8px, #251d18 8px 16px);
  color: #6b5a47;
}
```

### Divider Gold
```css
.divider-gold {
  height: 2px;
  width: 80px;
  background: linear-gradient(90deg, transparent, #f5b836, transparent);
}
```

### Dock Panel
```css
.dock {
  background: linear-gradient(180deg, #1f1814 0%, #14100d 100%);
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 20px 40px -16px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(245, 184, 54, 0.06) inset;
}
```

---

## Z-Index Hiyerarsisi

| Deger | Kullanim |
|-------|----------|
| `z-10` | Floating elemanlar |
| `z-20` | Dropdown menu |
| `z-40` | Header (sticky) |
| `z-50` | Header ustunde olanlar |
| `z-[60]` | Dropdown overlay |
| `z-[100]` | Modal, mobile menu |

---

## Responsive Kurallar

### Mobil Oncelikli
Tum stiller mobil icin yazilir, buyuk ekranlar icin override edilir.

### Gizleme/Gosterme
```html
<div class="hidden lg:block">    <!-- Mobilde gizli, desktopda gorunur -->
<div class="lg:hidden">          <!-- Desktopda gizli -->
<div class="hidden md:flex">     <!-- Tablettan itibaren flex -->
```

### Grid Responsive
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

## Erisilebilirlik

### Kontrast Oranlari
- `cream` (#f4e7cf) on `ink-900` (#14100d) = **12.5:1** (AAA)
- `gold-400` (#f5b836) on `ink-900` (#14100d) = **8.2:1** (AAA)

### Focus Durumlari
```css
* {
  @apply outline-ring/50;
}
```

### Touch Target
Interaktif elemanlar minimum 40px yuksekliginde olmalidir.

### Alt Text
Tum resimlere anlamli `alt` text eklenmeli.

---

## Sayfa Sablonu Patterns (Templates)

Bu bolum sayfa-bazli bilesenler ve uygulanmis kararlari icerir. Yeni sayfa yaparken bu patterns'lere uy.

### 1. Sayfa Header (Breadcrumb + Heading)

Tum ic sayfalarda (Rankings, Guide, vs.) bu kombin kullanilir:

**Standart: B2 Breadcrumb + H2 Heading**

```tsx
<div className="max-w-7xl mx-auto px-4 pt-6">
  {/* Breadcrumb (icon prefixed + slash separator) */}
  <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm">
    <Link href="/" className="inline-flex items-center gap-1.5 text-cream-dim hover:text-cream transition-colors">
      <IconHome className="w-4 h-4" />
      Ana Sayfa
    </Link>
    <IconSlash className="w-3.5 h-3.5 text-cream-dim/40 -rotate-12" />
    <Link href="/rankings" className="inline-flex items-center gap-1.5 text-cream-dim hover:text-cream transition-colors">
      <IconTrophy className="w-4 h-4" />
      Rankings
    </Link>
    <IconSlash className="w-3.5 h-3.5 text-cream-dim/40 -rotate-12" />
    <span className="inline-flex items-center gap-1.5 font-semibold text-gold-300">
      <IconUsers className="w-4 h-4" />
      Users
    </span>
  </nav>
</div>

<div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
  {/* H2 Heading (icon badge + title) */}
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
      <IconTrophy className="w-6 h-6" />
    </div>
    <div>
      <h1 className="font-display text-2xl font-bold text-cream tracking-tight">Sayfa Basligi</h1>
      <p className="text-sm text-cream-dim">Sayfa aciklamasi</p>
    </div>
  </div>
  ...
</div>
```

**Kurallar:**
- Breadcrumb son segmenti `text-gold-300 font-semibold`, oncekiler `text-cream-dim hover:text-cream`
- Separator: `IconSlash w-3.5 h-3.5 text-cream-dim/40 -rotate-12`
- Heading icon badge: `w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 text-gold-400`
- Title: `font-display text-2xl font-bold text-cream tracking-tight`
- Subtitle: `text-sm text-cream-dim`

Diger varyasyonlar `/templates/page-headers` sayfasinda gosterilmistir (B1/B3/B4, H1/H3/H4).

---

### 2. Themed Select (Custom Dropdown)

Native `<select>` yerine kullanilir. Header dil dropdown'i pattern'i baz alinmistir.

**Yapi:**

```tsx
function ThemedSelect<T extends string | number>({
  value, onChange, options, placeholder, width = "w-full sm:w-40"
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  placeholder?: string
  width?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Click outside + ESC kapatma
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const current = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={`relative ${width}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-10 px-3 flex items-center gap-2 rounded-xl bg-ink-800/60 border border-line/60 hover:border-gold-500/30 transition-all text-sm group"
      >
        <span className={`flex-1 truncate text-left ${current ? "text-cream" : "text-cream-dim/60"}`}>
          {current?.label ?? placeholder}
        </span>
        <IconChevronDown className={`w-4 h-4 text-cream-dim group-hover:text-gold-400 transition-all ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-ink-800/95 backdrop-blur-xl border border-gold-500/20 rounded-xl shadow-2xl overflow-hidden z-[60] p-1.5 max-h-72 overflow-y-auto">
          {options.map((opt) => {
            const active = opt.value === value
            return (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 text-left text-sm transition-all ${
                  active
                    ? "bg-gold-500/10 text-gold-300"
                    : "text-cream hover:bg-ink-700/50 hover:text-gold-300"
                }`}
              >
                <span className="flex-1 truncate">{opt.label}</span>
                {active && <IconCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

**Style spec:**
| Parca | Class |
|-------|-------|
| Trigger | `h-10 px-3 rounded-xl bg-ink-800/60 border-line/60 hover:border-gold-500/30` |
| Trigger text | `text-sm text-cream` (active) / `text-cream-dim/60` (placeholder) |
| Chevron | `w-4 h-4 text-cream-dim group-hover:text-gold-400` + `rotate-180` aktifken |
| Panel | `mt-2 bg-ink-800/95 backdrop-blur-xl border-gold-500/20 rounded-xl shadow-2xl z-[60]` |
| Panel padding | `p-1.5 max-h-72 overflow-y-auto` |
| Item normal | `text-cream hover:bg-ink-700/50 hover:text-gold-300` |
| Item active | `bg-gold-500/10 text-gold-300` + `IconCheck` saginda |

**Klipleme uyarisi:** Select'in bulundugu container'da `overflow-hidden` KULLANMAYIN — dropdown panel kirpilir. Gerekirse `overflow-visible` zorunlu.

---

### 3. Search Input (Icon Prefixed)

```tsx
<div className="relative w-full sm:flex-1 min-w-[220px]">
  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim/70" />
  <input
    type="text"
    placeholder="Kullanici adi ara..."
    value={value}
    onChange={(e) => setValue(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="w-full h-10 pl-9 pr-3 rounded-xl bg-ink-800/60 border border-line/60 text-sm text-cream placeholder:text-cream-dim/50 hover:border-gold-500/30 focus:outline-none focus:border-gold-500/50 focus:bg-ink-800 transition disabled:opacity-50"
  />
</div>
```

**Spec:**
- Container `relative` + min genislik (250px civari)
- Icon `absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-dim/70`
- Input padding: `pl-9 pr-3` (sol icon icin yer)
- Input: `h-10 rounded-xl bg-ink-800/60 border-line/60`
- Hover: `hover:border-gold-500/30`
- Focus: `focus:border-gold-500/50 focus:bg-ink-800`

---

### 4. Filter Section Pattern

Sayfa filtreleme bilesenlerinin standart kabugu. **Smart Compact (V4)** pattern resmi olarak secildi.

**Yapi:** Top bar (search + Filtrele toggle + Ara) + Active chips alani (kosullu) + Expandable panel (acilinca).

```tsx
<div className="rounded-2xl border border-line bg-ink-900/40">
  {/* Top bar */}
  <div className="p-3 sm:p-4 flex flex-wrap items-center gap-2 sm:gap-3">
    {/* Search input */}
    {/* Filtrele toggle button — aktif filter sayisi rozetli */}
    {/* Primary "Ara" button — gradient gold */}
  </div>

  {/* Active filter chips (kosullu) */}
  {activeChips.length > 0 && (
    <div className="px-3 sm:px-4 pb-3 flex items-center gap-2 flex-wrap">
      <span className="text-[10px] font-black uppercase tracking-widest text-cream-dim/60">Aktif:</span>
      {activeChips.map((chip) => (
        <FilterChip key={chip.key} {...chip} />
      ))}
      <button onClick={onReset} className="text-[11px] text-cream-dim/70 hover:text-cream-dim font-semibold underline-offset-2 hover:underline ml-1">
        Tumunu temizle
      </button>
    </div>
  )}

  {/* Expandable filter panel */}
  {open && (
    <div className="border-t border-line bg-ink-900/40 p-3 sm:p-4 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <LabelledField label="Nation"><ThemedSelect ... /></LabelledField>
        ...
      </div>
      <div className="flex justify-end pt-1 border-t border-line/60">
        <button className="mt-2 inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-cream-dim text-xs font-semibold hover:text-cream hover:bg-ink-800 transition">
          <IconEraser className="w-3.5 h-3.5" />
          Filtreleri sifirla
        </button>
      </div>
    </div>
  )}
</div>
```

**Container:** `rounded-2xl border-line bg-ink-900/40` (overflow-hidden YOK)

**Filtrele toggle button:**
- Inactive: `bg-ink-800/60 border-line/60 text-cream-dim`
- Active veya filtre var: `bg-gold-500/10 border-gold-500/40 text-gold-300`
- Active count rozeti: `min-w-[18px] h-[18px] rounded-full bg-gold-500 text-ink-950 text-[10px] font-black`

**Filter Chip (active filter rozeti):**
```tsx
<button
  onClick={onClear}
  className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs font-semibold text-gold-300 hover:bg-gold-500/20 transition"
>
  <span>{label}</span>
  <IconX className="w-3 h-3 opacity-60 group-hover:opacity-100" />
</button>
```

---

### 5. Form Field Label

Filter panel ve form alanlarinda kullanilan kucuk label:

```tsx
function LabelledField({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-cream-dim/60 px-1">
        {label}
      </label>
      {children}
    </div>
  )
}
```

**Spec:** `text-[10px] font-black uppercase tracking-widest text-cream-dim/60`

---

### 6. Custom Tooltip (CSS-only group hover)

Shadcn Tooltip yerine **CSS-only named group** pattern'i kullanilir. Quick-actions component'inden alinmistir.

```tsx
<span className="relative group/np inline-block">
  {/* Trigger content (tikladiginda hover edilen) */}
  <span className="cursor-help">{compactValue}</span>

  {/* Tooltip — named group hover ile gosterilir */}
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-ink-800 border border-line text-sm text-cream font-medium whitespace-nowrap opacity-0 group-hover/np:opacity-100 group-hover/np:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none shadow-xl z-20">
    {fullValue}
  </div>
</span>
```

**Kullanim:**
- **Named group** (`group/np`, `group/info`, vs.) — outer hover'larla karismaz
- **Trigger:** `cursor-help` (degeri full-text icin)
- **Position:** `absolute bottom-full left-1/2 -translate-x-1/2 mb-2`
- **Style:** `bg-ink-800 border-line shadow-xl rounded-lg z-20`
- **Animation:** `opacity-0 → opacity-100` + `translate-y-1 → translate-y-0`
- **Pointer:** `pointer-events-none` zorunlu (mouse trap'lemesin)

Boyut:
- Tablo/satir tooltip: `px-3 py-1.5 text-sm`
- Mini tooltip (icon-only buton): `px-2 py-1 text-xs`

---

### 7. Number Formatting (Compact Display)

Buyuk sayilar icin kompakt format. Tooltip ile tam degeri gosterir.

```tsx
function compactNumber(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000
    return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M`
  }
  if (n >= 1_000) {
    const v = n / 1_000
    return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}K`
  }
  return n.toString()
}
```

**Cikti ornekleri:**
- `1.500.000` → `1.5M`
- `12.500.000` → `13M` (10+ icin tam sayi)
- `275.512` → `276K`
- `8.250` → `8.3K`
- `850` → `850` (1000 alti tam)

**Birlikte kullanim:** Hover'da custom tooltip ile **tam degeri** goster. `formattedLoyalty` (`1.500.000`) tooltip'te, `compactNumber(loyalty)` (`1.5M`) ekranda.

---

### 8. Top 3 Rank Accent (Sira Vurgusu)

Listelerde ilk 3'e ozel renk paleti:

| Sira | Border / BG | Icon | HEX |
|------|-------------|------|-----|
| #1 (Gold) | `from-yellow-500/10 to-yellow-600/5 border-yellow-500/30` | `IconCrown` | `#eab308` |
| #2 (Silver) | `from-zinc-400/10 to-zinc-500/5 border-zinc-400/30` | `IconMedal` | `#a1a1aa` |
| #3 (Bronze) | `from-orange-500/10 to-orange-600/5 border-orange-500/30` | `IconAward` | `#f97316` |
| 4+ (Normal) | Cift: `bg-ink-900/40 border-line` / Tek: `bg-ink-800/30 border-line/60` | Sayi | `text-cream-dim` |

```tsx
function rankAccent(rank: number) {
  if (rank === 1) return { bg: "from-yellow-500/10 to-yellow-600/5", border: "border-yellow-500/30", icon: IconCrown, color: "#eab308" }
  if (rank === 2) return { bg: "from-zinc-400/10 to-zinc-500/5", border: "border-zinc-400/30", icon: IconMedal, color: "#a1a1aa" }
  if (rank === 3) return { bg: "from-orange-500/10 to-orange-600/5", border: "border-orange-500/30", icon: IconAward, color: "#f97316" }
  return null
}
```

Top 3 rank kutusu icin inline style ile renk uygulamasi (Tailwind safelist disinda kalmasin diye):
```tsx
<div
  className="w-10 h-10 rounded-lg flex items-center justify-center"
  style={{ backgroundColor: `${accent.color}15`, border: `1px solid ${accent.color}50` }}
>
  <Icon style={{ color: accent.color }} />
</div>
```

---

### 9. Buton — Icon Morph Variant

Hover'da icon degisen buton (V4 stilinde). Ranking "Ara" butonu disindan secildi olmadi ama showcase olarak buton template'lerinde kayitli (`/templates/buttons` v04).

```tsx
<button className="group relative h-10 px-5 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 text-ink-950 text-sm font-bold hover:brightness-110 transition overflow-hidden">
  <span className="relative h-4 w-4 inline-block">
    <IconSearch className="absolute inset-0 h-4 w-4 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 group-hover:rotate-45" />
    <IconListSearch className="absolute inset-0 h-4 w-4 opacity-0 translate-y-2 -rotate-45 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-0" />
  </span>
  <span>Ara</span>
</button>
```

**Onemli:** `tracking-wider` veya genislik degistiren transition KULLANMAYIN — buton boyutu sabit kalmali yoksa cevre elemanlar zıplar.

---

### 10. Standart Buton Hover Tercihi

Gold gradient butonlarda **iki yaklasim** mumkun:

| Yaklasim | Class | Kullanim |
|----------|-------|----------|
| **Brightness (tercih)** | `hover:brightness-110` | Filter, action butonlari |
| **Lift glow** | `hover:shadow-lg hover:shadow-gold-500/20` | Hero CTA, prominent buttons |

**ONEMLI:** Yine de tek butonda iki yaklasim KARISTIRILMAZ.

---

### 11. Buton/Input Tutarli Yukseklik ve Radius

Filter ve form kapsayicisindaki tum kontroller **ayni boyut**:

| Element | Yukseklik | Radius |
|---------|-----------|--------|
| Input | `h-10` | `rounded-xl` |
| Themed Select | `h-10` | `rounded-xl` |
| Buton (medium) | `h-10` | `rounded-xl` |
| Buton (hero) | `h-12` | `rounded-xl` |
| Mini buton (panel ici) | `h-9` | `rounded-lg` |

---

### 12. Transparency Tier System (cream-dim opacity)

Metnin gorsel hiyerarsisi icin `text-cream-dim` ust uste opacity tier'leri:

| Class | Kullanim |
|-------|----------|
| `text-cream-dim` | Ikincil metin (default) |
| `text-cream-dim/80` | Hafif soluk meta |
| `text-cream-dim/70` | Iconlar, kucuk meta |
| `text-cream-dim/60` | Form label, tracking-widest baslik |
| `text-cream-dim/50` | Placeholder, disabled-yakin |
| `text-cream-dim/40` | Separator icon, en soluk (slash, divider) |

Ayni mantik border icin: `border-line`, `border-line/60`, `border-line/50`.

---

### 13. Background Tier System

Layered bg paleti (transparent dark tones):

| Class | Kullanim |
|-------|----------|
| `bg-ink-950` | Ana sayfa zemin |
| `bg-ink-900/50` | Sticky header |
| `bg-ink-900/40` | Filter container, kart panel |
| `bg-ink-900/30` | Card variant subtle |
| `bg-ink-800/95 backdrop-blur-xl` | Dropdown panel (yuksek z-index, blur ile ayri katman) |
| `bg-ink-800/60` | Input, select, secondary buton |
| `bg-ink-800/30` | Player row tek satir (zebra) |
| `bg-ink-800` | Tooltip, en sade ozel kutu |

---

### 14. Gold Tinted Container Pattern

Vurgulu kucuk kutular (heading icon badge, count rozeti):

```html
<!-- Heading icon badge (H2) -->
<div class="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400">
  <Icon class="w-6 h-6" />
</div>

<!-- Active state (filter toggle, breadcrumb son) -->
<button class="bg-gold-500/10 border-gold-500/40 text-gold-300">

<!-- Mini count rozeti -->
<span class="min-w-[18px] h-[18px] rounded-full bg-gold-500 text-ink-950 text-[10px] font-black">
  3
</span>
```

**Kurallar:**
- Background `bg-gold-500/10` veya `bg-gold-500/15` (badge) — 0.05 araliginda
- Border `border-gold-500/30` veya `border-gold-500/40`
- Text `text-gold-300` (vurgulu) veya `text-gold-400` (ikon)
- Solid gold (`bg-gold-500`) sadece counter rozetlerde + ana CTA gradientinde

---

### 15. Pagination — "Daha Fazla Yukle"

Liste sayfalarinda standart load-more butonu:

```tsx
<button
  onClick={() => setPage((p) => p + 1)}
  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ink-900 border border-line text-cream-dim hover:text-gold-400 hover:border-gold-500/40 transition text-sm font-semibold"
>
  <IconChevronsDown className="w-4 h-4" />
  Daha fazla yukle
</button>
```

Tamami listelendiyse:
```tsx
<p className="text-sm text-cream-dim/80">
  Toplam <span className="font-bold text-cream tabular-nums">{count}</span> oyuncu listelendi.
</p>
```

---

### 16. Empty State

Sonuc bulunamadi durumu:

```tsx
<div className="rounded-xl border border-line bg-ink-900/30 p-12 text-center">
  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ink-800 border border-line flex items-center justify-center">
    <IconSearch className="w-7 h-7 text-cream-dim" />
  </div>
  <h3 className="font-display text-lg font-bold text-cream mb-1">Sonuc bulunamadi</h3>
  <p className="text-sm text-cream-dim">Filtreyi degistirip tekrar dene.</p>
</div>
```

---

### 17. Tabular Numbers

Sayilar **mutlaka** `tabular-nums` ile yazilir:

```html
<span class="tabular-nums">{compactNumber(value)}</span>
<span class="font-bold text-cream tabular-nums">{level}/{rebirth}</span>
```

Liste icindeki rakamlar dikey hizalansin diye.

---

### 18. Click-Outside ve ESC Pattern

Custom dropdown / popover / modal'larda:

```tsx
useEffect(() => {
  if (!open) return
  const onDoc = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) setOpen(false)
  }
  const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
  document.addEventListener("mousedown", onDoc)
  document.addEventListener("keydown", onKey)
  return () => {
    document.removeEventListener("mousedown", onDoc)
    document.removeEventListener("keydown", onKey)
  }
}, [open])
```

Header'daki dropdownlar `.dropdown-container` class'i ve global click handler kullanir (eski yaklasim). **Yeni** custom dropdown'larda yukaridaki ref-based pattern tercih edilir.

---

## Renk Paleti (Guncellemeler)

### Top 3 Rank Renkleri (yeni)

| Sira | Renk | HEX |
|------|------|-----|
| #1 Gold | `yellow-500` / `yellow-600` | `#eab308` / `#ca8a04` |
| #2 Silver | `zinc-400` / `zinc-500` | `#a1a1aa` / `#71717a` |
| #3 Bronze | `orange-500` / `orange-600` | `#f97316` / `#ea580c` |

### Rebirth/Premium Vurgu (yeni)

| Token | HEX | Kullanim |
|-------|-----|----------|
| `violet-500` | `#8b5cf6` | Rebirth level metni gradient basi |
| `fuchsia-500` | `#d946ef` | Rebirth gradient bitisi |
| `violet-300` / `violet-400` | `#c4b5fd` / `#a78bfa` | Rebirth label, exp bar |

```html
<!-- Rebirth seviyesi -->
<span class="font-bold text-violet-300 tabular-nums">{level}<span class="text-violet-400/80">/{rebirth}</span></span>

<!-- Rebirth EXP bar -->
<div class="bg-gradient-to-r from-violet-500 to-fuchsia-500" style="width:{percent}%" />
```

---

## Z-Index (Guncel)

| Deger | Kullanim |
|-------|----------|
| `z-10` | Floating elemanlar, sticky header |
| `z-20` | Tooltip (custom) |
| `z-40` | Header (sticky high) |
| `z-50` | Header ustu |
| `z-[60]` | Custom dropdown panel (Themed Select, header dropdown) |
| `z-[100]` | Modal, mobile menu |

---

## Dosya Yapisi

```
components/
├── oracle/
│   ├── header.tsx
│   ├── hero.tsx
│   ├── featured-news.tsx
│   ├── news-grid.tsx
│   ├── server-status.tsx
│   ├── events-section.tsx
│   ├── rankings-section.tsx
│   ├── forum-topics.tsx
│   └── footer.tsx
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
app/
├── globals.css      <!-- Tum custom CSS burada -->
├── layout.tsx
└── page.tsx
```

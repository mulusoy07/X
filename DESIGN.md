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

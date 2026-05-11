# Oracle Gamer - Design System

## Genel Bakış
Oracle Gamer, Knight Online temalı bir oyun topluluğu platformudur. Tasarım dili, antik kehanetle modern oyun estetiğini harmanlayan karanlık, zengin ve epik bir görsel kimlik sunar.

---

## Renk Paleti

### Ana Renkler (Primary - Gold/Altın Tonları)
Markanın ana kimliği altın tonlarına dayanır. Epik, antik ve değerli hissi yaratır.

| Token | HEX | Kullanım |
|-------|-----|----------|
| `gold-300` | `#ffd86b` | Hover durumları, vurgular |
| `gold-400` | `#f5b836` | Başlıklar, ikonlar, aktif durumlar |
| `gold-500` | `#e89a1f` | Primary butonlar, gradientler |
| `gold-600` | `#c97e10` | Gradient bitişleri, border vurguları |

### Karanlık Tonlar (Ink - Arka Plan Tonları)
Derin, zengin kahverengi-siyah tonları. Mistik ve premium his verir.

| Token | HEX | Kullanım |
|-------|-----|----------|
| `ink-950` | `#0f0c0a` | En koyu arka plan |
| `ink-900` | `#14100d` | Ana arka plan rengi |
| `ink-850` | `#1a1410` | Hero gradientleri |
| `ink-800` | `#1f1814` | Kartlar, paneller |
| `ink-750` | `#261e18` | Hover arka planları |
| `ink-700` | `#2e251e` | Aktif durumlar, seçimler |
| `ink-600` | `#3a2f26` | Border'lar, ayırıcılar |

### Metin Renkleri
| Token | HEX | Kullanım |
|-------|-----|----------|
| `cream` | `#f4e7cf` | Ana metin rengi (light) |
| `cream-dim` | `#c9b89a` | İkincil metin, açıklamalar |
| `muted` | `#8a7c69` | Meta bilgiler, tarihler |
| `line` | `#2b2218` | Border'lar, çizgiler |

### Durum Renkleri (Status Colors)
| Durum | Ana Renk | Kullanım |
|-------|----------|----------|
| Online/Başarı | `emerald-400` (#4ade80) | Aktif durumlar, başarılı işlemler |
| Bakım/Uyarı | `amber-400` (#fbbf24) | Bakım modu, uyarılar |
| Offline/Hata | `rose-400` (#fb7185) | Kapalı durumlar, hatalar |

### Event/Kategori Renkleri
| Kategori | Renk | Kullanım |
|----------|------|----------|
| PVP | `rose-400` | PvP eventleri, savaş bildirimleri |
| Upgrade | `emerald-400` | Başarılı yükseltmeler |
| Duyuru | `sky-400` | Sistem duyuruları |
| PVE | `violet-400` | PvE içerikleri, drop bildirimleri |

---

## Tipografi

### Font Aileleri

#### Display Font - Cinzel
```css
--font-display: "Cinzel", "Trajan Pro", serif;
```
- **Kullanım:** Başlıklar, logo, bölüm isimleri
- **Ağırlıklar:** 500, 600, 700, 800
- **Özellikler:** 
  - Letter-spacing: 0.01em
  - Epik, Roma/antik dönem hissi
  - Büyük harflerle kullanıldığında çok etkili

#### Body Font - Nunito Sans
```css
--font-sans: "Nunito Sans", system-ui, sans-serif;
```
- **Kullanım:** Gövde metinleri, UI elementleri, açıklamalar
- **Ağırlıklar:** 400, 500, 600, 700, 800, 900
- **Özellikler:**
  - Okunabilir ve modern
  - Yumuşak köşeli harfler
  - Çeşitli ağırlıklarda kullanılabilir

### Tipografi Ölçekleri

| Element | Font | Boyut | Ağırlık | Ek Özellikler |
|---------|------|-------|---------|---------------|
| Hero Başlık | Cinzel | 7xl-8xl (72-96px) | 800 | text-shadow, gold-400 |
| Sayfa Başlığı | Cinzel | 3xl (30px) | 700 | gold-400 veya cream |
| Kart Başlığı | Cinzel | xl (20px) | 700 | cream |
| Section Label | Sans | 11px | 700 | tracking-[0.25em], uppercase, gold-400 |
| Body Text | Sans | sm-base (14-16px) | 400-500 | cream-dim, leading-relaxed |
| Meta Text | Sans | xs-[11px] | 400-600 | muted |

---

## Bileşenler (Components)

### Butonlar

#### Gold Button (Primary)
```css
.gold-btn {
  background: linear-gradient(180deg, #fbc24a 0%, #e89a1f 100%);
  color: #1a1410;
  box-shadow: 0 1px 0 rgba(255,255,255,0.35) inset, 
              0 8px 24px -8px rgba(245,184,54,0.55);
}
.gold-btn:hover { filter: brightness(1.05); }
```
- Gradient arka plan (gold-300 → gold-500)
- İç gölge ile 3D etki
- Koyu metin (#1a1410)

#### Outline Button (Secondary)
```css
.outline-btn {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--color-ink-600);
}
.outline-btn:hover {
  border-color: var(--color-gold-500);
  color: var(--color-gold-300);
}
```

### Kartlar
```css
.card {
  background: linear-gradient(180deg, #1f1814 0%, #1a1410 100%);
  border: 1px solid var(--color-line);
  border-radius: 12px;
}
```
- Yukarıdan aşağı gradient
- İnce border
- 12px border-radius

### Dock/Panel Stili
```css
.dock {
  background: linear-gradient(180deg, #1f1814 0%, #14100d 100%);
  border: 1px solid var(--color-line);
  border-radius: 14px;
  box-shadow: 0 20px 40px -16px rgba(0,0,0,0.7), 
              0 0 0 1px rgba(245,184,54,0.06) inset;
}
```

### Tab Pills
```css
.tab-pill { 
  background: var(--color-ink-800); 
  border: 1px solid var(--color-line); 
}
.tab-pill.active { 
  background: linear-gradient(180deg, #fbc24a, #e89a1f); 
  color: #1a1410; 
  border-color: transparent; 
}
```

### Status Badge'leri
```css
.status-on  { 
  background: rgba(34,197,94,0.10); 
  border: 1px solid rgba(34,197,94,0.35); 
  color: #4ade80; 
}
.status-maint { 
  background: rgba(245,184,54,0.10); 
  border: 1px solid rgba(245,184,54,0.4); 
  color: #fbbf24; 
}
.status-off { 
  background: rgba(244,63,94,0.10); 
  border: 1px solid rgba(244,63,94,0.35); 
  color: #fb7185; 
}
```

---

## Efektler ve Animasyonlar

### Hero Arka Plan Gradienti
```css
.bg-hero {
  background:
    radial-gradient(70% 60% at 50% 35%, rgba(245,184,54,0.18), transparent 70%),
    radial-gradient(40% 40% at 20% 80%, rgba(70,30,90,0.55), transparent 70%),
    radial-gradient(50% 50% at 85% 70%, rgba(20,90,140,0.45), transparent 70%),
    linear-gradient(180deg, #1a120d 0%, #14100d 70%, #0f0c0a 100%);
}
```
- Altın merkez parıltısı
- Mor ve mavi atmosferik ışıklar
- Derin karanlık taban

### Ticker Animasyonu
```css
.ticker-track { 
  animation: ticker 60s linear infinite; 
}
@keyframes ticker { 
  from { transform: translateX(0); } 
  to { transform: translateX(-50%); } 
}
```

### Pulse Animasyonu (Online Indicator)
```css
.dot-pulse { 
  box-shadow: 0 0 0 0 rgba(74,222,128,0.7); 
  animation: pulse 1.8s infinite; 
}
@keyframes pulse { 
  70% { box-shadow: 0 0 0 8px rgba(74,222,128,0); } 
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); } 
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

---

## Scrollbar Stilleri

### Genel Scrollbar
```css
* {
  scrollbar-color: #c97e10 #14100d;
  scrollbar-width: thin;
}
*::-webkit-scrollbar { width: 10px; height: 10px; }
*::-webkit-scrollbar-track { background: #14100d; }
*::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #f5b836 0%, #c97e10 100%);
  border: 2px solid #14100d;
  border-radius: 999px;
}
```

### İnce Scrollbar (Paneller)
```css
.scrollbar-slim::-webkit-scrollbar { width: 6px; }
.scrollbar-slim::-webkit-scrollbar-thumb { 
  background: linear-gradient(180deg, #f5b836, #c97e10); 
  border: none; 
}
```

---

## Layout Kuralları

### Max Widths
- **Ana Container:** max-w-[1500px]
- **İçerik Alanı:** max-w-[1280px]
- **Mega Menu:** 720px

### Grid Sistemi
- **Ana Sayfa:** 12 kolonlu grid
- **Merkez İçerik:** col-span-8
- **Sidebar:** col-span-4
- **Gap:** gap-6 (24px)

### Spacing
- **Padding (Container):** px-6
- **Padding (Kartlar):** p-4 veya p-5
- **Gap (Elementler):** gap-3 veya gap-4

---

## İkonografi

### İkon Seti
- **Ana Set:** Tabler Icons (webfont)
- **Boyutlar:** 
  - `ti-xs`: 12px
  - `ti-sm`: 14px
  - `ti-md`: 18px (default)
  - `ti-lg`: 22px

### İkon Container'ları
```css
/* Icon Badge */
.w-9.h-9.rounded-md.bg-ink-800.border.border-line.flex.items-center.justify-center.text-gold-400

/* Avatar Icon */
.w-10.h-10.rounded-full.bg-gradient-to-br.from-{color}-500.to-{color}-700.flex.items-center.justify-center
```

---

## Z-Index Hiyerarşisi
| Katman | Z-Index | Kullanım |
|--------|---------|----------|
| Modal Backdrop | 100 | Modal arka planı |
| Tooltips | 70 | Tooltip içerikleri |
| Mega Menu | 60 | Dropdown paneller |
| Header | 40 | Sabit header |
| Floating Panels | 30 | Sol/sağ dock'lar |

---

## Erişilebilirlik

- **Focus States:** border-color: gold-500, box-shadow: 0 0 0 3px rgba(245,184,54,0.15)
- **Contrast:** cream (#f4e7cf) on ink-900 (#14100d) = 12.5:1 (AAA)
- **Interactive Elements:** min-height: 40px (touch target)
- **Animasyonlar:** prefers-reduced-motion desteği eklenebilir

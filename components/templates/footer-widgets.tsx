"use client"

import Link from "next/link"
import Image from "next/image"
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandTwitch,
  IconBrandWhatsapp,
  IconBrandDiscord,
  IconChevronRight,
  IconLayoutGrid,
} from "@tabler/icons-react"

/* ============================================================
   DATA (shared)
   ============================================================ */

const footerLinks = {
  oyun: {
    title: "Oyun",
    links: ["Anasayfa", "İndirmeler", "Rehber", "Sıralamalar", "Mağaza"],
  },
  topluluk: {
    title: "Topluluk",
    links: ["Forum", "Blog", "Galeri", "Hata Takipçisi", "Etkinlikler"],
  },
  destek: {
    title: "Destek",
    links: ["Yardım Merkezi", "SSS", "İletişim", "Gizlilik", "Kullanım Şartları"],
  },
}

const socialLinks = [
  { icon: <IconBrandFacebook className="w-5 h-5" />, label: "Facebook" },
  { icon: <IconBrandInstagram className="w-5 h-5" />, label: "Instagram" },
  { icon: <IconBrandDiscord className="w-5 h-5" />, label: "Discord" },
  { icon: <IconBrandWhatsapp className="w-5 h-5" />, label: "WhatsApp" },
  { icon: <IconBrandYoutube className="w-5 h-5" />, label: "YouTube" },
  { icon: <IconBrandTwitch className="w-5 h-5" />, label: "Twitch" },
]

const LOGO_SRC = "https://media.oraclegamer.net/game/logo/f2557197-763a-4266-bfee-126e6ac06764.webp"
const BRAND_TEXT = "Bir efsanenin yeniden doğuşu. 64-bit altyapı, adil oyun, büyük savaşlar — Oracle Gamer'da kehaneti birlikte tamamlıyoruz."

/* ============================================================
   ORIGINAL - production copy
   ============================================================ */

export function FooterOriginal() {
  return (
    <footer className="relative border-t border-line bg-gradient-to-b from-ink-900 to-ink-950 rounded-xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="mx-auto max-w-[1500px] px-6 pt-14 pb-6">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block logo-hover">
              <Image src={LOGO_SRC} alt="Oracle Gamer" width={200} height={60} className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-cream-dim leading-relaxed mt-5 max-w-sm">{BRAND_TEXT}</p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social, i) => (
                <Link key={i} href="#" aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-line bg-ink-800 hover:border-gold-500 hover:text-gold-300 text-cream-dim flex items-center justify-center transition">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-gold-500" />
                <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">{section.title}</h4>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="group flex items-center gap-2 text-cream-dim hover:text-gold-300 transition-all py-1">
                      <IconChevronRight className="w-3 h-3 text-gold-500/0 group-hover:text-gold-400 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      <span className="relative">
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-5 border-t border-line flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© 2026 Oracle Gamer — Tüm hakları saklıdır.</span>
          <span className="font-display text-gold-400 tracking-wider hidden lg:block">KEHANET HENÜZ TAMAMLANMADI</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gold-300 transition">Gizlilik</Link>
            <span className="w-1 h-1 rounded-full bg-line" />
            <Link href="#" className="hover:text-gold-300 transition">Şartlar</Link>
            <span className="w-1 h-1 rounded-full bg-line" />
            <Link href="#" className="hover:text-gold-300 transition">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   V1 - DOTTED HEADINGS: Başlık altında nokta sıralaması (orijinal yapı)
   ============================================================ */

export function FooterV1Dotted() {
  return (
    <footer className="relative border-t border-line bg-gradient-to-b from-ink-900 to-ink-950 rounded-xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="mx-auto max-w-[1500px] px-6 pt-14 pb-6">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block logo-hover">
              <Image src={LOGO_SRC} alt="Oracle Gamer" width={200} height={60} className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-cream-dim leading-relaxed mt-5 max-w-sm">{BRAND_TEXT}</p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social, i) => (
                <Link key={i} href="#" aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-line bg-ink-800 hover:border-gold-500 hover:text-gold-300 text-cream-dim flex items-center justify-center transition">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <div className="mb-4">
                <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold mb-2">{section.title}</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-gold-500" />
                  <span className="w-1 h-1 rounded-full bg-gold-500/60" />
                  <span className="w-1 h-1 rounded-full bg-gold-500/30" />
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="group flex items-center gap-2 text-cream-dim hover:text-gold-300 transition-all py-1">
                      <IconChevronRight className="w-3 h-3 text-gold-500/0 group-hover:text-gold-400 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      <span className="relative">
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-5 border-t border-line flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© 2026 Oracle Gamer — Tüm hakları saklıdır.</span>
          <span className="font-display text-gold-400 tracking-wider hidden lg:block">KEHANET HENÜZ TAMAMLANMADI</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gold-300 transition">Gizlilik</Link>
            <Link href="#" className="hover:text-gold-300 transition">Şartlar</Link>
            <Link href="#" className="hover:text-gold-300 transition">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   V2 - NUMBERED HEADINGS: Başlıkların önünde 01, 02, 03 numaraları
   ============================================================ */

export function FooterV2Numbered() {
  return (
    <footer className="relative border-t border-line bg-gradient-to-b from-ink-900 to-ink-950 rounded-xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="mx-auto max-w-[1500px] px-6 pt-14 pb-6">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block logo-hover">
              <Image src={LOGO_SRC} alt="Oracle Gamer" width={200} height={60} className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-cream-dim leading-relaxed mt-5 max-w-sm">{BRAND_TEXT}</p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social, i) => (
                <Link key={i} href="#" aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-line bg-ink-800 hover:border-gold-500 hover:text-gold-300 text-cream-dim flex items-center justify-center transition">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([key, section], idx) => (
            <div key={key} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-[11px] tracking-[0.3em] text-gold-500/40 font-bold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">{section.title}</h4>
              </div>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="group flex items-center gap-2 text-cream-dim hover:text-gold-300 transition-all py-1">
                      <IconChevronRight className="w-3 h-3 text-gold-500/0 group-hover:text-gold-400 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      <span className="relative">
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-5 border-t border-line flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© 2026 Oracle Gamer — Tüm hakları saklıdır.</span>
          <span className="font-display text-gold-400 tracking-wider hidden lg:block">KEHANET HENÜZ TAMAMLANMADI</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gold-300 transition">Gizlilik</Link>
            <Link href="#" className="hover:text-gold-300 transition">Şartlar</Link>
            <Link href="#" className="hover:text-gold-300 transition">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   V3 - UNDERLINE HEADINGS: Başlıkların altında hover-genişleyen çizgi
   ============================================================ */

export function FooterV3Underline() {
  return (
    <footer className="relative border-t border-line bg-gradient-to-b from-ink-900 to-ink-950 rounded-xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="mx-auto max-w-[1500px] px-6 pt-14 pb-6">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block logo-hover">
              <Image src={LOGO_SRC} alt="Oracle Gamer" width={200} height={60} className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-cream-dim leading-relaxed mt-5 max-w-sm">{BRAND_TEXT}</p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social, i) => (
                <Link key={i} href="#" aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-line bg-ink-800 hover:border-gold-500 hover:text-gold-300 text-cream-dim flex items-center justify-center transition">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <div className="mb-4 pb-3 border-b border-gold-500/20">
                <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">{section.title}</h4>
              </div>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="group flex items-center gap-2 text-cream-dim hover:text-gold-300 transition-all py-1">
                      <IconChevronRight className="w-3 h-3 text-gold-500/0 group-hover:text-gold-400 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      <span className="relative">
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-5 border-t border-line flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© 2026 Oracle Gamer — Tüm hakları saklıdır.</span>
          <span className="font-display text-gold-400 tracking-wider hidden lg:block">KEHANET HENÜZ TAMAMLANMADI</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gold-300 transition">Gizlilik</Link>
            <Link href="#" className="hover:text-gold-300 transition">Şartlar</Link>
            <Link href="#" className="hover:text-gold-300 transition">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   V4 - VERTICAL ACCENT: Linklerin solunda ince dikey çizgi accent
   ============================================================ */

export function FooterV4VerticalAccent() {
  return (
    <footer className="relative border-t border-line bg-gradient-to-b from-ink-900 to-ink-950 rounded-xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="mx-auto max-w-[1500px] px-6 pt-14 pb-6">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block logo-hover">
              <Image src={LOGO_SRC} alt="Oracle Gamer" width={200} height={60} className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-cream-dim leading-relaxed mt-5 max-w-sm">{BRAND_TEXT}</p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social, i) => (
                <Link key={i} href="#" aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-line bg-ink-800 hover:border-gold-500 hover:text-gold-300 text-cream-dim flex items-center justify-center transition">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-gold-500" />
                <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">{section.title}</h4>
              </div>
              <ul className="border-l border-line pl-4 space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="group flex items-center gap-2 text-cream-dim hover:text-gold-300 transition-all py-1 relative -ml-4 pl-4">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-0 bg-gold-400 group-hover:h-full transition-all duration-300" />
                      <span className="relative">
                        {link}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-5 border-t border-line flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© 2026 Oracle Gamer — Tüm hakları saklıdır.</span>
          <span className="font-display text-gold-400 tracking-wider hidden lg:block">KEHANET HENÜZ TAMAMLANMADI</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gold-300 transition">Gizlilik</Link>
            <Link href="#" className="hover:text-gold-300 transition">Şartlar</Link>
            <Link href="#" className="hover:text-gold-300 transition">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   V5 - BOXED HEADINGS: Başlıklar küçük chip/etiket gibi kutulu
   ============================================================ */

export function FooterV5Boxed() {
  return (
    <footer className="relative border-t border-line bg-gradient-to-b from-ink-900 to-ink-950 rounded-xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="mx-auto max-w-[1500px] px-6 pt-14 pb-6">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block logo-hover">
              <Image src={LOGO_SRC} alt="Oracle Gamer" width={200} height={60} className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-cream-dim leading-relaxed mt-5 max-w-sm">{BRAND_TEXT}</p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social, i) => (
                <Link key={i} href="#" aria-label={social.label}
                  className="w-10 h-10 rounded-lg border border-line bg-ink-800 hover:border-gold-500 hover:text-gold-300 text-cream-dim flex items-center justify-center transition">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <div className="mb-4">
                <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-gold-400 font-bold px-2.5 py-1 rounded-md border border-gold-500/30 bg-gold-500/10">
                  {section.title}
                </span>
              </div>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="group flex items-center gap-2 text-cream-dim hover:text-gold-300 transition-all py-1">
                      <IconChevronRight className="w-3 h-3 text-gold-500/0 group-hover:text-gold-400 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      <span className="relative">
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-5 border-t border-line flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>© 2026 Oracle Gamer — Tüm hakları saklıdır.</span>
          <span className="font-display text-gold-400 tracking-wider hidden lg:block">KEHANET HENÜZ TAMAMLANMADI</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gold-300 transition">Gizlilik</Link>
            <Link href="#" className="hover:text-gold-300 transition">Şartlar</Link>
            <Link href="#" className="hover:text-gold-300 transition">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   SHOWCASE
   ============================================================ */

const Label = ({ tag, title, desc }: { tag: string; title: string; desc: string }) => (
  <div className="mb-3">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-ink-700 border border-line text-cream-dim">{tag}</span>
      <span className="font-bold text-cream text-sm">{title}</span>
    </div>
    <p className="text-[11px] text-cream-dim/70 leading-relaxed">{desc}</p>
  </div>
)

export function FooterWidgetsShowcase() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400"><IconLayoutGrid className="w-4 h-4" /></div>
          <div>
            <h2 className="text-lg font-black text-cream">Footer Widgets</h2>
            <p className="text-xs text-cream-dim">5 varyasyon + orijinal — orijinal yapıya sadık, sadece başlık/detay farkları</p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <Label tag="ORIJINAL" title="Production Copy" desc="Mevcut production versiyonu (oracle/footer.tsx). Cizgi + baslik kombosu." />
            <FooterOriginal />
          </div>
          <div>
            <Label tag="V1" title="Dotted Headings" desc="Baslik altinda 3 nokta dekoru. Aksi farkliliklar minimal." />
            <FooterV1Dotted />
          </div>
          <div>
            <Label tag="V2" title="Numbered" desc="Bashk yaninda 01/02/03 numaralandirma." />
            <FooterV2Numbered />
          </div>
          <div>
            <Label tag="V3" title="Underline" desc="Baslik altinda gold/20 ince border alt cizgisi." />
            <FooterV3Underline />
          </div>
          <div>
            <Label tag="V4" title="Vertical Accent" desc="Linklerin solunda ince dikey accent cizgi (hover yukseliyor)." />
            <FooterV4VerticalAccent />
          </div>
          <div>
            <Label tag="V5" title="Boxed Headings" desc="Bashklar kucuk gold-tinted chip/etiket icinde." />
            <FooterV5Boxed />
          </div>
        </div>
      </section>
    </div>
  )
}

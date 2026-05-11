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
  IconSend,
} from "@tabler/icons-react"

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

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-line bg-gradient-to-b from-ink-900 to-ink-950">
      {/* Gold top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="mx-auto max-w-[1500px] px-6 pt-14 pb-6">
        <div className="grid grid-cols-12 gap-10">
          {/* Brand */}
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block logo-hover">
              <Image
                src="https://media.oraclegamer.net/game/logo/f2557197-763a-4266-bfee-126e6ac06764.webp"
                alt="Oracle Gamer"
                width={200}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-cream-dim leading-relaxed mt-5 max-w-sm">
              Bir efsanenin yeniden doğuşu. 64-bit altyapı, adil oyun, büyük savaşlar — Oracle Gamer&apos;da kehaneti birlikte
              tamamlıyoruz.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg border border-line bg-ink-800 hover:border-gold-500 hover:text-gold-300 text-cream-dim flex items-center justify-center transition"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <h5 className="font-display text-gold-400 text-sm tracking-[0.2em] uppercase">{section.title}</h5>
              <ul className="mt-5 space-y-3 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="text-cream-dim hover:text-gold-300 transition">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-2">
            <h5 className="font-display text-gold-400 text-sm tracking-[0.2em] uppercase">Bülten</h5>
            <p className="text-xs text-cream-dim leading-relaxed mt-5">Etkinlik ve duyurular için e-postanı bırak.</p>
            <form className="mt-3 flex flex-col gap-2">
              <input
                type="email"
                placeholder="e-posta@oracle.gg"
                className="h-10 px-3 rounded-md bg-ink-800 border border-line text-sm text-cream placeholder:text-muted focus:outline-none focus:border-gold-500 transition"
              />
              <button
                type="button"
                className="gold-btn h-10 rounded-md text-sm font-semibold flex items-center justify-center gap-2"
              >
                <IconSend className="w-4 h-4" /> Abone Ol
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-5 border-t border-line flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-muted pb-20 lg:pb-0">
          <span>© 2026 Oracle Gamer — Tüm hakları saklıdır.</span>
          <span className="font-display text-gold-400 tracking-wider hidden lg:block">KEHANET HENÜZ TAMAMLANMADI</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-gold-300 transition">
              Gizlilik
            </Link>
            <span className="w-1 h-1 rounded-full bg-line" />
            <Link href="#" className="hover:text-gold-300 transition">
              Şartlar
            </Link>
            <span className="w-1 h-1 rounded-full bg-line" />
            <Link href="#" className="hover:text-gold-300 transition">
              KVKK
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

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
  IconChevronRight,
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
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-gold-500" />
                <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold-400 font-semibold">{section.title}</h4>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link 
                      href="#" 
                      className="group flex items-center gap-2 text-cream-dim hover:text-gold-300 transition-all py-1"
                    >
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

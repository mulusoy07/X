"use client"

import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "h-8",
    md: "h-10 lg:h-14",
    lg: "h-14",
  }

  return (
    <Link href="/" className={`flex-shrink-0 logo-hover ${className}`}>
      <Image
        src="https://media.oraclegamer.net/game/logo/logov4.webp"
        alt="Oracle Gamer"
        width={200}
        height={56}
        className={`${sizes[size]}`}
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </Link>
  )
}

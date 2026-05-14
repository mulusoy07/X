"use client"

import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const heights = {
    sm: 32,
    md: 40,
    lg: 56,
  }

  return (
    <Link href="/" className={`flex-shrink-0 logo-hover ${className}`}>
      <Image
        src="https://media.oraclegamer.net/game/logo/logov4.webp"
        alt="Oracle Gamer"
        width={200}
        height={heights[size]}
        className="h-10 lg:h-14 w-auto"
        priority
      />
    </Link>
  )
}

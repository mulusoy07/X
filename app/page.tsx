"use client"

import { useRef } from "react"
import { Header } from "@/components/oracle/header"
import { Hero } from "@/components/oracle/hero"
import { GameFeed } from "@/components/oracle/game-feed"
import { QuickActions } from "@/components/oracle/quick-actions"
import { ScrollProgress } from "@/components/oracle/scroll-progress"
import { FeaturedNews } from "@/components/oracle/featured-news"
import { NewsGrid } from "@/components/oracle/news-grid"
import { ServerStatus, type ServerStatusHandle } from "@/components/oracle/server-status"
import { ForumTopics } from "@/components/oracle/forum-topics"
import { Footer } from "@/components/oracle/footer"

export default function Home() {
  const serverStatusRef = useRef<ServerStatusHandle>(null)

  const handleServerClick = () => {
    serverStatusRef.current?.openModal()
  }

  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      <Header />
      <Hero />
      
      {/* Floating Panels */}
      <GameFeed defaultOpen={false} />
      <QuickActions onServerClick={handleServerClick} />
      <ScrollProgress />

      {/* Main Content */}
      <main className="mx-auto max-w-[1280px] px-4 lg:px-6 py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Center Content */}
        <section className="lg:col-span-8 space-y-6">
          <FeaturedNews />
          <NewsGrid />
        </section>

        {/* Right Sidebar */}
        <section className="lg:col-span-4 space-y-6">
          <ServerStatus ref={serverStatusRef} />
          <ForumTopics />
        </section>
      </main>

      <Footer />
    </div>
  )
}

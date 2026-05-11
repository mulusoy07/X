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
import { RankingsSection } from "@/components/oracle/rankings-section"
import { EventsSection } from "@/components/oracle/events-section"
import { Footer } from "@/components/oracle/footer"

export default function Home() {
  const serverStatusRef = useRef<ServerStatusHandle>(null)

  const handleServerClick = () => {
    serverStatusRef.current?.openModal()
  }

  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      <Header onOpenServerModal={handleServerClick} />
      <Hero />
      
      {/* Floating Panels */}
      <GameFeed defaultOpen={false} />
      <QuickActions onServerClick={handleServerClick} />
      <ScrollProgress />

      {/* Main Content */}
      <main className="mx-auto max-w-[1400px] px-4 lg:px-6 py-8 lg:py-12">
        {/* Top Section - Featured + Server */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Featured News - Full Width on Left */}
          <section className="lg:col-span-8">
            <FeaturedNews />
          </section>

          {/* Server Status - Right Sidebar */}
          <section className="lg:col-span-4">
            <ServerStatus ref={serverStatusRef} />
          </section>
        </div>

        {/* Middle Section - News + Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* News Grid */}
          <section className="lg:col-span-8">
            <NewsGrid />
          </section>

          {/* Events Sidebar */}
          <section className="lg:col-span-4">
            <EventsSection />
          </section>
        </div>

        {/* Bottom Section - Rankings + Forum */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Rankings */}
          <section className="lg:col-span-8">
            <RankingsSection />
          </section>

          {/* Forum Topics */}
          <section className="lg:col-span-4">
            <ForumTopics />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

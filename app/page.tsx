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
import { ServerStatusV1 } from "@/components/oracle/server-status-v1"
import { ServerStatusV2 } from "@/components/oracle/server-status-v2"
import { ServerStatusV3 } from "@/components/oracle/server-status-v3"
import { ServerStatusV4 } from "@/components/oracle/server-status-v4"
import { ServerStatusV5 } from "@/components/oracle/server-status-v5"
import { ForumTopics } from "@/components/oracle/forum-topics"
import { PlayersClansSection } from "@/components/oracle/players-clans-section"
import { StaffKingsSection } from "@/components/oracle/staff-kings-section"
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

      {/* Main Content - Masonry Layout */}
      <main className="mx-auto max-w-[1400px] px-4 lg:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Featured News */}
            <section>
              <FeaturedNews />
            </section>

            {/* News Grid */}
            <section>
              <NewsGrid />
            </section>

            {/* En Iyiler & Yonetim - Side by Side */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RankingsSection />
              <StaffKingsSection />
            </section>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Server Status - Original */}
            <section>
              <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-2 px-1">Mevcut Tasarim</div>
              <ServerStatus ref={serverStatusRef} />
            </section>

            {/* Variant 1: Compact Horizontal Bar */}
            <section>
              <div className="text-xs font-bold text-gold-400/70 uppercase tracking-wider mb-2 px-1">Varyant 1: Compact Bar</div>
              <ServerStatusV1 />
            </section>

            {/* Variant 2: 4 Card Grid */}
            <section>
              <div className="text-xs font-bold text-gold-400/70 uppercase tracking-wider mb-2 px-1">Varyant 2: Card Grid</div>
              <ServerStatusV2 />
            </section>

            {/* Variant 3: Left-Right Split */}
            <section>
              <div className="text-xs font-bold text-gold-400/70 uppercase tracking-wider mb-2 px-1">Varyant 3: Split Panel</div>
              <ServerStatusV3 />
            </section>

            {/* Variant 4: Big Stats */}
            <section>
              <div className="text-xs font-bold text-gold-400/70 uppercase tracking-wider mb-2 px-1">Varyant 4: Big Stats</div>
              <ServerStatusV4 />
            </section>

            {/* Variant 5: Stacked Rows */}
            <section>
              <div className="text-xs font-bold text-gold-400/70 uppercase tracking-wider mb-2 px-1">Varyant 5: Row List</div>
              <ServerStatusV5 />
            </section>

            {/* Events */}
            <section>
              <EventsSection />
            </section>

            {/* Forum Topics */}
            <section>
              <ForumTopics />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

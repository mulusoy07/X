export function MaintenancePage() {
  return (
    <div className="flex flex-col min-h-screen container bg-ko-wrapper border-l border-r border-ko-border-primary overflow-x-hidden">
      {/* HEADER SKELETON */}
      <header className="sticky top-0 transition-all duration-300 bg-ko-nav">
        {/* Progress Bar Skeleton */}
        <div className="h-[3px] w-full bg-gradient-to-r from-ko-brand-primary/20 via-ko-brand-primary/40 to-ko-brand-primary/20" />

        {/* Backdrop Blur Layer */}
        <div className="absolute inset-0 -z-10 backdrop-blur-lg" aria-hidden="true" />

        {/* Bottom Border Line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

        {/* Container */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Logo Skeleton */}
            <div className="flex-shrink-0 w-32 h-8 sm:w-40 sm:h-10 bg-ko-brand-primary/20 rounded-lg animate-pulse" />

            {/* Desktop Navigation Skeleton */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-16 bg-ko-text-primary/20 rounded animate-pulse" />
              ))}
            </div>

            {/* Right Actions Skeleton */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Search Skeleton */}
              <div className="hidden sm:block w-10 h-10 bg-ko-card border border-ko-border-primary rounded-lg animate-pulse" />

              {/* User Actions Skeleton */}
              <div className="w-10 h-10 bg-ko-card border border-ko-border-primary rounded-lg animate-pulse" />

              {/* Mobile Menu Skeleton */}
              <div className="md:hidden w-10 h-10 bg-ko-card border border-ko-border-primary rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Slider Skeleton */}
        <header className="w-full overflow-hidden relative">
          <div className="relative w-full h-screen max-h-[800px] overflow-hidden bg-ko-text-dark md:max-h-[500px] md:h-[60vh] md:min-h-[400px] sm:max-h-[400px] sm:h-[50vh] sm:min-h-[300px]">
            {/* Skeleton Slider Background */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-ko-card via-ko-main to-ko-card animate-pulse" />

            {/* Skeleton Content */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center z-30">
              <div className="w-full max-w-[1440px] mx-auto px-4">
                <div className="relative text-center text-white space-y-6">
                  {/* Badge Skeleton */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-ko-brand-primary/20 rounded-full">
                    <div className="w-4 h-4 bg-ko-brand-primary/30 rounded" />
                    <div className="w-24 h-4 bg-ko-brand-primary/30 rounded" />
                  </div>

                  {/* Title Skeleton */}
                  <div className="space-y-4">
                    <div className="h-16 w-96 mx-auto bg-ko-brand-primary/20 rounded-lg" />
                    <div className="flex justify-center">
                      <div className="h-1 w-24 bg-ko-brand-primary/20 rounded-full" />
                    </div>
                  </div>

                  {/* Description Skeleton */}
                  <div className="hidden lg:block max-w-3xl mx-auto space-y-2">
                    <div className="h-4 bg-ko-brand-primary/10 rounded" />
                    <div className="h-4 bg-ko-brand-primary/10 rounded w-3/4 mx-auto" />
                  </div>

                  {/* Button Skeleton */}
                  <div className="flex justify-center">
                    <div className="h-12 w-48 bg-ko-brand-primary/20 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Notices Skeleton */}
        <div className="relative w-full py-3 overflow-hidden bg-ko-card-bg border-b border-ko-border-primary">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
          <div className="w-full max-w-[1440px] mx-auto px-4">
            <div className="h-6 bg-ko-text-muted/10 rounded animate-pulse" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
        </div>

        {/* Main Content Skeleton */}
        <section className="py-8">
          <div className="w-full max-w-[1440px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-6">

                {/* Bio Skeleton */}
                <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
                  <div className="relative">
                    <div className="absolute inset-0 bg-ko-card-bg/50 animate-pulse" />
                    <div className="relative p-8 flex items-center gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="h-4 w-20 bg-ko-text-muted/20 rounded" />
                        <div className="h-8 w-48 bg-ko-brand-primary/20 rounded" />
                        <div className="space-y-2">
                          <div className="h-3 bg-ko-text-muted/10 rounded" />
                          <div className="h-3 bg-ko-text-muted/10 rounded w-3/4" />
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-24 bg-ko-brand-primary/10 rounded-lg" />
                          <div className="h-8 w-32 bg-ko-widget-bg/50 rounded-lg border border-ko-border-primary/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog Posts Skeleton */}
                <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
                  <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-ko-brand-primary/20 animate-pulse" />
                        <div className="h-5 w-32 bg-ko-text-primary/20 rounded" />
                      </div>
                      <div className="h-4 w-20 bg-ko-brand-primary/20 rounded" />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-12 gap-4">
                      {/* Featured Post Skeleton */}
                      <div className="col-span-12 md:col-span-6 rounded-xl overflow-hidden bg-ko-widget-bg/50 border border-ko-border-primary">
                        <div className="relative h-90 bg-ko-card-bg/50 animate-pulse">
                          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-ko-text-muted/20">
                            <div className="w-12 h-3 bg-ko-text-muted/30 rounded" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                            <div className="h-6 bg-ko-text-primary/20 rounded w-3/4" />
                            <div className="space-y-2">
                              <div className="h-4 bg-ko-text-primary/10 rounded" />
                              <div className="h-4 bg-ko-text-primary/10 rounded w-5/6" />
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="h-3 w-16 bg-ko-text-muted/20 rounded" />
                              <div className="h-3 w-20 bg-ko-text-muted/20 rounded" />
                              <div className="h-3 w-12 bg-ko-text-muted/20 rounded" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Secondary Posts Skeleton */}
                      <div className="col-span-12 md:col-span-6 grid grid-rows-3 gap-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="rounded-xl overflow-hidden bg-ko-widget-bg/50 border border-ko-border-primary flex">
                            <div className="w-30 bg-ko-card-bg/50 animate-pulse" />
                            <div className="flex-1 p-4 space-y-2">
                              <div className="h-4 bg-ko-text-primary/20 rounded w-3/4" />
                              <div className="h-3 w-24 bg-ko-brand-primary/10 rounded" />
                              <div className="flex items-center justify-between pt-2">
                                <div className="h-3 w-16 bg-ko-text-muted/20 rounded" />
                                <div className="h-3 w-12 bg-ko-text-muted/20 rounded" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Users & Clans + Staff & Kings Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Users & Clans Skeleton */}
                  <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
                    <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-ko-brand-primary/20 animate-pulse" />
                        <div className="space-y-1">
                          <div className="h-5 w-32 bg-ko-text-primary/20 rounded" />
                          <div className="h-3 w-24 bg-ko-text-muted/20 rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Tab Switcher Skeleton */}
                      <div className="relative bg-ko-widget-bg/50 rounded-xl p-1 border border-ko-border-primary">
                        <div className="flex relative">
                          <div className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-ko-brand-primary/30" />
                          <div className="relative z-10 flex-1 py-2 h-full flex items-center justify-center gap-2">
                            <div className="w-4 h-4 bg-ko-text-muted/30 rounded" />
                            <div className="w-16 h-4 bg-ko-text-muted/30 rounded" />
                          </div>
                          <div className="relative z-10 flex-1 py-2 h-full flex items-center justify-center gap-2">
                            <div className="w-4 h-4 bg-ko-text-muted/30 rounded" />
                            <div className="w-12 h-4 bg-ko-text-muted/30 rounded" />
                          </div>
                        </div>
                      </div>

                      {/* List Items Skeleton */}
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="relative overflow-hidden rounded-xl bg-ko-widget-bg/30 border border-ko-border-primary/50">
                            <div className="relative flex items-stretch">
                              <div className="flex items-center justify-center px-3 py-3 bg-ko-widget-bg/20 border-r border-ko-border-primary/50">
                                <div className="w-8 h-8 bg-ko-widget-bg rounded-lg animate-pulse" />
                              </div>
                              <div className="flex-1 flex items-center px-3 gap-3">
                                <div className="flex gap-1">
                                  <div className="w-8 h-8 bg-ko-widget-bg/50 rounded animate-pulse" />
                                  <div className="w-8 h-8 bg-ko-widget-bg/50 rounded animate-pulse" />
                                  <div className="w-8 h-8 bg-ko-widget-bg/50 rounded animate-pulse" />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="h-4 w-24 bg-ko-text-primary/20 rounded" />
                                  <div className="h-3 w-32 bg-ko-text-muted/20 rounded" />
                                </div>
                                <div className="text-center min-w-[4rem] space-y-1">
                                  <div className="h-2 w-16 mx-auto bg-ko-text-muted/20 rounded" />
                                  <div className="h-4 w-12 mx-auto bg-ko-brand-primary/20 rounded" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Staff & Kings Skeleton */}
                  <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
                    <div className="relative p-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-transparent border-b border-ko-border-primary">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 animate-pulse border border-purple-500/30" />
                        <div className="space-y-1">
                          <div className="h-5 w-32 bg-purple-400/20 rounded" />
                          <div className="h-3 w-24 bg-ko-text-muted/20 rounded" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Tab Switcher Skeleton */}
                      <div className="relative bg-ko-widget-bg/50 rounded-xl p-1 border border-ko-border-primary">
                        <div className="flex relative">
                          <div className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-purple-600/30" />
                          <div className="relative z-10 flex-1 py-2 h-full flex items-center justify-center gap-2">
                            <div className="w-4 h-4 bg-ko-text-muted/30 rounded" />
                            <div className="w-16 h-4 bg-ko-text-muted/30 rounded" />
                          </div>
                          <div className="relative z-10 flex-1 py-2 h-full flex items-center justify-center gap-2">
                            <div className="w-4 h-4 bg-ko-text-muted/30 rounded" />
                            <div className="w-12 h-4 bg-ko-text-muted/30 rounded" />
                          </div>
                        </div>
                      </div>

                      {/* List Items Skeleton */}
                      <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="relative overflow-hidden rounded-xl bg-ko-widget-bg/30 border border-ko-border-primary/50">
                            <div className="absolute top-1/2 -translate-y-1/2 right-1 w-3 h-3 rounded-full bg-emerald-500/30 animate-pulse" />
                            <div className="relative flex items-stretch">
                              <div className="flex items-center justify-center px-3 py-3 bg-ko-widget-bg/20 border-r border-ko-border-primary/50">
                                <div className="w-8 h-8 bg-ko-widget-bg rounded-lg animate-pulse" />
                              </div>
                              <div className="flex-1 flex items-center px-3 gap-3 pr-6">
                                <div className="flex gap-1">
                                  <div className="w-8 h-8 bg-ko-widget-bg/50 rounded animate-pulse" />
                                  <div className="w-8 h-8 bg-ko-widget-bg/50 rounded animate-pulse" />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="h-4 w-28 bg-ko-text-primary/20 rounded" />
                                  <div className="h-3 w-20 bg-ko-text-muted/20 rounded" />
                                </div>
                                <div className="text-center min-w-[3rem] space-y-1">
                                  <div className="h-2 w-12 mx-auto bg-ko-text-muted/20 rounded" />
                                  <div className="h-4 w-8 mx-auto bg-purple-400/20 rounded" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-1 space-y-6">

                {/* Server Status Skeleton */}
                <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
                  <div className="p-4 space-y-3">
                    <div className="bg-ko-widget-bg/50 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-ko-border-primary">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-ko-card flex items-center justify-center">
                          <div className="w-6 h-6 bg-ko-brand-primary/30 rounded animate-pulse" />
                        </div>
                        <div className="flex-1 h-10 bg-ko-card border border-ko-border-primary rounded-lg animate-pulse" />
                      </div>

                      <div className="flex gap-2 pt-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="flex-1 px-3 py-2 rounded-lg border bg-ko-widget-bg/30 border-ko-border-primary">
                            <div className="w-4 h-4 bg-ko-text-muted/30 rounded mb-1" />
                            <div className="h-3 bg-ko-text-muted/30 rounded" />
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                          <div className="h-3 w-20 bg-ko-text-muted/30 rounded" />
                          <div className="h-3 w-8 bg-ko-brand-primary/30 rounded" />
                        </div>
                        <div className="h-2 bg-ko-card rounded-full overflow-hidden border border-ko-border-primary">
                          <div className="h-full w-1/2 bg-ko-text-muted/30 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </div>

                    <div className="h-12 bg-gradient-to-r from-ko-brand-primary/20 to-ko-brand-secondary/20 rounded-lg animate-pulse" />
                  </div>
                </div>

                {/* Game Events Skeleton */}
                <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
                  <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-ko-brand-primary/20 animate-pulse" />
                        <div className="h-5 w-28 bg-ko-text-primary/20 rounded" />
                      </div>
                      <div className="h-4 w-20 bg-ko-brand-primary/20 rounded" />
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="relative rounded-xl overflow-hidden bg-ko-widget-bg/50 border border-ko-border-primary">
                      <div className="relative h-48 bg-ko-card-bg/50 animate-pulse">
                        <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-ko-card/90 backdrop-blur-md border border-ko-border-primary rounded-full px-3 py-1.5">
                          <div className="w-3.5 h-3.5 bg-ko-brand-primary/30 rounded" />
                          <div className="w-16 h-4 bg-ko-brand-primary/30 rounded" />
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-ko-text-muted/20">
                          <div className="w-12 h-3 bg-ko-text-muted/30 rounded" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                          <div className="h-5 w-48 bg-ko-text-primary/20 rounded" />
                          <div className="space-y-1">
                            <div className="h-3 w-64 bg-ko-text-primary/10 rounded" />
                            <div className="h-3 w-48 bg-ko-text-primary/10 rounded" />
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <div className="h-3 w-16 bg-white/20 rounded" />
                            <div className="h-3 w-3 bg-white/20 rounded" />
                            <div className="h-3 w-20 bg-white/20 rounded" />
                            <div className="h-3 w-3 bg-white/20 rounded" />
                            <div className="h-3 w-16 bg-white/20 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forum Posts Skeleton */}
                <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary">
                  <div className="relative p-4 bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent border-b border-ko-border-primary">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-ko-brand-primary/20 animate-pulse" />
                        <div className="h-5 w-28 bg-ko-text-primary/20 rounded" />
                      </div>
                      <div className="h-4 w-20 bg-ko-brand-primary/20 rounded" />
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-ko-widget-bg/50 border border-ko-border-primary">
                          <div className="w-10 h-10 rounded-lg bg-ko-text-muted/20 animate-pulse" />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="h-4 w-48 bg-ko-text-primary/20 rounded" />
                              <div className="h-5 w-16 bg-ko-text-muted/20 rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-20 bg-ko-brand-primary/20 rounded" />
                              <div className="h-3 w-3 bg-ko-text-muted/20 rounded" />
                              <div className="h-3 w-16 bg-ko-text-muted/20 rounded" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SKELETON */}
      <footer className="mt-auto bg-ko-nav backdrop-blur-lg border-t border-ko-border-primary relative overflow-hidden">
        {/* Top Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" />

        <div className="relative w-full max-w-[1440px] mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Logo & Copyright Skeleton */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-32 h-8 sm:w-40 sm:h-10 bg-ko-brand-primary/20 rounded-lg animate-pulse" />

              <div className="hidden sm:block w-px h-12 bg-ko-border-primary" />

              <div className="space-y-2">
                <div className="h-3 w-48 bg-ko-text-muted/20 rounded" />
                <div className="h-3 w-32 bg-ko-text-muted/20 rounded" />
              </div>
            </div>

            {/* Social Icons Skeleton */}
            <div className="flex items-center gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ko-card border border-ko-border-primary animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
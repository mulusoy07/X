import { useEffect, useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'

export default function Maintenance({ maintenanceData }) {
  const { t } = useTranslation()
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    const endDateStr = maintenanceData?.endDate
    if (!endDateStr) return

    const interval = setInterval(() => {
      const endDate = new Date(endDateStr)
      const now = new Date()
      const diff = endDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining(t('plugins.forum.page.maintenance.completed'))
        clearInterval(interval)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(`${hours}s ${minutes}d ${seconds}sn`)
    }, 1000)

    return () => clearInterval(interval)
  }, [maintenanceData])

  const handleRefresh = () => {
    router.reload()
  }

  const handleGoHome = () => {
    router.visit('/')
  }

  if (!maintenanceData) {
    return null
  }

  return (
    <>
      <Head>
        <title>{t('plugins.forum.page.maintenance.title')}</title>
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Main Card */}
            <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-ko-border-primary overflow-hidden">
              {/* Header with gradient */}
              <div className="relative p-6 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border-b border-ko-border-primary">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />

                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center flex-shrink-0 border-2 border-orange-500/30">
                    <Icon name="ti ti-tool" size={32} className="text-orange-500" />
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <h1 className="text-2xl font-black text-ko-text-primary flex items-center gap-2 mb-1">
                      {t('plugins.forum.page.maintenance.title')}
                    </h1>
                    <p className="text-sm text-ko-text-muted">
                      {t('plugins.forum.page.maintenance.subtitle')}
                    </p>
                  </div>

                  {/* Animated icon */}
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping" />
                    <div className="relative w-8 h-8 rounded-full bg-orange-500/30 flex items-center justify-center">
                      <Icon name="ti ti-alert-triangle" size={20} className="text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Message */}
                <div className="p-4 bg-ko-widget-bg/30 rounded-lg border border-ko-border-primary">
                  <p className="text-ko-text-primary leading-relaxed text-center">
                    {maintenanceData.message}
                  </p>
                </div>

                {/* Countdown Timer */}
                {maintenanceData.endDate && timeRemaining && (
                  <div className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl" />

                    <div className="relative p-5 bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl border border-orange-500/20">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <Icon name="ti ti-clock" size={16} className="text-orange-500" />
                        </div>
                        <span className="text-sm font-bold text-ko-text-muted uppercase tracking-wider">
                          {t('plugins.forum.page.maintenance.estimated_time')}
                        </span>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="text-5xl font-black text-ko-text-primary font-mono tracking-tight">
                          {timeRemaining}
                        </div>
                        {maintenanceData.endDate && (
                          <p className="text-sm text-ko-text-muted">
                            {t('plugins.forum.page.maintenance.end_time')}: {maintenanceData.endDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Start Date */}
                {maintenanceData.startDate && (
                  <div className="text-center text-sm text-ko-text-muted p-3 bg-ko-widget-bg/20 rounded-lg border border-ko-border-primary">
                    <span className="font-semibold">{t('plugins.forum.page.maintenance.start_time')}:</span>{' '}
                    {maintenanceData.startDate}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-ko-border-primary">
                  <button
                    onClick={handleGoHome}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ko-widget-bg/50 hover:bg-ko-widget-bg border border-ko-border-primary hover:border-ko-brand-primary rounded-lg text-ko-text-primary font-bold transition-all group"
                  >
                    <Icon name="ti ti-arrow-left" size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {t('plugins.forum.page.maintenance.go_home')}
                  </button>

                  <button
                    onClick={handleRefresh}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary hover:from-ko-brand-primary/90 hover:to-ko-brand-secondary/90 rounded-lg text-white font-bold transition-all group"
                  >
                    <Icon name="ti ti-refresh" size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                    {t('plugins.forum.page.maintenance.try_again')}
                  </button>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="mt-6 p-4 bg-ko-card/50 backdrop-blur-sm rounded-xl border border-ko-border-primary">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="ti ti-alert-triangle" size={16} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-ko-text-muted leading-relaxed">
                    {t('plugins.forum.page.maintenance.info_text')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Maintenance.layout = (page) => <PublicLayout children={page} />

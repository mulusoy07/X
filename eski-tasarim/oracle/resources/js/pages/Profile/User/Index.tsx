import { Icon } from '@/components/shared/icon'
import {
  UserHeader,
  CharacterInfo,
  EquipmentGrid,
  InteractiveMap,
  StatsGrid,
} from './components'
import { ErrorState } from '@/components/shared/ErrorState'
import { PageHeader } from '@/components/shared/PageHeader'
import { PublicLayout } from '@/layouts/PublicLayout'
import { usePage } from '@inertiajs/react'

function UserProfilePage() {
  const { t } = useTranslation()
  const { error, message, data } = usePage().props

  // Error State
  if (error || !data) {
    return <ErrorState message={message || t('plugins.game.profile.user.not_found')} />
  }

  const { user } = data

  return (
    <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
      <div className="container mx-auto px-4 py-6">

        <PageHeader
          title={t('plugins.game.profile.user.title')}
          subtitle={t('plugins.game.profile.user.description')}
          icon={<Icon name="ti ti-user" className="w-8 h-8" />}
        />

        {/* User Header */}
        <UserHeader user={user} />

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Character Info */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <CharacterInfo user={user} />

            {/* Map - Desktop */}
            <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden shadow-lg hidden lg:block">
              <div className="px-4 py-3 bg-gradient-to-r from-ko-card to-ko-widget-bg/50 border-b border-ko-border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
                    <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider flex items-center gap-2">
                      <Icon name="ti ti-map-pin" className="w-4 h-4 text-ko-brand-primary" />
                      {t('plugins.game.profile.user.location')}
                    </h3>
                  </div>
                  <div className="bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-lg px-3 py-1">
                    <span className="text-xs font-semibold text-ko-brand-primary">
                      {user.zoneName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <InteractiveMap
                  zone={user.zone}
                  posX={user.posX}
                  posZ={user.posZ}
                  zoneName={user.zoneName}
                  mapSize={user.mapSize}
                />
              </div>
            </div>
          </div>

          {/* Right: Equipment & Statistics */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {/* Equipment Grid */}
            <EquipmentGrid user={user} />

            {/* Map - Mobile */}
            <div className="bg-ko-card border border-ko-border-primary rounded-2xl overflow-hidden shadow-lg lg:hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-ko-card to-ko-widget-bg/50 border-b border-ko-border-primary">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-ko-brand-primary rounded-full animate-pulse" />
                    <h3 className="text-sm font-bold text-ko-text-primary uppercase tracking-wider flex items-center gap-2">
                      <Icon name="ti ti-map-pin" className="w-4 h-4 text-ko-brand-primary" />
                      {t('plugins.game.profile.user.location')}
                    </h3>
                  </div>
                  <div className="bg-ko-brand-primary/10 border border-ko-brand-primary/30 rounded-lg px-3 py-1">
                    <span className="text-xs font-semibold text-ko-brand-primary">
                      {user.zoneName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="relative w-full h-[300px]">
                  <InteractiveMap
                    zone={user.zone}
                    posX={user.posX}
                    posZ={user.posZ}
                    zoneName={user.zoneName}
                    mapSize={user.mapSize}
                  />
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <StatsGrid user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}

UserProfilePage.layout = (page) => <PublicLayout children={page} />

export default UserProfilePage

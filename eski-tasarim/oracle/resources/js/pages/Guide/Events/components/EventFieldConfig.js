// Helper to safely access dynamic properties
const getNumber = (data, key) => {
  return data[key] || 0
}

// Common field formatters
const formatTime = (data, t) => {
  const days = [
    t('plugins.game.guide_pages.days.everyday'),
    t('plugins.game.guide_pages.days.monday'),
    t('plugins.game.guide_pages.days.tuesday'),
    t('plugins.game.guide_pages.days.wednesday'),
    t('plugins.game.guide_pages.days.thursday'),
    t('plugins.game.guide_pages.days.friday'),
    t('plugins.game.guide_pages.days.saturday'),
    t('plugins.game.guide_pages.days.sunday')
  ]
  return `${days[data.eventDay] || t('plugins.game.guide_pages.unknown')} ${String(data.eventHour).padStart(2, '0')}:${String(data.eventMinute).padStart(2, '0')}`
}

const formatMinutes = (value, t) => {
  return t('plugins.game.guide_pages.minutes', { count: value })
}

const formatLevelRange = (min, max) => `${min} - ${max}`

const formatRequirements = (coins, loyalty, t) => {
  const parts = []
  if (coins > 0) parts.push(`${coins.toLocaleString()} Coin`)
  if (loyalty > 0) parts.push(`${loyalty.toLocaleString()} NP`)
  return parts.length > 0 ? parts.join(' / ') : t('plugins.game.guide_pages.not_required')
}

// Common fields used by multiple events
const TIME_FIELD = {
  key: 'time',
  label: 'plugins.game.guide_pages.start_time',
  icon: 'ti ti-clock',
  color: 'ko-brand-primary',
  format: formatTime
}

const DURATION_FIELD = (durationKey) => ({
  key: 'duration',
  label: 'plugins.game.guide_pages.event_duration',
  icon: 'ti ti-hourglass',
  color: 'blue-500',
  format: (data, t) => formatMinutes(getNumber(data, durationKey), t)
})

const REGISTER_TIME_FIELD = {
  key: 'registerTime',
  label: 'plugins.game.guide_pages.register_time',
  icon: 'ti ti-users',
  color: 'green-500',
  format: (data, t) => formatMinutes(getNumber(data, 'registerTime'), t)
}

const LEVEL_RANGE_FIELD = {
  key: 'levelRange',
  label: 'plugins.game.guide_pages.level_range',
  icon: 'ti ti-bolt',
  color: 'purple-500',
  format: (data) => formatLevelRange(getNumber(data, 'minLevel'), getNumber(data, 'maxLevel'))
}

const REQUIREMENTS_FIELD = {
  key: 'requirements',
  label: 'plugins.game.guide_pages.requirements',
  icon: 'ti ti-coin',
  color: 'yellow-500',
  format: (data, t) => formatRequirements(getNumber(data, 'reqCoins'), getNumber(data, 'reqLoyalty'), t)
}

// Event-specific field configurations
export const EVENT_FIELD_CONFIG = {
  NATION_WAR: [
    TIME_FIELD,
    LEVEL_RANGE_FIELD,
    {
      key: 'battleZone',
      label: 'plugins.game.guide_pages.battle_zone',
      icon: 'ti ti-map',
      color: 'red-500',
      format: (data) => data.battleZoneName
    },
    {
      key: 'battleTime',
      label: 'plugins.game.guide_pages.battle_time',
      icon: 'ti ti-swords',
      color: 'orange-500',
      format: (data, t) => formatMinutes(getNumber(data, 'battleTime'), t)
    }
  ],

  FORGOTTEN_TEMPLE: [
    TIME_FIELD,
    LEVEL_RANGE_FIELD,
    {
      key: 'categoryId',
      label: 'plugins.game.guide_pages.category',
      icon: 'ti ti-category',
      color: 'cyan-500',
      format: (data, t) => `${t('plugins.game.guide_pages.category')} ${getNumber(data, 'categoryId')}`
    }
  ],

  BIFROST: [
    TIME_FIELD,
    DURATION_FIELD('eventTime')
  ],

  CASTLE_SIEGE_WAR: [
    TIME_FIELD,
    DURATION_FIELD('eventTime'),
    {
      key: 'minimumClanFlag',
      label: 'plugins.game.guide_pages.min_clan_flag',
      icon: 'ti ti-flag',
      color: 'red-500',
      format: (data) => `${getNumber(data, 'minimumClanFlag')}`
    },
    {
      key: 'maxTeleportClanMember',
      label: 'plugins.game.guide_pages.max_teleport',
      icon: 'ti ti-users',
      color: 'green-500',
      format: (data) => `${getNumber(data, 'maxTeleportClanMember')}`
    }
  ],

  BORDER_DEFENSE_WAR: [
    TIME_FIELD,
    LEVEL_RANGE_FIELD,
    DURATION_FIELD('eventTime'),
    REGISTER_TIME_FIELD,
    REQUIREMENTS_FIELD,
    {
      key: 'scoreSystem',
      label: 'plugins.game.guide_pages.score_system',
      icon: 'ti ti-star',
      color: 'orange-500',
      format: (data) => `Kill: ${getNumber(data, 'killScore')} / Monument: ${getNumber(data, 'monumentScore')}`
    }
  ],

  CHAOS: [
    TIME_FIELD,
    LEVEL_RANGE_FIELD,
    DURATION_FIELD('eventTime'),
    REGISTER_TIME_FIELD,
    REQUIREMENTS_FIELD
  ],

  JURAID_MOUNTAIN: [
    TIME_FIELD,
    LEVEL_RANGE_FIELD,
    DURATION_FIELD('eventTime'),
    REGISTER_TIME_FIELD,
    REQUIREMENTS_FIELD,
    {
      key: 'scores',
      label: 'plugins.game.guide_pages.score_system',
      icon: 'ti ti-star',
      color: 'orange-500',
      format: (data) => `Kill: ${getNumber(data, 'killScore')} / Finish: ${getNumber(data, 'finishScore')}`
    }
  ],

  UNDER_THE_CASTLE: [
    TIME_FIELD,
    DURATION_FIELD('eventTime')
  ],

  DEATHMATCH: [
    TIME_FIELD,
    DURATION_FIELD('eventTime'),
    REGISTER_TIME_FIELD
  ],

  KROWAZ: [
    TIME_FIELD,
    DURATION_FIELD('eventTime')
  ],

  SEMI_WAR: [
    TIME_FIELD,
    {
      key: 'battleZone',
      label: 'plugins.game.guide_pages.battle_zone',
      icon: 'ti ti-map',
      color: 'red-500',
      format: (data) => data.battleZoneName
    },
    {
      key: 'battleTime',
      label: 'plugins.game.guide_pages.battle_time',
      icon: 'ti ti-swords',
      color: 'orange-500',
      format: (data, t) => formatMinutes(getNumber(data, 'battleTime'), t)
    }
  ],

  STRONGHOLD_SIEGE_WAR: [
    TIME_FIELD,
    DURATION_FIELD('eventTime'),
    REGISTER_TIME_FIELD,
    {
      key: 'zoneId',
      label: 'plugins.game.guide_pages.battle_zone',
      icon: 'ti ti-map',
      color: 'red-500',
      format: (data) => data.zoneName
    },
    {
      key: 'maxClanCount',
      label: 'plugins.game.guide_pages.max_clan_count',
      icon: 'ti ti-users-group',
      color: 'blue-500',
      format: (data) => `${getNumber(data, 'maxClanCount')}`
    },
    {
      key: 'minimumClanFlag',
      label: 'plugins.game.guide_pages.min_clan_flag',
      icon: 'ti ti-flag',
      color: 'red-500',
      format: (data) => `${getNumber(data, 'minimumClanFlag')}`
    },
    {
      key: 'reqRegisterCoins',
      label: 'plugins.game.guide_pages.register_cost',
      icon: 'ti ti-coin',
      color: 'yellow-500',
      format: (data) => `${getNumber(data, 'reqRegisterCoins').toLocaleString()} Coin`
    }
  ],

  DYNAMIC_ZONE: [
    TIME_FIELD,
    DURATION_FIELD('eventTime')
  ],

  MAD_CLASS: [
    TIME_FIELD,
    DURATION_FIELD('eventTime')
  ]
}

// Default config for unknown events
export const DEFAULT_FIELDS = [TIME_FIELD]

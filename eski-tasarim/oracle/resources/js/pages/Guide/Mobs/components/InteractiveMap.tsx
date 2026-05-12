import { Imagex } from '@/components/shared/Imagex'

const worldToPng = (
  worldX,
  worldZ,
  mapSize,
  displayWidth,
  displayHeight
) => {
  // Calculate based on actual rendered size
  const pngX = (worldX / mapSize) * displayWidth
  const pngZ = displayHeight - ((worldZ / mapSize) * displayHeight)
  return { x: pngX, y: pngZ }
}

export function InteractiveMap({ zone, spawns, mobName }) {
  const { t } = useTranslation()
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })
  const [hoveredSpawn, setHoveredSpawn] = useState(null)

  // Update dimensions when image loads and on resize
  const updateDimensions = () => {
    const img = mapRef.current
    if (img && img.complete) {
      // Get actual rendered dimensions (clientWidth/clientHeight)
      setMapDimensions({
        width: img.clientWidth,
        height: img.clientHeight
      })
    }
  }

  useEffect(() => {
    const ro = new ResizeObserver(updateDimensions)
    if (mapRef.current) ro.observe(mapRef.current)
    return () => ro.disconnect()
  }, [])

  const handleImageLoad = () => {
    updateDimensions()
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-xl overflow-visible border border-ko-border-primary shadow-lg"
    >
      <Imagex
        ref={mapRef}
        src={`/assets/images/maps/${zone.zoneId}.webp`}
        alt={zone.zoneName}
        className="w-full h-auto rounded-xl object-center object-cover"
        onLoad={handleImageLoad}
      />

      {mapDimensions.width > 0 && spawns.map((spawn, index) => {
        // Calculate based on actual rendered dimensions
        const { x, y } = worldToPng(
          spawn.posX,
          spawn.posZ,
          zone.mapSize,
          mapDimensions.width,
          mapDimensions.height
        )

        return (
          <div key={`spawn-${zone.zoneId}-${spawn.posX}-${spawn.posZ}-${index}`}>
            {/* Ping Animation */}
            <div
              className="absolute pointer-events-none flex items-center justify-center"
              style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)', width: '24px', height: '24px' }}
            >
              <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            </div>

            {/* Spawn Marker */}
            <div
              className="absolute cursor-pointer group z-10"
              style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredSpawn(index)}
              onMouseLeave={() => setHoveredSpawn(null)}
            >
              <div className="absolute inset-0 bg-red-500/40 rounded-full blur-md scale-150 group-hover:scale-200 transition-transform duration-300" />

              <div className="relative">
                <div className="relative w-5 h-5 bg-gradient-to-br from-red-500 to-red-700 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform group-hover:scale-125 transition-transform duration-200">
                  <div className="absolute inset-0 bg-red-400/50 rounded-full animate-pulse" />
                </div>

                {/* Spawn Count Badge */}
                {spawn.numNpc > 1 && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white shadow-md animate-bounce">
                    {spawn.numNpc}
                  </div>
                )}
              </div>

              {/* Tooltip */}
              {hoveredSpawn === index && (
                <div
                  className="fixed z-50 pointer-events-none"
                  style={{
                    left: `${x + (containerRef.current?.getBoundingClientRect().left || 0)}px`,
                    top: `${y + (containerRef.current?.getBoundingClientRect().top || 0) - 70}px`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-lg px-4 py-3 shadow-2xl border border-red-500/30 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="font-bold text-sm mb-1 text-red-400 whitespace-nowrap">
                        {mobName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t('guide.mobs.spawn_point')} {spawn.numNpc > 1 && `(${spawn.numNpc}x)`}
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                      <div className="w-3 h-3 bg-black border-r border-b border-red-500/30 transform rotate-45" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

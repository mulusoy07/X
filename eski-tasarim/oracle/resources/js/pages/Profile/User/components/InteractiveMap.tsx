import { useState, useEffect, useRef } from 'react'
import { Imagex } from '@/components/shared/Imagex'
import { Icon } from '@/components/shared/icon'

const worldToPng = (
  worldX,
  worldZ,
  mapSize,
  displayWidth,
  displayHeight
) => {
  const pngX = (worldX / mapSize) * displayWidth
  const pngZ = displayHeight - ((worldZ / mapSize) * displayHeight)
  return { x: pngX, y: pngZ }
}

export function InteractiveMap({ zone, posX, posZ, zoneName, mapSize }) {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })

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
    // Initial load
    updateDimensions()

    // Track resize with ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions()
    })

    if (mapRef.current) {
      resizeObserver.observe(mapRef.current)
    }

    // Also listen to window resize (fallback)
    window.addEventListener('resize', updateDimensions)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Recalculate dimensions when zone changes
  useEffect(() => {
    // Wait with timeout for new image to render
    const timer = setTimeout(updateDimensions, 100)
    return () => clearTimeout(timer)
  }, [zone])

  const handleImageLoad = () => {
    updateDimensions()
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-2xl overflow-hidden border-2 border-ko-border-primary shadow-2xl"
    >
      <Imagex
        ref={mapRef}
        src={`/assets/images/maps/${zone}.webp`}
        alt={zoneName}
        className="w-full h-auto object-cover"
        onLoad={handleImageLoad}
      />

      {mapDimensions.width > 0 && (() => {
        // Calculate based on actual rendered dimensions
        const { x, y } = worldToPng(posX, posZ, mapSize, mapDimensions.width, mapDimensions.height)

        return (
          <div key={`player-${zone}-${posX}-${posZ}`}>
            {/* Ping Animation */}
            <div
              className="absolute pointer-events-none flex items-center justify-center"
              style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)', width: '32px', height: '32px' }}
            >
              <div className="absolute inset-0 bg-ko-brand-primary/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 bg-ko-brand-primary/40 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
            </div>

            {/* Player Marker */}
            <div
              className="absolute cursor-pointer group z-10"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="absolute inset-0 bg-ko-brand-primary/50 rounded-full blur-md scale-150 group-hover:scale-200 transition-transform duration-300" />
              <div className="relative w-6 h-6 bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary rounded-full border-2 border-white shadow-lg flex items-center justify-center transform group-hover:scale-125 transition-transform duration-200">
                <div className="absolute inset-0 bg-ko-brand-primary/60 rounded-full animate-pulse" />
                <Icon name="ti ti-map-pin" className="w-3 h-3 text-white relative z-10" />
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

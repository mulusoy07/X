import { type ComponentProps, type MouseEvent as ReactMouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Imagex } from '@/components/shared/Imagex'
import { Icon } from '@/components/shared/icon'

interface ItemIconProps extends Omit<ComponentProps<typeof Imagex>, 'src' | 'src64' | 'id'> {
  id: string | number | null
  showTooltip?: boolean
}

interface ItemData {
  ItemID: string
  ItemName: string
  IconBase64: string
  ToolTip: string
  SetInfo: number | null
}

// Global cache
const tooltipCache = new Map<string | number, ItemData>()

export function ItemIcon({
  id,
  alt,
  width = 32,
  height = 32,
  showTooltip = true,
  className,
  ...restProps
}: ItemIconProps) {
  const [tooltipData, setTooltipData] = useState<ItemData | null>(null)
  const [tooltipLoading, setTooltipLoading] = useState(false)
  const [showTooltipPortal, setShowTooltipPortal] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Fetch tooltip data on hover
  useEffect(() => {
    if (!showTooltipPortal || !id || !showTooltip) return

    const cacheKey = String(id)

    // Check cache first
    if (tooltipCache.has(cacheKey)) {
      setTooltipData(tooltipCache.get(cacheKey)!)
      setTooltipLoading(false)
      return
    }

    // Fetch from API
    let cancelled = false
    setTooltipLoading(true)

    async function fetchTooltip() {
      try {
        const response = await axios.get(route('api.item-info', { itemId: id }), {
          timeout: 5000,
        })

        if (response.data.error) {
          throw new Error(response.data.message || `Item ${id} not found`)
        }

        const itemData = response.data.data

        if (!cancelled && itemData) {
          tooltipCache.set(cacheKey, itemData)
          setTooltipData(itemData)
          setTooltipLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch tooltip:', err)
          setTooltipLoading(false)
        }
      }
    }

    fetchTooltip()

    return () => {
      cancelled = true
    }
  }, [showTooltipPortal, id, showTooltip])

  // Update tooltip position
  const updateTooltipPosition = useCallback((clientX: number, clientY: number) => {
    const offset = 15
    let x = clientX + offset
    let y = clientY + offset

    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect()
      const padding = 10

      // Keep within viewport bounds
      if (x + rect.width + padding > window.innerWidth) {
        x = clientX - rect.width - offset
      }
      if (x < padding) x = padding

      if (y + rect.height + padding > window.innerHeight) {
        y = clientY - rect.height - offset
      }
      if (y < padding) y = padding
    }

    setTooltipPosition({ x, y })
  }, [])

  const handleMouseEnter = useCallback((e: ReactMouseEvent) => {
    if (showTooltip && id) {
      setShowTooltipPortal(true)
      updateTooltipPosition(e.clientX, e.clientY)
    }
  }, [showTooltip, id, updateTooltipPosition])

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (showTooltipPortal) {
      updateTooltipPosition(e.clientX, e.clientY)
    }
  }, [showTooltipPortal, updateTooltipPosition])

  const handleMouseLeave = useCallback(() => {
    setShowTooltipPortal(false)
  }, [])

  if (!id) return null

  return (
    <>
      <div
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Imagex
          src={`/assets/images/items/${id}.webp`}
          alt={alt || `Item ${id}`}
          width={width}
          height={height}
          className={className}
          {...restProps}
        />
      </div>

      {/* Tooltip */}
      {showTooltip && showTooltipPortal && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed pointer-events-none"
          style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }}
        >
          <div className="item-hover-tooltip" ref={tooltipRef}>
            <div className="item-hover-content">
              {tooltipLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Icon name="ti ti-loader-2" className="w-5 h-5 text-ko-brand-primary animate-spin" />
                </div>
              ) : tooltipData?.ToolTip ? (
                <div dangerouslySetInnerHTML={{ __html: tooltipData.ToolTip }} />
              ) : (
                <div className="p-2 text-sm text-gray-400">No tooltip available</div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

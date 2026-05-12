import { memo } from 'react'

const FRAME_COUNT = 20
const FRAME_DURATION = 50
const CDN_URL = (window as Window & { appConfig?: { cdnUrl?: string } }).appConfig?.cdnUrl || ''

let globalFrame = 0
let lastFrameTime = 0
let animationId: number | null = null
const subscribers = new Set<() => void>()

const frameCache = new Map<number, HTMLImageElement[]>()

function startGlobalAnimation() {
  if (animationId !== null) return
  const animate = (timestamp: number) => {
    if (timestamp - lastFrameTime >= FRAME_DURATION) {
      globalFrame = (globalFrame + 1) % FRAME_COUNT
      lastFrameTime = timestamp
      subscribers.forEach((cb) => cb())
    }
    animationId = requestAnimationFrame(animate)
  }
  animationId = requestAnimationFrame(animate)
}

function stopGlobalAnimation() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

function subscribe(callback: () => void): () => void {
  subscribers.add(callback)
  if (subscribers.size === 1) startGlobalAnimation()
  return () => {
    subscribers.delete(callback)
    if (subscribers.size === 0) stopGlobalAnimation()
  }
}

function getFullUrl(path: string): string {
  if (CDN_URL) {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${CDN_URL}/${cleanPath}`
  }
  return path
}

function getFrames(rank: number): HTMLImageElement[] {
  if (frameCache.has(rank)) return frameCache.get(rank)!
  const images: HTMLImageElement[] = []
  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new window.Image()
    img.src = getFullUrl(`/assets/images/clan/grade/${rank}_${i}.webp`)
    images.push(img)
  }
  frameCache.set(rank, images)
  return images
}

interface ClanGradeAnimationProps {
  rank: number
  size?: number
  scale?: number
}

export const ClanGradeAnimation = memo(function ClanGradeAnimation({
  rank,
  size = 48,
  scale = 1,
}: ClanGradeAnimationProps) {
  const [frame, setFrame] = useState(globalFrame)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])

  const validRank = rank >= 0 && rank <= 5 ? Math.floor(rank) : null

  const updateFrame = useCallback(() => {
    setFrame(globalFrame)
  }, [])

  useEffect(() => {
    if (validRank === null) return
    framesRef.current = getFrames(validRank)
  }, [validRank])

  useEffect(() => {
    if (validRank === null) return
    return subscribe(updateFrame)
  }, [validRank, updateFrame])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !framesRef.current.length) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = framesRef.current[frame]
    const drawSize = size * scale
    const draw = () => {
      if (!img.complete || img.naturalWidth === 0) return
      ctx.clearRect(0, 0, drawSize, drawSize)
      ctx.drawImage(img, 0, 0, drawSize, drawSize)
    }
    if (img.complete) {
      draw()
    } else {
      img.onload = draw
      img.onerror = () => {}
    }
  }, [frame, size, scale])

  if (validRank === null) return null

  const canvasSize = size * scale

  return (
    <div
      className="relative inline-flex items-center justify-center overflow-visible"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ width: size, height: size }}
      />
    </div>
  )
})

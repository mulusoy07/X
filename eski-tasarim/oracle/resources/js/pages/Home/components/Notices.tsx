import Marquee from 'react-fast-marquee'
import { MarqueeSkeleton } from './MarqueeSkeleton'
import type { NoticeItem } from './types'

interface NoticesProps {
  notices: NoticeItem[]
}

export function Notices({ notices }: NoticesProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!notices || notices.length === 0) return null

  const MarqueeComponent = (Marquee as any).default || Marquee

  return (
    <div className="relative w-full py-3 overflow-hidden bg-ko-card-bg border-b border-ko-border-primary">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

      {isReady ? (
        <MarqueeComponent speed={50} pauseOnHover={true} gradient={true} gradientColor={'#262122'} className="flex items-center">
          {notices.map((notice) => (
            <span key={notice.id} className="text-sm text-ko-text-muted leading-relaxed inline-flex items-center">
              {notice.text}
              <span className="inline-flex items-center justify-center mx-4 text-xs font-semibold text-ko-brand-primary/80">#</span>
            </span>
          ))}
        </MarqueeComponent>
      ) : (
        <MarqueeSkeleton count={notices.length} />
      )}

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
    </div>
  )
}

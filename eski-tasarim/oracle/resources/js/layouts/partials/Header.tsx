import { useLayout } from '@/hooks'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'
import { HeaderActions } from './HeaderActions'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const layout = useLayout()
  const style = layout.config.style || 'boxed'

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg',
        isScrolled ? 'shadow-xl bg-ko-nav-scrolled' : 'bg-ko-nav'
      )}
    >
      <div className="h-[3px] w-full bg-gradient-to-r from-ko-brand-primary/20 via-ko-brand-primary/40 to-ko-brand-primary/20" />

      <div className="absolute inset-0 backdrop-blur-lg" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

      <div className={cn(
        'relative w-full mx-auto px-4',
        style === 'boxed' && 'max-w-[1440px]'
      )}>
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <DesktopMenu />

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <HeaderActions />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

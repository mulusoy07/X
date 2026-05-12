import { Icon } from '@/components/shared/icon'
import { generateParticles } from './helpers'

export function BackgroundLayer({ isFormFocused }) {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setMounted(true)
    setParticles(generateParticles(15))
  }, [])

  return (
    <>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`
        }} 
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgb(196, 140, 71) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            opacity: isFormFocused ? 0.01 : 0.02,
            transition: 'opacity 1s'
          }}
        />

        <div className="absolute top-20 left-[10%] w-24 h-24 opacity-10 animate-float">
          <Icon name="ti ti-shield" className="w-full h-full text-ko-brand-primary" stroke={1} />
        </div>
        <div className="absolute top-1/3 right-[15%] w-20 h-20 opacity-8 animate-float-delayed-2">
          <Icon name="ti ti-lock" className="w-full h-full text-ko-brand-secondary" stroke={1} />
        </div>
        <div className="absolute bottom-1/4 left-[15%] w-28 h-28 opacity-10 animate-float-delayed-4">
          <Icon name="ti ti-user" className="w-full h-full text-ko-brand-primary" stroke={1} />
        </div>
        <div className="absolute top-1/2 right-[8%] w-16 h-16 opacity-8 animate-float-delayed-1">
          <Icon name="ti ti-key" className="w-full h-full text-ko-brand-secondary" stroke={1} />
        </div>
        <div className="absolute bottom-1/3 right-[25%] w-20 h-20 opacity-10 animate-float-delayed-3">
          <Icon name="ti ti-crown" className="w-full h-full text-ko-brand-primary" stroke={1} />
        </div>

        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-ko-brand-primary/5 to-transparent blur-3xl animate-pulse" />
        <div 
          className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-gradient-to-tr from-ko-brand-secondary/5 to-transparent blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }} 
        />

        {mounted && particles.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-ko-brand-primary/30 rounded-full animate-float"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDuration: `${pos.duration}s`,
              animationDelay: `${pos.delay}s`,
              opacity: isFormFocused ? 0.05 : 0.15,
              transition: 'opacity 1s'
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial-vignette" />
      </div>
    </>
  )
}

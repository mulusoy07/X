import { Icon } from '@/components/shared/icon'
import { Imagex } from '@/components/shared/Imagex'
import type { BioData } from './types'

interface BioProps {
  bio: BioData | null
}

export function Bio({ bio }: BioProps) {
  if (!bio) return null

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-ko-border-primary hover:border-ko-brand-primary/30 transition-all duration-500">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
      <div className="relative">
        <div className="absolute inset-0">
          <Imagex src={bio.image} alt="Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-ko-brand-primary/5 to-transparent blur-3xl animate-pulse" />
        </div>

        <div className="relative p-8 flex items-center gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-xs text-ko-text-muted font-semibold mb-1 uppercase tracking-wider">
                {bio.subTitle}
              </h2>
              <h1 className="text-2xl font-black bg-gradient-to-r from-ko-brand-primary via-ko-brand-secondary to-ko-brand-primary bg-clip-text text-transparent animate-gradient">
                {bio.title}
              </h1>
            </div>
            <p className="text-xs text-ko-text-muted leading-relaxed mb-6">
              {bio.content}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {bio.buttons?.map((button, index) => {
                const isPrimary = button.variant === 'primary'
                return (
                  <span key={index} className="contents">
                    <Link
                      href={button.url}
                      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold transition-all duration-300 text-xs ${isPrimary
                        ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-white hover:shadow-lg'
                        : 'bg-ko-widget-bg border border-ko-border-primary text-ko-text-primary hover:bg-ko-widget-bg/80 hover:border-ko-brand-primary/50'
                        }`}
                    >
                      {button.icon && <Icon name={button.icon} size={18} stroke={2} />}
                      {button.text}
                    </Link>
                    {index < bio.buttons.length - 1 && bio.separator && (
                      <span className="text-ko-text-muted text-xs">{bio.separator}</span>
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

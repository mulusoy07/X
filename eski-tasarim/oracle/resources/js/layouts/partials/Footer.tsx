import { useLayout } from '@/hooks'
import { Icon } from '@/components/shared/icon'
import { Logo } from './Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const layout = useLayout()

  const socialLinks = layout.social_links || []
  const siteName = layout.seo?.site_name || ''
  const copyright = layout.config.copyright || `© ${currentYear} ${siteName}. All rights reserved.`

  return (
    <footer className="mt-auto bg-ko-nav backdrop-blur-lg border-t border-ko-border-primary relative overflow-hidden pb-[var(--bottom-nav-height,0px)] xl:pb-0">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />
      <div className="absolute inset-0 opacity-5" />

      <div className="relative w-full max-w-[1440px] mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Logo variant="footer" />

            <div className="hidden sm:block w-px h-12 bg-ko-border-primary" />

            <div className="text-center sm:text-left">
              <p className="text-xs text-ko-text-muted/60">{copyright}</p>
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ko-card border border-ko-border-primary hover:border-transparent flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary" />

                  <span className="text-ko-text-muted group-hover:text-white relative z-10 transition-colors">
                    <Icon name={social.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

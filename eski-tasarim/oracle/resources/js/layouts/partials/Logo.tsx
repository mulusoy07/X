import { useLayout, useCdn } from '@/hooks'

interface LogoProps {
  variant?: 'header' | 'footer'
}

export function Logo({ variant = 'header' }: LogoProps) {
  const layout = useLayout()
  const cdn = useCdn()

  const siteName = layout.seo.site_name || ''
  const isFooter = variant === 'footer'
  const siteLogo = isFooter
    ? (layout.seo.site_footer_logo || layout.seo.site_logo || '')
    : (layout.seo.site_logo || '')
  const siteLogoSrcset = isFooter
    ? (layout.seo.site_footer_logo_srcset || layout.seo.site_logo_srcset || null)
    : (layout.seo.site_logo_srcset || null)

  const logoUrl = cdn.getAsset(siteLogo)

  return (
    <Link href={route('public.home')} className="flex-shrink-0 block group">
      <div className="relative h-10 sm:h-16 w-auto max-w-[180px] sm:max-w-[220px]">
        <img
          src={logoUrl}
          srcSet={siteLogoSrcset || undefined}
          sizes="220px"
          alt={`${siteName} Logo`}
          className="h-full w-full object-contain object-left transition-all duration-300 ease-out group-hover:scale-105 group-hover:brightness-110"
        />
      </div>
    </Link>
  )
}

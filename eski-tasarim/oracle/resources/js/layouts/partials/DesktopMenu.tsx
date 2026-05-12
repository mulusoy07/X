import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu'
import { MegaMenu } from './MegaMenu'
import { useLayout } from '@/hooks'

export function DesktopMenu() {
  const layout = useLayout()
  const menuItems = layout.menu || []

  return (
    <NavigationMenu className="hidden xl:flex" delayDuration={0}>
      <NavigationMenuList className="gap-0">
        {menuItems.map((menu, idx) => (
          <div key={menu.title || idx} className="flex items-center">
            <div className="pr-2 pl-2">
              <MegaMenu
                title={menu.title}
                href={menu.href}
                columns={menu.columns}
                featuredImage={menu.featuredImage}
                featuredTitle={menu.featuredTitle}
                featuredDescription={menu.featuredDescription}
                featuredButtonText={menu.featuredButtonText}
                featuredButtonHref={menu.featuredButtonHref}
              />
            </div>
            {idx < menuItems.length - 1 && (
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 rotate-45 bg-gradient-to-br from-ko-brand-primary to-ko-brand-secondary opacity-40" />
              </div>
            )}
          </div>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

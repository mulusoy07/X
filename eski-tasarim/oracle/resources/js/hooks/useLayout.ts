import { usePage } from '@inertiajs/react'
import type { PageProps, LayoutData } from '@/types/inertia'

/**
 * useLayout Hook
 * 
 * Access layout data from Inertia shared props
 * 
 * @example
 * const layout = useLayout()
 * const style = layout.config.style
 * const menu = layout.menu
 */
export function useLayout(): LayoutData {
  const { layout } = usePage<PageProps>().props
  return layout
}

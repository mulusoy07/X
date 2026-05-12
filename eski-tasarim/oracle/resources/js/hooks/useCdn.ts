import { usePage } from '@inertiajs/react'
import type { PageProps } from '@/types/inertia'

/**
 * CDN Hook
 * 
 * Access CDN URLs from Inertia shared props
 * 
 * @example
 * const cdn = useCdn()
 * <img src={cdn.getAsset('/images/logo.webp')} />
 */
export function useCdn() {
  const { cdn } = usePage<PageProps>().props

  return {
    url: cdn.url,
    assets: cdn.assets,
    storage: cdn.storage,
    
    /**
     * Get full CDN URL
     */
    getUrl: (path: string) => `${cdn.url}${path}`,
    
    /**
     * Get CDN assets URL
     */
    getAsset: (path: string) => `${cdn.assets}${path}`,
    
    /**
     * Get CDN storage URL
     */
    getStorage: (path: string) => `${cdn.storage}${path}`,
  }
}

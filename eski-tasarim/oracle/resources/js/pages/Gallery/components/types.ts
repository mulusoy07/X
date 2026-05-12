export interface Gallery {
  id: number
  name: string
  slug: string
  description: string
  image: string | null
  images: GalleryImage[]
  isFeatured: boolean
  order: number
  createdAt: string
}

export interface GalleryImage {
  img: string
  description: string
}


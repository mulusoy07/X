import type { GameFeedCategory } from './types'

export function getMessageStyles(color: string) {
  const c = color || 'gray'
  return {
    icon: `bg-${c}-500/20 text-${c}-400 border-${c}-500/30`,
    title: `text-${c}-400`,
    border: `border-${c}-500/20 hover:bg-${c}-500/5`,
  }
}

export function getCategoryByType(categories: GameFeedCategory[], type: string): GameFeedCategory | undefined {
  return categories.find(c => c.key === type)
}

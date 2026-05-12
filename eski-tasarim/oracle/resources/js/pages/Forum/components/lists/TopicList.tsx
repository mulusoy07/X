import { TopicCard } from '../cards/TopicCard'
import type { ForumTopic } from '../../types'

interface TopicListProps {
  topics: ForumTopic[]
  showNode?: boolean
}

export function TopicList({ topics, showNode = false }: TopicListProps) {
  if (!topics || topics.length === 0) {
    return null
  }

  return (
    <div className="divide-y divide-ko-border-primary">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} showNode={showNode} />
      ))}
    </div>
  )
}

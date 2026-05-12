import type { GameFeedApiResponse, GameFeedCategory, GameMessage } from './types'

export function useGameFeed() {
  const [categories, setCategories] = useState<GameFeedCategory[]>([])
  const [messages, setMessages] = useState<GameMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchMessages() {
      try {
        const response = await axios.get<GameFeedApiResponse>(route('api.game-feeds'), {
          timeout: 5000,
        })

        if (response.data.error || !response.data.data?.categories?.length) {
          throw new Error()
        }

        if (!cancelled) {
          setCategories(response.data.data.categories)
          setMessages(response.data.data.messages || [])
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setError('widgets.game_feed.error')
          setCategories([])
          setMessages([])
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchMessages()

    return () => {
      cancelled = true
    }
  }, [])

  return { categories, messages, isLoading, error }
}

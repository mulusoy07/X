import { useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { PublicLayout } from '@/layouts/PublicLayout'
import { PageHeader } from '@/components/shared/PageHeader'
import { TopicCard } from './components'

export default function Search({ initialQuery = '', initialType = 'all' }) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchType, setSearchType] = useState(initialType)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Perform search
  const performSearch = async (e) => {
    if (e) e.preventDefault()

    if (!searchQuery.trim()) {
      setError(t('plugins.forum.page.search.enter_search_term'))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        route('api.ko-forum-v2.search'),
        {
          params: { q: searchQuery.trim(), type: searchType },
          timeout: 10000
        }
      )

      if (response.data.error || !response.data.data) {
        setError(response.data.message || t('plugins.forum.page.search.search_error'))
      } else {
        setResults(response.data.data)
      }
    } catch (err) {
      setError(err.message || t('components.errors.generic'))
    } finally {
      setLoading(false)
    }
  }

  const totalResults =
    (results?.topics?.length || 0) + (results?.posts?.length || 0)

  return (
    <>
      <Head>
        <title>{t('plugins.forum.page.search.title')}</title>
      </Head>

      <div className="bg-gradient-to-br from-ko-main via-ko-card to-ko-main min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <PageHeader
            title={t('plugins.forum.page.search.title')}
            subtitle={t('plugins.forum.page.search.subtitle')}
            icon={
              <div className="w-12 h-12 bg-ko-accent/20 rounded-lg flex items-center justify-center">
                <Icon name="ti ti-search" size={24} className="text-ko-accent" />
              </div>
            }
          />

          {/* Search Form */}
          <div className="bg-ko-card/90 backdrop-blur-md rounded-2xl border border-ko-border-primary p-6 mb-6">
            <form onSubmit={performSearch} className="space-y-5">
              {/* Search Input */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
                  {t('plugins.forum.page.search.search_term')}
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('plugins.forum.page.search.search_placeholder')}
                  className="w-full bg-ko-widget-bg border border-ko-border-primary rounded-lg h-12 px-4 text-ko-text-primary placeholder:text-ko-text-muted focus:outline-none focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 transition-all duration-200"
                  disabled={loading}
                />
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
                  {t('plugins.forum.page.search.search_type')}
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSearchType('all')}
                    className={`h-10 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      searchType === 'all'
                        ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg'
                        : 'bg-ko-widget-bg border border-ko-border-primary text-ko-text-muted hover:text-ko-text-primary hover:border-ko-brand-primary/50'
                    }`}
                    disabled={loading}
                  >
                    {t('plugins.forum.page.search.all')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('topics')}
                    className={`h-10 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                      searchType === 'topics'
                        ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg'
                        : 'bg-ko-widget-bg border border-ko-border-primary text-ko-text-muted hover:text-ko-text-primary hover:border-ko-brand-primary/50'
                    }`}
                    disabled={loading}
                  >
                    <Icon name="ti ti-message" size={16} />
                    <span>{t('plugins.forum.page.search.topics')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('posts')}
                    className={`h-10 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                      searchType === 'posts'
                        ? 'bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark shadow-lg'
                        : 'bg-ko-widget-bg border border-ko-border-primary text-ko-text-muted hover:text-ko-text-primary hover:border-ko-brand-primary/50'
                    }`}
                    disabled={loading}
                  >
                    <Icon name="ti ti-file-text" size={16} />
                    <span>{t('plugins.forum.page.search.replies')}</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="w-full h-12 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark font-bold text-sm rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Icon name="ti ti-loader-2" className="w-5 h-5 animate-spin" />
                    <span>{t('plugins.forum.page.search.searching')}</span>
                  </>
                ) : (
                  <>
                    <Icon name="ti ti-search" className="w-5 h-5" />
                    <span>{t('plugins.forum.page.search.search_button')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Results */}
          {results && !loading && (
            <div className="space-y-6">
              {/* Results Count */}
              <div className="text-gray-300">
                <span className="font-semibold text-white">{totalResults}</span> {t('plugins.forum.page.search.results_found')}
                {results.query && (
                  <>
                    {' '}
                    <span className="text-gray-400">{t('plugins.forum.page.search.for')}</span>{' '}
                    <span className="font-semibold text-ko-accent">"{results.query}"</span>
                  </>
                )}
              </div>

              {/* Topics Results */}
              {results.topics && results.topics.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Icon name="ti ti-message" size={20} className="text-ko-accent" />
                    <span>{t('plugins.forum.page.search.topics')} ({results.topics.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {results.topics.map((topic) => (
                      <TopicCard key={topic.id} topic={topic} showNode={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* Posts Results */}
              {results.posts && results.posts.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Icon name="ti ti-file-text" size={20} className="text-ko-accent" />
                    <span>{t('plugins.forum.page.search.replies')} ({results.posts.length})</span>
                  </h3>
                  <div className="space-y-3">
                    {results.posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-ko-card/50 backdrop-blur-sm rounded-lg border border-ko-border p-6 hover:border-ko-accent/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <Link
                            href={`/forum/topic/${post.topic?.slug}`}
                            className="text-lg font-semibold text-white hover:text-ko-accent transition-colors"
                          >
                            {post.topic?.title}
                          </Link>
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                            {post.createdAtHuman}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          {post.author.avatar ? (
                            <img
                              src={post.author.avatar}
                              alt={post.author.displayName}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ko-accent to-purple-600 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {post.author.displayName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="text-sm text-gray-300">
                            {post.author.displayName}
                          </span>
                        </div>
                        <div className="text-gray-300 text-sm line-clamp-3">{post.contentPreview}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {totalResults === 0 && (
                <div className="bg-ko-card/50 backdrop-blur-sm rounded-lg border border-ko-border p-8 text-center">
                  <Icon name="ti ti-search" size={48} className="text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">{t('plugins.forum.page.search.no_results')}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {t('plugins.forum.page.search.try_different')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

Search.layout = (page) => <PublicLayout children={page} />

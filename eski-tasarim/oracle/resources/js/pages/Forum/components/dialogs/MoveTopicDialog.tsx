import { useState, useEffect } from 'react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { toast } from 'sonner'

interface Node {
  id: number
  title: string
  slug: string
  parentId: number | null
}

interface MoveTopicDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topicSlug: string
  onSuccess?: () => void
}

export function MoveTopicDialog({ open, onOpenChange, topicSlug, onSuccess }: MoveTopicDialogProps) {
  const { t } = useTranslation()
  const [nodes, setNodes] = useState<Node[]>([])
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  // Fetch available nodes when dialog opens
  useEffect(() => {
    if (open) {
      fetchNodes()
    }
  }, [open])

  const fetchNodes = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        route('api.ko-forum-v2.moderation.nodes'),
        { timeout: 5000 }
      )

      if (!response.data.error && response.data.data?.nodes) {
        setNodes(response.data.data.nodes)
      }
    } catch (err) {
      toast.error(t('plugins.forum.page.move_dialog.nodes_failed'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleMove = async () => {
    if (!selectedNodeId) {
      toast.error(t('plugins.forum.page.move_dialog.select_category_error'))
      return
    }

    setIsMoving(true)

    try {
      const response = await axios.post(
        route('api.ko-forum-v2.moderation.topic.move', { slug: topicSlug }),
        { target_node_id: selectedNodeId },
        { timeout: 5000 }
      )

      if (response.data.error) {
        toast.error(response.data.message || t('plugins.forum.page.move_dialog.move_failed'))
      } else {
        toast.success(t('plugins.forum.page.move_dialog.move_success'))
        onOpenChange(false)
        onSuccess?.()
      }
    } catch (err) {
      toast.error(t('components.errors.generic'))
    } finally {
      setIsMoving(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-ko-card border border-ko-border-primary rounded-2xl shadow-2xl max-w-[500px] w-full">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ko-brand-primary to-transparent opacity-60" />

        {/* Header */}
        <div className="relative p-6 border-b border-ko-border-primary bg-gradient-to-r from-ko-brand-primary/5 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ko-brand-primary/10 border border-ko-brand-primary/20 rounded-lg">
              <Icon name="ti ti-arrows-move" size={20} className="text-ko-brand-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-ko-text-primary">
                {t('plugins.forum.page.move_dialog.title')}
              </h2>
              <p className="text-sm text-ko-text-muted mt-1">
                {t('plugins.forum.page.move_dialog.description')}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-ko-widget-bg rounded-lg transition-colors"
            >
              <Icon name="ti ti-x" size={20} className="text-ko-text-muted" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-ko-brand-primary/30 border-t-ko-brand-primary rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-ko-text-card-title uppercase tracking-wider">
                  {t('plugins.forum.page.move_dialog.target_category')} <span className="text-red-400">*</span>
                </label>
                <select
                  value={selectedNodeId?.toString() || ''}
                  onChange={(e) => setSelectedNodeId(parseInt(e.target.value))}
                  disabled={isMoving}
                  className="w-full bg-ko-widget-bg border border-ko-border-primary rounded-lg h-12 px-4 text-ko-text-primary focus:outline-none focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 transition-all duration-200"
                >
                  <option value="">{t('plugins.forum.page.move_dialog.select_category')}</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Info box */}
              <div className="p-3 bg-ko-widget-bg/30 border border-ko-border-primary rounded-lg">
                <p className="text-xs text-ko-text-muted">
                  <span className="font-bold text-ko-text-primary">{t('plugins.forum.delete_dialog.note').split(':')[0]}:</span> {t('plugins.forum.page.move_dialog.note')}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-ko-border-primary bg-ko-widget-bg/30 flex items-center justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            disabled={isMoving}
            className="px-4 py-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-sm font-semibold text-ko-text-primary hover:bg-ko-card transition-all disabled:opacity-50"
          >
            {t('components.buttons.cancel')}
          </button>
          <button
            onClick={handleMove}
            disabled={isMoving || !selectedNodeId}
            className="px-4 py-2 bg-gradient-to-r from-ko-brand-primary to-ko-brand-secondary text-ko-text-dark rounded-lg text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isMoving ? (
              <>
                <Icon name="ti ti-loader-2" size={16} className="animate-spin" />
                <span>{t('plugins.forum.page.move_dialog.moving')}</span>
              </>
            ) : (
              <>
                <Icon name="ti ti-arrows-move" size={16} />
                <span>{t('plugins.forum.page.move_dialog.move')}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

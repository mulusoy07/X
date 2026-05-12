import { useState } from 'react'
import { router, Link } from '@inertiajs/react'
import axios from 'axios'
import { Icon } from '@/components/shared/icon'
import { toast } from 'sonner'
import { MoveTopicDialog } from '../dialogs/MoveTopicDialog'
import { DeleteTopicDialog } from '../dialogs/DeleteDialog'
import { ConfirmDialog } from '../dialogs/ConfirmDialog'

interface TopicActionsProps {
  topicSlug: string
  isPinned: boolean
  isLocked: boolean
  canPin?: boolean
  canLock?: boolean
  canMove?: boolean
  canEdit?: boolean
  canDelete?: boolean
}

export function TopicActions({
  topicSlug,
  isPinned: initialIsPinned,
  isLocked: initialIsLocked,
  canPin,
  canLock,
  canMove,
  canEdit,
  canDelete,
}: TopicActionsProps) {
  const { t } = useTranslation()
  const [isPinned, setIsPinned] = useState(initialIsPinned)
  const [isLocked, setIsLocked] = useState(initialIsLocked)
  const [isProcessing, setIsProcessing] = useState(false)
  const [moveDialogOpen, setMoveDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pinDialogOpen, setPinDialogOpen] = useState(false)
  const [lockDialogOpen, setLockDialogOpen] = useState(false)

  // Handle Pin/Unpin
  const handleTogglePin = async () => {
    setIsProcessing(true)

    try {
      const response = await axios.post(
        route('api.ko-forum-v2.moderation.topic.pin', { slug: topicSlug }),
        {},
        { timeout: 5000 }
      )

      if (response.data.error) {
        toast.error(response.data.message || t('plugins.forum.components.topic_actions.pin_failed'))
      } else {
        setIsPinned(!isPinned)
        toast.success(isPinned ? t('plugins.forum.components.topic_actions.unpinned') : t('plugins.forum.components.topic_actions.pinned'))
        setPinDialogOpen(false)
        router.reload()
      }
    } catch (err) {
      toast.error(t('plugins.forum.components.topic_actions.error_occurred'))
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle Lock/Unlock
  const handleToggleLock = async () => {
    setIsProcessing(true)

    try {
      const response = await axios.post(
        route('api.ko-forum-v2.moderation.topic.lock', { slug: topicSlug }),
        {},
        { timeout: 5000 }
      )

      if (response.data.error) {
        toast.error(response.data.message || t('plugins.forum.components.topic_actions.lock_failed'))
      } else {
        setIsLocked(!isLocked)
        toast.success(isLocked ? t('plugins.forum.components.topic_actions.unlocked') : t('plugins.forum.components.topic_actions.locked'))
        setLockDialogOpen(false)
        router.reload()
      }
    } catch (err) {
      toast.error(t('plugins.forum.components.topic_actions.error_occurred'))
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle successful move
  const handleMoveSuccess = () => {
    router.reload()
  }

  // Handle successful delete
  const handleDeleteSuccess = () => {
    router.visit('/forum')
  }

  const hasAnyAction = canPin || canLock || canMove || canEdit || canDelete

  if (!hasAnyAction) return null

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Pin Button */}
        {canPin && (
          <button
            onClick={() => setPinDialogOpen(true)}
            disabled={isProcessing}
            className={`p-2 border rounded-lg transition-all ${
              isPinned
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-500'
                : 'bg-ko-widget-bg border-ko-border-primary text-ko-text-muted hover:text-amber-500 hover:bg-ko-card'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isPinned ? t('plugins.forum.components.topic_actions.unpin') : t('plugins.forum.components.topic_actions.pin')}
          >
            <Icon name="ti ti-pin" size={16} />
          </button>
        )}

        {/* Lock Button */}
        {canLock && (
          <button
            onClick={() => setLockDialogOpen(true)}
            disabled={isProcessing}
            className={`p-2 border rounded-lg transition-all ${
              isLocked
                ? 'bg-red-500/20 border-red-500/50 text-red-500'
                : 'bg-ko-widget-bg border-ko-border-primary text-ko-text-muted hover:text-red-500 hover:bg-ko-card'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isLocked ? t('plugins.forum.components.topic_actions.unlock') : t('plugins.forum.components.topic_actions.lock')}
          >
            <Icon name={isLocked ? 'ti ti-lock-open' : 'ti ti-lock'} size={16} />
          </button>
        )}

        {/* Move Button */}
        {canMove && (
          <button
            onClick={() => setMoveDialogOpen(true)}
            disabled={isProcessing}
            className={`p-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-muted hover:text-ko-brand-primary hover:bg-ko-card transition-all ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={t('plugins.forum.components.topic_actions.move')}
          >
            <Icon name="ti ti-arrows-move" size={16} />
          </button>
        )}

        {/* Edit Button */}
        {canEdit && (
          <Link
            href={`/forum/topic/${topicSlug}/edit`}
            className="p-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-muted hover:text-ko-brand-primary hover:bg-ko-card transition-all"
            title={t('plugins.forum.components.topic_actions.edit')}
          >
            <Icon name="ti ti-edit" size={16} />
          </Link>
        )}

        {/* Delete Button */}
        {canDelete && (
          <button
            onClick={() => setDeleteDialogOpen(true)}
            disabled={isProcessing}
            className={`p-2 bg-ko-widget-bg border border-ko-border-primary rounded-lg text-ko-text-muted hover:text-red-500 hover:bg-ko-card transition-all ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={t('plugins.forum.components.topic_actions.delete')}
          >
            <Icon name="ti ti-trash" size={16} />
          </button>
        )}
      </div>

      {/* Move Dialog */}
      {canMove && (
        <MoveTopicDialog
          open={moveDialogOpen}
          onOpenChange={setMoveDialogOpen}
          topicSlug={topicSlug}
          onSuccess={handleMoveSuccess}
        />
      )}

      {/* Delete Dialog */}
      {canDelete && (
        <DeleteTopicDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          topicSlug={topicSlug}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Pin Confirm Dialog */}
      {canPin && (
        <ConfirmDialog
          open={pinDialogOpen}
          onOpenChange={setPinDialogOpen}
          title={isPinned ? t('plugins.forum.components.topic_actions.unpin_title') : t('plugins.forum.components.topic_actions.pin_title')}
          description={isPinned ? t('plugins.forum.components.topic_actions.unpin_confirm') : t('plugins.forum.components.topic_actions.pin_confirm')}
          confirmText={isPinned ? t('plugins.forum.components.topic_actions.yes_unpin') : t('plugins.forum.components.topic_actions.yes_pin')}
          confirmingText={isPinned ? t('plugins.forum.components.topic_actions.unpinning') : t('plugins.forum.components.topic_actions.pinning')}
          onConfirm={handleTogglePin}
          isProcessing={isProcessing}
          variant="warning"
          icon="ti ti-pin"
        />
      )}

      {/* Lock Confirm Dialog */}
      {canLock && (
        <ConfirmDialog
          open={lockDialogOpen}
          onOpenChange={setLockDialogOpen}
          title={isLocked ? t('plugins.forum.components.topic_actions.unlock_title') : t('plugins.forum.components.topic_actions.lock_title')}
          description={isLocked ? t('plugins.forum.components.topic_actions.unlock_confirm') : t('plugins.forum.components.topic_actions.lock_confirm')}
          confirmText={isLocked ? t('plugins.forum.components.topic_actions.yes_unlock') : t('plugins.forum.components.topic_actions.yes_lock')}
          confirmingText={isLocked ? t('plugins.forum.components.topic_actions.unlocking') : t('plugins.forum.components.topic_actions.locking')}
          onConfirm={handleToggleLock}
          isProcessing={isProcessing}
          variant="danger"
          icon={isLocked ? 'ti ti-lock-open' : 'ti ti-lock'}
        />
      )}
    </>
  )
}


interface ForumEditorProps {
  content?: string
  onChange?: (html: string) => void
  placeholder?: string
  minHeight?: string
  disabled?: boolean
}

export function ForumEditor({
  content = '',
  onChange,
  placeholder,
  minHeight = '200px',
  disabled = false,
}: ForumEditorProps) {
  const { t } = useTranslation()
  const defaultPlaceholder = placeholder || t('plugins.forum.components.editor.placeholder')

  // TODO: Implement TipTap editor
  // For now, using simple textarea
  // TipTap packages needed:
  // - @tiptap/react
  // - @tiptap/starter-kit
  // - @tiptap/extension-color
  // - @tiptap/extension-link
  // - @tiptap/extension-image
  // - @tiptap/extension-underline
  // - @tiptap/extension-highlight
  // - @tiptap/extension-text-style
  // - @tiptap/extension-table
  // - @tiptap/extension-table-row
  // - @tiptap/extension-table-cell
  // - @tiptap/extension-table-header

  return (
    <div className="bg-ko-card/90 backdrop-blur-md rounded-xl border border-ko-border-primary overflow-hidden">
      {/* Toolbar - Placeholder */}
      <div className="flex items-center gap-1 p-2 border-b border-ko-border-primary bg-ko-widget-bg/50">
        <div className="text-xs text-ko-text-muted px-2">
          {t('plugins.forum.components.editor.toolbar_placeholder')}
        </div>
      </div>

      {/* Editor Content - Simple Textarea */}
      <textarea
        value={content}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={defaultPlaceholder}
        disabled={disabled}
        className="w-full p-4 bg-transparent text-ko-text-primary placeholder:text-ko-text-muted focus:outline-none resize-none"
        style={{ minHeight }}
      />
    </div>
  )
}

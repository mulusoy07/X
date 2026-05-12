import { Input } from '@/components/ui/input'
import { Icon } from '@/components/shared/icon'

export function FormInput({
  icon: InputIcon,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled = false,
  showValidIcon = false,
  maxLength,
  autoComplete,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  inputMode,
  pattern,
}) {
  return (
    <div className="space-y-2">
      <div className="relative group/input">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ko-text-muted pointer-events-none transition-colors group-focus-within/input:text-ko-brand-primary">
          <InputIcon />
        </div>
        <Input
          type={showPasswordToggle && !showPassword ? 'password' : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`bg-ko-widget-bg border-ko-border-primary text-ko-text-primary h-12 pl-11 ${showPasswordToggle ? 'pr-11' : ''} placeholder:text-ko-text-muted transition-all duration-200 focus:border-ko-brand-primary/50 focus:shadow-lg focus:shadow-ko-brand-primary/10 ${error ? 'border-ko-karus focus:border-ko-karus' : ''}`}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
          inputMode={inputMode}
          pattern={pattern}
        />
        
        {showValidIcon && value && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-ko-status-online pointer-events-none animate-scale-in">
            <Icon name="ti ti-circle-check" className="w-5 h-5" />
          </div>
        )}

        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ko-text-muted hover:text-ko-brand-primary transition-all z-10 hover:scale-110"
            disabled={disabled}
          >
            {showPassword ? <Icon name="ti ti-eye-off" className="w-5 h-5" /> : <Icon name="ti ti-eye" className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-ko-karus text-xs mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
          <Icon name="ti ti-alert-circle" className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

import { forwardRef, useRef, useState } from 'react'
import type { ComponentProps } from 'react'
import { Icon } from '@/components/shared/icon'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

type PhoneInputProps = Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void
  }

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, _ref) => {
    return (
      <RPNInput.default
        className={cn('flex', className)}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        smartCaret={false}
        value={value || undefined}
        onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
        {...props}
      />
    )
  },
)
PhoneInput.displayName = 'PhoneInput'

const InputComponent = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        'flex h-12 w-full rounded-e-lg rounded-s-none',
        'border border-ko-border-primary bg-ko-widget-bg',
        'px-3 py-2 text-sm text-ko-text-primary',
        'placeholder:text-ko-text-muted',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ko-brand-primary/50 focus-visible:border-ko-brand-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-200',
        className
      )}
      {...props}
      ref={ref}
    />
  ),
)
InputComponent.displayName = 'InputComponent'

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  options: CountryEntry[]
  onChange: (country: RPNInput.Country) => void
}

function CountrySelect({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) {
  const { t } = useTranslation()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) setSearchValue('')
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 h-12',
            'bg-ko-widget-bg border-ko-border-primary hover:bg-ko-card-bg text-ko-text-primary',
            'focus:z-10 focus-visible:ring-1 focus-visible:ring-ko-brand-primary/50'
          )}
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <Icon
            name="ti ti-selector"
            className={cn('-mr-2 size-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 bg-ko-card border-ko-border-primary shadow-xl">
        <Command className="bg-ko-card rounded-lg">
          <div className="flex items-center px-3 py-2 bg-ko-card-bg">
            <CommandInput
              value={searchValue}
              onValueChange={(value: string) => {
                setSearchValue(value)
                setTimeout(() => {
                  if (scrollAreaRef.current) {
                    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
                    if (viewport) (viewport as HTMLElement).scrollTop = 0
                  }
                }, 0)
              }}
              placeholder={t('components.ui.phone_input.search_placeholder')}
              className="h-9 bg-transparent border-none text-ko-text-primary placeholder:text-ko-text-muted focus:ring-0 focus:outline-none text-sm"
            />
          </div>
          <CommandList className="max-h-[280px]">
            <ScrollArea ref={scrollAreaRef} className="h-[280px]">
              <CommandEmpty className="text-ko-text-muted py-8 text-center text-sm">
                <p>{t('components.ui.phone_input.country_not_found')}</p>
              </CommandEmpty>
              <CommandGroup className="p-2">
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country
  onChange: (country: RPNInput.Country) => void
  onSelectComplete: () => void
}

function CountrySelectOption({ country, countryName, selectedCountry, onChange, onSelectComplete }: CountrySelectOptionProps) {
  return (
    <CommandItem
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors',
        'text-ko-text-primary hover:bg-ko-widget-bg hover:text-ko-text-card-title',
        'data-[selected=true]:bg-ko-widget-bg',
        country === selectedCountry && 'bg-ko-brand-primary/10 hover:bg-ko-brand-primary/15'
      )}
      onSelect={() => { onChange(country); onSelectComplete() }}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm font-medium">{countryName}</span>
      <span className="text-xs text-ko-text-muted font-mono">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      {country === selectedCountry && (
        <Icon name="ti ti-check" className="w-4 h-4 text-ko-brand-primary flex-shrink-0" />
      )}
    </CommandItem>
  )
}

function FlagComponent({ country, countryName }: RPNInput.FlagProps) {
  const Flag = flags[country]
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded border border-ko-border-primary/30 bg-ko-widget-bg/50 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}

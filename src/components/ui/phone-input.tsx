'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn('flex', className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          // @ts-expect-error - react-phone-number-input types can be tricky
          onChange={(value) => onChange?.(value || '')}
          {...props}
        />
      );
    }
  );
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, style, ...props }, ref) => (
    <Input
      className={cn(
        'rounded-e-md rounded-s-none border-none focus-visible:ring-0 px-4',
        className
      )}
      style={{ height: '100%', border: 'none', ...style }}
      {...props}
      ref={ref}
    />
  )
);
InputComponent.displayName = 'InputComponent';

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const [searchValue, setSearchValue] = React.useState("");
  
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );

  const countryOptions = React.useMemo(() => {
    return options
      .filter((x) => x.value)
      .filter((option) => {
        if (!searchValue) return true;
        const search = searchValue.toLowerCase();
        return (
          option.label.toLowerCase().includes(search) ||
          option.value.toLowerCase().includes(search) ||
          RPNInput.getCountryCallingCode(option.value).includes(search)
        );
      })
      .map((option) => (
        <CommandItem
          className='gap-2'
          key={option.value}
          onSelect={() => handleSelect(option.value)}
        >
          <FlagComponent
            country={option.value}
            countryName={option.label}
          />
          <span className='flex-1 text-sm'>{option.label}</span>
          <span className='text-foreground/50 text-sm'>
            {`+${RPNInput.getCountryCallingCode(option.value)}`}
          </span>
          <CheckIcon
            className={cn(
              'ml-auto h-4 w-4',
              option.value === value ? 'opacity-100' : 'opacity-0'
            )}
          />
        </CommandItem>
      ));
  }, [options, value, handleSelect, searchValue]);

  return (
    <Popover modal={false} onOpenChange={(open) => !open && setSearchValue("")}>
      <PopoverTrigger
        type='button'
        variant='ghost'
        className={cn('flex !h-full gap-1 rounded-e-none rounded-s-md border-r border-outline-variant/20 px-3 transition-colors hover:bg-surface-container-lowest focus:z-10')}
        style={{ height: "100%" }}
        disabled={disabled}
      >
        <FlagComponent country={value} countryName={value} />
        <ChevronsUpDown className={cn('-mr-2 h-4 w-4 opacity-50', disabled ? 'hidden' : 'opacity-100')} />
      </PopoverTrigger>

      <PopoverContent className='w-[300px] p-0' side="bottom" align="start" sideOffset={8}>
        <Command shouldFilter={false}>
          <CommandInput 
            value={searchValue} 
            onValueChange={setSearchValue} 
            placeholder='Search country...' 
            autoFocus 
          />
          <CommandList className="no-scrollbar max-h-72 overflow-y-auto">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryOptions}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className='bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-xs'>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = 'FlagComponent';

export { PhoneInput };

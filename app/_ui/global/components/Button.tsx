import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

// Define the button variants using cva (class-variance-authority)
const buttonVariants = cva(
  'relative flex h-fit justify-center items-center font-semibold text-nowrap uppercase transition-all rounded overflow-hidden group/btn reflect-none',
  {
    variants: {
      variant: {
        primary: 'bg-dark text-white border border-dark',
        action: 'bg-primary text-white relative overflow-hidden border border-primary',
        secondary: 'bg-light text-dark border border-dark hover:text-light',
        darkSecondary: 'bg-dark text-light border border-light',
        destructive: 'text-red-600 border border-red-600 bg-transparent',
        ghost: 'bg-transparent text-dark border border-transparent',
      },
      size: {
        default: 'text-base px-3 py-2',
        icon: 'p-2',
        sm: 'text-sm px-3 py-1.5',
        lg: 'text-lg px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

// Define custom focus state styling
const focusStyle = cva('focus-visible:outline-2 focus-visible:outline-dashed transition-none', {
  variants: {
    theme: {
      dark: 'focus-visible:outline-dark',
      light: 'focus-visible:outline-light',
      action: 'focus-visible:outline-primary',
    },
    focusType: {
      outer: 'focus-visible:outline-offset-2',
      inner: 'focus-visible:outline-offset-[-4px]',
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: IconDefinition;
  selected?: boolean;
  disabled?: boolean;
  focusTheme?: 'dark' | 'light' | 'action';
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      children,
      disabled,
      focusTheme = 'dark',
      selected = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          focusStyle({ theme: focusTheme, focusType: 'outer' }),
          {
            'opacity-50 pointer-events-none': disabled, // Apply 50% opacity and disable pointer events when disabled
            'cursor-default': selected, // Set cursor to default when selected
            'group-hover/btn:border-primary hover:border-primary': !selected && variant === 'primary',
            'group-hover/btn:border-dark hover:border-dark': !selected && variant === 'action',
            'group-hover/btn:text-dark hover:text-dark': !selected && variant === 'darkSecondary',
          }
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        <span className={cn('relative flex items-center justify-center z-[5] gap-2 transition-colors duration-300')}>
          {loading ? (
            // Loading spinner
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-white">Cargando...</span>
            </>
          ) : (
            <>
              {children}
              {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4" />}
            </>
          )}
        </span>
        {/* Span for the hover effect */}
        {!selected && (
          <span
            className={cn(
              'absolute inset-0 transform scale-y-0 transition-all duration-300 ease-out origin-bottom group-hover/btn:scale-y-100',
              {
                'bg-primary': variant === 'primary' && !disabled,
                'bg-dark': (variant === 'action' && !disabled) || (variant === 'secondary' && !disabled),
                'bg-light': variant === 'darkSecondary' && !disabled,
                'bg-red-600': variant === 'destructive' && !disabled,
              }
            )}
          />
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants, focusStyle };

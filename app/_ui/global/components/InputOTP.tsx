'use client';

import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { focusStyle } from './Button';

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn('flex items-center gap-2', containerClassName)}
      className={cn(
        'bg-light text-dark placeholder:text-gray-400 outline-none p-2 px-4 placeholder:uppercase placeholder:font-semibold border border-dark focus:border-primary rounded disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  )
);
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center', className)} {...props} />
);
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];
  if (!slot) {
    throw new Error(`Slot ${index} does not exist`);
  }
  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center border-y border-r border-dark text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md bg-light text-dark outline-none p-2 px-4',
        isActive && 'z-10 ring-2 ring-primary ring-offset-background',
        className,
        focusStyle({ theme: 'action', focusType: 'outer' })
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-dark duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<React.ElementRef<'div'>, React.ComponentPropsWithoutRef<'div'>>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <FontAwesomeIcon icon={faCircleDot} className="h-4 w-4" />
    </div>
  )
);
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

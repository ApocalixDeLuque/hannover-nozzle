import React, { forwardRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { focusStyle } from './Button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, autoComplete, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const isPrice = type === 'price';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="flex flex-col w-full max-w-[600px] gap-0 group !m-0 transition-all duration-300">
        {label && (
          <p
            className={cn('text-gray-400 text-xs font-semibold transition', {
              'group-focus-within:text-primary': label,
            })}
          >
            {label}
          </p>
        )}
        <div className="w-full relative">
          <input
            type={isPassword ? (showPassword ? 'text' : 'password') : isPrice ? 'number' : type}
            className={cn(
              className,
              'min-w-full bg-light text-dark placeholder:text-gray-400 outline-none p-2 px-4 placeholder:uppercase placeholder:font-semibold',
              {
                'border-b border-dark pr-8': isPrice,
                'border border-dark focus:border-primary rounded': !isPrice,
              },
              focusStyle({ theme: 'action', focusType: 'outer' })
            )}
            autoComplete={isPrice ? 'off' : autoComplete}
            step={isPrice ? '100' : '1'}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="h-4 w-4" />
            </button>
          )}
          {isPrice && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark font-semibold">$</span>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };

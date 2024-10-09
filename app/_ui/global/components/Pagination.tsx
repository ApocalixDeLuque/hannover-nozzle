import * as React from 'react';
import { ButtonProps, buttonVariants, focusStyle } from './Button';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size' | 'disabled' | 'className'> &
  React.ComponentProps<'a'>;

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size = 'icon', disabled, ...props }, ref) => (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        '!w-10 !h-10 aspect-square',
        buttonVariants({
          variant: isActive ? 'primary' : 'secondary',
          size,
        }),
        focusStyle({ theme: 'dark', focusType: 'outer' }),
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
      ref={ref}
      {...props}
    >
      <span className={cn('relative flex items-center justify-center z-10 gap-2 transition-colors duration-300')}>
        {props.children}
      </span>
      {!isActive && (
        <span
          className={cn(
            'absolute inset-0 transform scale-y-0 transition-all duration-300 ease-out origin-bottom group-hover/btn:scale-y-100',
            {
              'bg-dark': !disabled,
            }
          )}
        />
      )}
    </a>
  )
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn('gap-1 pl-2.5', className)} {...props}>
    <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn('gap-1 pr-2.5', className)} {...props}>
    <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex px-6 items-center justify-center', className)} {...props}>
    <FontAwesomeIcon icon={faEllipsis} className="h-3 w-3" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center break-words text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center gap-1.5', className)} {...props} />
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return <Comp ref={ref} className={cn(className)} {...props} />;
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'div'>) => (
  <div role="presentation" aria-hidden="true" className={cn('[&>svg]:size-3.5', className)} {...props}>
    {children ?? <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />}
  </div>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <FontAwesomeIcon icon={faArrowsLeftRight} className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

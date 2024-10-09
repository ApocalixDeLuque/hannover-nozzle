import { Fragment } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from '../../global/components/Breadcrumbs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../global/components/DropdownMenu';
import cn from 'classnames';

interface BreadcrumbProps {
  breadcrumbData: {
    label: string;
    href?: string;
    current?: boolean;
    dropdown?: {
      label: string;
    }[];
  }[];
}

export function CustomBreadcrumb({ breadcrumbData }: BreadcrumbProps): JSX.Element {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbData.map((item, index) => (
          <BreadcrumbItem
            key={item.label}
            className={cn(
              'relative flex items-center text-xs font-bold uppercase px-2 py-1.5 border border-black hover:bg-dark hover:text-light active:outline-none',
              index === 0 && 'bg-white hover:border-light rounded-full',
              index > 0 && !item.current && 'bg-white hover:border-light rounded-r-full -ml-6 pl-7',
              item.current && 'bg-black text-white rounded-r-full select-none -ml-6 pl-7'
            )}
            style={{ zIndex: breadcrumbData.length - index }}
          >
            {item.dropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-foreground uppercase outline-none select-none">
                  {item.label}
                  <FontAwesomeIcon icon={faChevronDown} className="h-2 w-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {item.dropdown.map((dropdownItem) => (
                    <DropdownMenuItem key={dropdownItem.label}>{dropdownItem.label}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.current ? (
              <span className="text-white">{item.label}</span>
            ) : (
              <BreadcrumbLink
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className="hover:text-foreground rounded-md"
              >
                {item.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

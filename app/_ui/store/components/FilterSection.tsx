'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../global/components/DropdownMenu';
import { Button, buttonVariants } from '../../global/components/Button';
import cn from 'classnames';
import { Input } from '../../global/components/Input';

interface DropdownOption {
  label: string;
  value: string;
}

interface FilterSectionProps {
  title: string;
  totalItems: number;
  itemsLabel: string;
  sortOptions: DropdownOption[];
  categoryOptions: DropdownOption[];
  priceRange: {
    min: number;
    max: number;
  };
  onSortChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  onPriceChange?: (min: number, max: number) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  totalItems,
  itemsLabel,
  sortOptions,
  categoryOptions,
  priceRange,
  onSortChange,
  onCategoryChange,
}) => {
  const [sortLabel, setSortLabel] = useState(sortOptions[0]?.label ?? 'Sort');
  const [categoryLabel, setCategoryLabel] = useState(categoryOptions[0]?.label ?? 'Category');

  const renderDropdown = (
    options: DropdownOption[],
    defaultLabel: string,
    setLabel: React.Dispatch<React.SetStateAction<string>>,
    onChange?: (value: string) => void
  ) => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className={cn(
            buttonVariants({ variant: 'secondary' }),
            'relative flex h-fit justify-center items-center transition-all rounded overflow-hidden text-nowrap group/btn reflect-none'
          )}
        >
          <span className={cn('relative flex items-center justify-center z-[5] gap-2 transition-colors duration-300')}>
            {defaultLabel}
            <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
          </span>
          <span
            className={
              'absolute inset-0 transform scale-y-0 transition-all duration-300 ease-out origin-bottom group-hover/btn:scale-y-100 bg-dark'
            }
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-light !text-base !rounded-lg border-dark">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="!text-base font-semibold !px-4 hover:bg-dark hover:text-light !cursor-pointer"
            onClick={() => {
              setLabel(option.label);
              if (onChange) onChange(option.value);
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="flex flex-col w-full px-5 font-semibold">
      <div className="flex items-center justify-between gap-2">
        <div className="text-black text-[64px] font-extrabold tracking-tighter text-nowrap">{title}</div>
        <Button variant="primary" selected>
          Filtros:
        </Button>
        <div className="overflow-x-auto pt-3 pb-1 px-1 scrollbar">
          <div className="flex items-center gap-2 min-w-fit w-screen">
            {renderDropdown(sortOptions, sortLabel, setSortLabel, onSortChange)}
            <div className="flex items-center px-3 py-2 bg-white rounded border border-black select-none gap-2.5">
              <div className="text-black">PRECIO:</div>
              <div className="text-gray-400">DESDE</div>
              <Input
                type="price"
                placeholder={priceRange.min.toString()}
                className="w-28 !p-0 text-center text-black"
              />
              <div className="text-gray-400">HASTA</div>
              <Input
                type="price"
                placeholder={priceRange.max.toString()}
                className="w-28 !p-0 text-center text-black"
              />
            </div>
            {renderDropdown(categoryOptions, categoryLabel, setCategoryLabel, onCategoryChange)}
            {renderDropdown(categoryOptions, categoryLabel, setCategoryLabel, onCategoryChange)}
            {renderDropdown(categoryOptions, categoryLabel, setCategoryLabel, onCategoryChange)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="text-primary">{totalItems}</div>
          <div className="text-dark">{itemsLabel}</div>
        </div>
      </div>
    </div>
  );
};

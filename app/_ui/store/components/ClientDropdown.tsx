import React from 'react';
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

interface DropdownOption {
  label: string;
  value: string;
}

interface ClientDropdownProps {
  options: DropdownOption[];
  defaultLabel: string;
  onChange?: (value: string) => void;
}

const ClientDropdown: React.FC<ClientDropdownProps> = ({ options, defaultLabel, onChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="relative flex h-fit justify-center items-center transition-all rounded overflow-hidden group/btn reflect-none"
        >
          <span className="relative flex items-center justify-center z-10 gap-2 transition-colors duration-300">
            {defaultLabel}
            <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
          </span>
          <span className="absolute inset-0 transform scale-y-0 transition-all duration-300 ease-out origin-bottom group-hover/btn:scale-y-100 bg-dark" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-light !text-base !rounded-lg border-dark">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className="!text-base font-semibold !px-4 hover:bg-dark hover:text-light !cursor-pointer"
            /* onClick={() => onChange && onChange(option.value)} */
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ClientDropdown;

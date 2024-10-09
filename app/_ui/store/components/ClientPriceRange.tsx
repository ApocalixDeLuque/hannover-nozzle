import React from 'react';
import { Input } from '../../global/components/Input';

interface ClientPriceRangeProps {
  min: number;
  max: number;
  onPriceChange?: (min: number, max: number) => void;
}

const ClientPriceRange: React.FC<ClientPriceRangeProps> = ({ min, max, onPriceChange }) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value, 10);
    onPriceChange && onPriceChange(newMin, max);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10);
    onPriceChange && onPriceChange(min, newMax);
  };

  return (
    <div className="flex items-center px-3 py-2 bg-white rounded border border-black select-none gap-2.5">
      <div className="text-black">PRECIO:</div>
      <div className="text-gray-400">DESDE</div>
      <Input type="number" value={min} onChange={handleMinChange} className="w-28 !p-0 text-center text-black" />
      <div className="text-gray-400">HASTA</div>
      <Input type="number" value={max} onChange={handleMaxChange} className="w-28 !p-0 text-center text-black" />
    </div>
  );
};

export default ClientPriceRange;

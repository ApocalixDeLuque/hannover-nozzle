import React from 'react';
import { TagType } from '../global/Tag';
import { StoreItem } from './components/StoreItem';

interface Product {
  title: string;
  price: number;
  image: string;
  tags: Array<{ type: TagType; value?: string }>;
}

interface DisplayedProductsProps {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
}

export function DisplayedProducts({ products, currentPage, itemsPerPage }: DisplayedProductsProps): JSX.Element {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col w-full px-5">
      {chunk(currentProducts, 3).map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full justify-between items-stretch border-t border-t-dark">
          {row.map((product, colIndex) => (
            <React.Fragment key={`${rowIndex}-${colIndex}`}>
              <div className="flex-1">
                <StoreItem title={product.title} price={product.price} image={product.image} tags={product.tags} />
              </div>
              {colIndex < 2 && <div className="flex flex-col w-px bg-dark" />}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

// Helper function to split array into chunks
function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
}

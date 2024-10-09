'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '../../global/components/Pagination';
import { useLenis } from '@studio-freight/react-lenis';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function CustomPagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
  const lenis = useLenis();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
    if (pageNumber !== currentPage) {
      lenis?.scrollTo(0);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPages = [1];
      const endPages = [totalPages];

      const pages = [];
      if (currentPage > 4) {
        pages.push('...');
      }

      const sidePages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2].filter(
        (page) => page > 1 && page < totalPages
      );

      pages.push(...sidePages);

      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      pageNumbers.push(...startPages, ...pages, ...endPages);
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col gap-4">
      <Pagination className="flex justify-center gap-2">
        <PaginationContent>
          {renderPageNumbers().map((number, index) => (
            <PaginationItem key={index}>
              {number === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink isActive={currentPage === number} onClick={() => handlePageChange(number as number)}>
                  {number}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
      <p className="flex flex-col text-center text-[64px] leading-[100%] tracking-tight font-extrabold">
        <span>HAS VISTO</span>
        <span>
          <span className="text-red-500">{endIndex}</span> DE <span className="text-red-500">{totalItems}</span> MODELOS
        </span>
      </p>
    </div>
  );
}

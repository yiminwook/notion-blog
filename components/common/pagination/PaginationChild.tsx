'use client';
import { PAGINATION_RANGE } from '@/consts';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import Link from 'next/link';
import { useLocation } from '@/hooks/useLocation';
import { ReactNode } from 'react';

export const FirstLink = ({ currentPage }: { currentPage: number }) => {
  const disabled = currentPage === 1;
  return (
    <PaginationItem
      currentPage={0}
      nextPage={1}
      disabled={disabled}
      value={<MdKeyboardDoubleArrowLeft size="1rem" color="inherit" />}
    />
  );
};

export const BeforeLink = ({ initialPage }: { initialPage: number | null; totalPage: number }) => {
  if (initialPage === null) return null;
  const disabled = initialPage === 1;

  return (
    <PaginationItem
      currentPage={0}
      nextPage={initialPage - PAGINATION_RANGE}
      disabled={disabled}
      value={<MdKeyboardArrowLeft size="1rem" color="inherit" />}
    />
  );
};

export const AfterLink = ({ initialPage, totalPage }: { initialPage: number | null; totalPage: number }) => {
  if (initialPage === null) return null;
  const disabled = totalPage < initialPage + 1 + PAGINATION_RANGE;

  return (
    <PaginationItem
      currentPage={0}
      nextPage={initialPage + PAGINATION_RANGE}
      disabled={disabled}
      value={<MdKeyboardArrowRight size="1rem" color="inherit" />}
    />
  );
};

export const LastLink = ({ currentPage, totalPage }: { currentPage: number; totalPage: number }) => {
  const disabled = currentPage === totalPage;
  return (
    <PaginationItem
      nextPage={totalPage}
      currentPage={currentPage}
      value={<MdKeyboardDoubleArrowRight size="1rem" color="inherit" />}
      disabled={disabled}
    />
  );
};

interface PaginationItemProps {
  currentPage: number;
  nextPage: number | null; //이동할 페이지
  value: ReactNode;
  disabled?: boolean;
}

export const PaginationItem = ({ nextPage, currentPage, value, disabled }: PaginationItemProps) => {
  const location = useLocation();

  if (nextPage === undefined || nextPage === null) {
    return null;
  }

  return (
    <li>
      <Link
        href={`${location}/page/${nextPage}`}
        className={`block px-4 py-2 rounded-lg  hover:text-black hover:font-semibold ${
          nextPage === currentPage ? 'bg-gray-100 text-black pointer-events-none' : 'text-gray-500'
        } ${disabled ? 'bg-transparent text-gray-400 pointer-events-none' : ''}`}
      >
        {value}
      </Link>
    </li>
  );
};

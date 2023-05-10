'use client';

import { PAGENATION_RANGE } from '@/consts';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PaginationProps {
  totalPage: number;
}

const Pagination = ({ totalPage }: PaginationProps) => {
  const params = useParams();
  const currentPage = Number(params?.page) || 1; //NaN일때 1로 변환
  const pages = Array.from({ length: PAGENATION_RANGE }, (_, i) => currentPage - PAGENATION_RANGE + i + 3).filter(
    (page) => page > 0 && totalPage >= page,
  );

  return (
    <div>
      <ul className="flex gap-2 justify-center items-center">
        <li>
          <PaginationItem to={currentPage - 1} value="&lt;" disabled={currentPage === 1} />
        </li>
        {pages.map((page) => (
          <PaginationItem key={page} to={page} value={page} active={page === currentPage} />
        ))}
        <li>
          <PaginationItem to={currentPage + 1} value="&gt;" disabled={currentPage === totalPage} />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

interface PaginationItemProps {
  to: number;
  value: ReactNode;
  disabled?: boolean;
  active?: boolean;
}

const PaginationItem = ({ to, value, disabled = false, active = false }: PaginationItemProps) => {
  const pathname = usePathname();
  const params = useParams();
  const extendedPathname = params?.page
    ? pathname!.replace(/\/page\/(\d+)/, `/page/${to}`)
    : `${pathname!.endsWith('/') ? pathname : pathname + '/'}page/${to}`;

  return (
    <Link href={extendedPathname}>
      <button
        className={`px-4 py-2 rounded-lg  hover:text-black hover:font-semibold disabled:text-gray-400 disabled:cursor-not-allowed ${
          active ? 'bg-gray-100 text-black' : 'text-gray-500'
        }`}
        disabled={disabled}
        tabIndex={-1}
      >
        {value}
      </button>
    </Link>
  );
};

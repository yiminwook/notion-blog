import { PAGENATION_RANGE } from '@/consts/const';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

interface PaginationProps {
  totalPage: number;
}

const Pagination = ({ totalPage }: PaginationProps) => {
  const { query } = useRouter();
  const currentPage = Number(query.page) || 1; //NaN일때 1로 변환
  const pages = Array.from({ length: PAGENATION_RANGE }, (_, i) => currentPage - PAGENATION_RANGE + i + 3).filter(
    (page) => page > 0 && totalPage >= page,
  );
  return (
    <div className="w-4/5 mx-auto">
      <ul className="flex justify-between gap-2">
        <li>
          <PaginationItem to={currentPage - 1} value="&lt;" />
        </li>
        {pages.map((page) => (
          <PaginationItem key={page} to={page} value={page} active={page === currentPage} />
        ))}
        <li>
          <PaginationItem to={currentPage + 1} value="&gt;" />
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
  const { pathname, query } = useRouter();
  const paginationRoute = '/page/[page]';
  const extendedPathname =
    pathname.indexOf(paginationRoute) === -1 ? `${pathname.replace(/\/$/, '')}${paginationRoute}` : paginationRoute;

  return (
    <Link href={{ pathname: extendedPathname, query: { ...query, page: to } }}>
      <button
        className={`px-4 py-2  hover:text-black rounded-lg ${
          active ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-100'
        }`}
        disabled={disabled}
      >
        {value}
      </button>
    </Link>
  );
};

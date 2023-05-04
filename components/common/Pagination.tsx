import { PAGENATION_RANGE } from '@/consts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

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
  const { pathname, query } = useRouter();
  const paginationRoute = '/page/[page]';
  const extendedPathname =
    pathname.indexOf(paginationRoute) === -1 ? `${pathname.replace(/\/$/, '')}${paginationRoute}` : pathname;

  return (
    <Link href={{ pathname: extendedPathname, query: { ...query, page: to } }}>
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

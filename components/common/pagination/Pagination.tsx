'use client';
import { useMemo } from 'react';
import {
  AfterLink,
  BeforeLink,
  FirstLink,
  LastLink,
  PaginationItem,
} from '@/components/common/pagination/PaginationChild';
import { ITEMS_PER_PAGE, PAGINATION_RANGE } from '@/consts';
import { useParams } from 'next/navigation';

interface PaginationProps {
  totalLength: number;
}

const Pagination = ({ totalLength }: PaginationProps) => {
  const params = useParams();

  const currentPage = useMemo(() => {
    return Number(params?.page) || 1;
  }, [params]);

  const totalPage = useMemo(() => {
    return Math.ceil(totalLength / ITEMS_PER_PAGE);
  }, [totalLength]);

  let init = (Math.ceil(currentPage / PAGINATION_RANGE) - 1) * PAGINATION_RANGE + 1;
  if (init <= 0) init = 1;

  const pageArray = Array.from(Array(PAGINATION_RANGE), (x, i) => {
    const page = i + init;
    return page > totalPage ? null : page;
  });

  return (
    <ul className="flex gap-2 justify-center items-center">
      <FirstLink currentPage={currentPage} />
      <BeforeLink initialPage={pageArray[0]} totalPage={totalPage} />
      {pageArray.map((page, index) => (
        <PaginationItem key={`pagination-list-${index}`} nextPage={page} currentPage={currentPage} value={page} />
      ))}
      <AfterLink initialPage={pageArray[0]} totalPage={totalPage} />
      <LastLink currentPage={currentPage} totalPage={totalPage} />
    </ul>
  );
};

export default Pagination;

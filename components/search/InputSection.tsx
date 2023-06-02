'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInputSection = () => {
  const [inputValue, setInputValue] = useState('');
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get('query') ?? '';

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    push(`/search?query=${trimmedValue}`);
  };

  useEffect(() => {
    setInputValue(() => searchQuery);
  }, [searchQuery]);

  return (
    <>
      <section>
        <div className="mx-auto py-16 w-4/5">
          <form className="relative" onSubmit={onSubmit}>
            <input
              type="text"
              className="w-full outline-none px-4 py-2 text-xl rounded-xl border-2 border-[var(--search-input-outline)] placeholder:text-center"
              onChange={(e) => setInputValue(() => e.target.value)}
              placeholder="제목을 검색 해주세요"
              value={inputValue}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-xl "
            >
              <AiOutlineSearch size={'1.5rem'} color="var(--search-input-outline)" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SearchInputSection;

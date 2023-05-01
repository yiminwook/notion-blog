import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchInputSection = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    push,
    query: { query },
  } = useRouter();

  const searchQuery = (Array.isArray(query) ? query[0] : query) ?? '';

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
    <section className="bg-black">
      <div className="mx-auto py-16 w-4/5">
        <form className="relative" onSubmit={onSubmit}>
          <input
            type="text"
            className="w-full outline-none px-4 py-2 text-xl rounded-xl"
            onChange={(e) => setInputValue(() => e.target.value)}
            value={inputValue}
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-xl ">
            <AiOutlineSearch size={'1.5rem'} color="gray" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchInputSection;

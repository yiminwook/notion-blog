import { ITEMS_PER_PAGE } from '@/consts';
import CardList from '@/components/card/CardList';
import Pagination from '@/components/common/Pagination';
import { getFirstDatabaseItems } from '@/app/page';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';

interface CardSectionProps {
  cardItems: ParsedDatabaseItemType[];
  totalLength: number;
}

const CardSection = ({ cardItems, totalLength }: CardSectionProps) => {
  return (
    <section>
      <div className="flex flex-col gap-6 py-8 px-4">
        <h3 className="font-bold text-3xl">Posts</h3>
        <CardList cardItems={cardItems} />
        <Pagination totalPage={Math.ceil(totalLength / ITEMS_PER_PAGE)} />
      </div>
    </section>
  );
};

export default CardSection;

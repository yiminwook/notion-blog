import { ITEMS_PER_PAGE } from '@/consts';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import CardList from '@/components/card/card_list';
import Pagination from '@/components/common/pagination';

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

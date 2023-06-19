import CardList from '@/components/card/CardList';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import Pagination from '@/components/common/pagination/Pagination';

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
        <Pagination totalLength={totalLength} />
      </div>
    </section>
  );
};

export default CardSection;

import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import CardList from '../card/card_list';
import Pagination from '../common/pagination';

interface CardSectionProps {
  cardItems: ParsedDatabaseItemType[];
}

const CardSection = ({ cardItems }: CardSectionProps) => {
  return (
    <section>
      <div className="max-w-5xl w-4/5 mx-auto flex-col gap-6 py-8">
        <h3 className="font-bold text-3xl">Posts</h3>
        <CardList cardItems={cardItems} />
        <Pagination />
      </div>
    </section>
  );
};

export default CardSection;

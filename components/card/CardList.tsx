import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import CardItem from '@/components/card/CardItem';

interface CardListProps {
  cardItems: ParsedDatabaseItemType[];
}

const CardList = ({ cardItems }: CardListProps) => {
  if (cardItems === undefined || cardItems.length === 0) {
    return <div className="text-center text-2xl font-bold">No Items Found!</div>;
  }
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cardItems.map((item) => {
        return <CardItem key={item.id} cardItem={item} />;
      })}
    </ul>
  );
};

export default CardList;

import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import CardItem from "./card_item";

interface Props {
  cardItems: ParsedDatabaseItemType[];
}

const CardList = ({ cardItems }: Props) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cardItems.map((item) => {
        return <CardItem key={item.id} cardItem={item} />;
      })}
    </ul>
  );
};

export default CardList;

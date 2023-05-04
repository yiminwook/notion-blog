import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import Image from 'next/image';
import Link from 'next/link';
import TagList from '@/components/card/tag/TagList';
import IconRender from '@/components/card/IconRender';
import { DEFAULT_BULR_BASEURL } from '@/consts';

interface CardItemProps {
  cardItem: ParsedDatabaseItemType;
}

const CardItem = ({ cardItem }: CardItemProps) => {
  const { cover, description, icon, id, published, tags, title, proxy, previewImage } = cardItem;

  return (
    <li className="group h-full flex flex-col shadow-lg rounded-2xl">
      <Link href={`/blog/${id}`} className="block glow relative overflow-hidden aspect-[1.3/1] rounded-t-2xl">
        <Image
          src={proxy.cover ?? cover}
          alt={title}
          placeholder="blur"
          blurDataURL={previewImage?.dataURIBase64 ?? DEFAULT_BULR_BASEURL}
          className="group-hover:scale-105 transition-transform object-cover overflow-hidden"
          fill
        />
      </Link>
      <div className="p-4 flex flex-col gap-4">
        <h4 className="font-bold text-2xl group-hover:text-blue-500 transition-colors flex flex-row items-center gap-2">
          <IconRender icon={icon} alt={title} proxyIconURL={proxy.icon} />
          {title}
        </h4>
        {description ? <p className="font-medium text-gray-600 break-all">{description}</p> : null}
        <time className="font-medium text-gray-700 text-sm">{published}</time>
      </div>
      {tags.length > 0 ? <TagList tags={tags} /> : null}
    </li>
  );
};

export default CardItem;

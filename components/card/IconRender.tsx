import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import Image from 'next/image';

interface IconRenderProps {
  icon: ParsedDatabaseItemType['icon'];
  alt: string;
  proxyIconURL?: ParsedDatabaseItemType['proxy']['icon'];
}

const IconRender = ({ icon, alt, proxyIconURL }: IconRenderProps) => {
  if (!icon) return null;

  if (icon.type === 'emoji') return <span>{icon.emoji}</span>;

  const iconURL = icon.type === 'file' ? icon.file.url : icon.external.url;

  return <Image src={proxyIconURL ?? iconURL} alt={`${alt} icon`} width={24} height={24} className="rounded-full" />;
};

export default IconRender;

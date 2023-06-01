import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import Image from 'next/image';

interface IconRenderProps {
  icon: ParsedDatabaseItemType['icon'];
  alt: string;
  proxyIconURL?: ParsedDatabaseItemType['proxy']['icon'];
}

const IconRender = ({ icon, alt, proxyIconURL }: IconRenderProps) => {
  //아이콘이 없으면 랜더x
  if (!icon) return null;
  //아이콘이 이모지이면 그대로 랜더링
  if (icon.type === 'emoji') return <span className="rounded-full w-7 h-7">{icon.emoji}</span>;
  //아이콘이 외부파일이면 프록시를 통해 가져옴
  const iconURL = icon.type === 'file' ? icon.file.url : icon.external.url;

  return (
    <Image src={proxyIconURL ?? iconURL} alt={`${alt} icon`} width={24} height={24} className="rounded-full w-7 h-7" />
  );
};

export default IconRender;

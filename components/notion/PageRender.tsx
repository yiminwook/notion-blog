'use client';

import { getPageContent } from '@/models/notionClient';
import { NotionRenderer } from 'react-notion-x';
import dynamic, { LoaderComponent } from 'next/dynamic';
import nextLink from 'next/link';
import nextImage from 'next/legacy/image'; //notionRenderer에서 next13/image 미지원
import TagItem from '@/components/card/tag/TagItem';

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code) as LoaderComponent, {
  ssr: false,
});

const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection) as LoaderComponent,
  {
    ssr: false,
  },
);

const Equation = dynamic(
  () => import('react-notion-x/build/third-party/equation').then((m) => m.Equation) as LoaderComponent,
  {
    ssr: false,
  },
);

const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf) as LoaderComponent, {
  ssr: false,
});

const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then((m) => m.Modal), {
  ssr: false,
});

interface NotionPageRenderProps {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
}

const NotionPageRender = ({ recordMap }: NotionPageRenderProps) => {
  const propertyDateValue = ({ data }: any) => {
    const valueDate = data[0][1][0][1].start_date as string;
    const [y, m, d] = valueDate.split('-').map((str) => +str);
    const date = new Date(y, m, d);
    const localDate = date.toLocaleDateString('ko-KR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return localDate;
  };

  const propertySelectValue = ({ option }: any) => {
    if (!option) return;
    const { id, color, value: name } = option;
    return <TagItem key={id} tagItem={{ id, color, name }} />;
  };

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage
      disableHeader
      showTableOfContents
      previewImages={!!recordMap?.preview_images}
      components={{
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
        nextLink,
        nextImage,
        propertyDateValue,
        propertySelectValue,
      }}
    />
  );
};

export default NotionPageRender;

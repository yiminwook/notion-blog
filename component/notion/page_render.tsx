import { getPageContent } from "@/cms/notion_client";
import { NotionRenderer } from "react-notion-x";
import dynamic, { LoaderComponent } from "next/dynamic";
import nextLink from "next/link";
import nextImage from "next/image";
import TagItem from "../card/tag/tag_item";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";

const Code = dynamic(
  () =>
    import("react-notion-x/build/third-party/code").then(
      (m) => m.Code
    ) as LoaderComponent,
  {
    ssr: false,
  }
);

const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection
    ) as LoaderComponent,
  {
    ssr: false,
  }
);

const Equation = dynamic(
  () =>
    import("react-notion-x/build/third-party/equation").then(
      (m) => m.Equation
    ) as LoaderComponent,
  {
    ssr: false,
  }
);

const Pdf = dynamic(
  () =>
    import("react-notion-x/build/third-party/pdf").then(
      (m) => m.Pdf
    ) as LoaderComponent,
  {
    ssr: false,
  }
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
);

interface PageRenderProps {
  recordMap: Awaited<ReturnType<typeof getPageContent>>;
}

const PageRender = ({ recordMap }: PageRenderProps) => {
  const propertyDateValue = ({ data }: any) => {
    const valueDate = data[0][1][0][1].start_date as string;
    const [y, m, d] = valueDate.split("-").map((str) => +str);
    const date = new Date(y, m, d);
    const localDate = date.toLocaleDateString("ko-KR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return localDate;
  };

  const propertySelectValue = ({ option: { id, color, value: name } }: any) => {
    return <TagItem key={id} tagItem={{ id, color, name }} />;
  };

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage
      disableHeader
      showTableOfContents
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

export default PageRender;

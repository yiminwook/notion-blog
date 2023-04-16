import { getPageContent } from "@/cms/notion_client";
import { NotionRenderer } from "react-notion-x";
import dynamic, { LoaderComponent } from "next/dynamic";
import nextLink from "next/link";
import nextImage from "next/image";

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
      }}
    />
  );
};

export default PageRender;

import lqip from 'lqip-modern';
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from 'notion-types';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import { getPageImageUrls } from 'notion-utils';
import { defaultMapImageUrl } from 'react-notion-x';
import axios from 'axios';

export const makePreviewImage = async (url: string) => {
  const response = await axios.get<ArrayBuffer>(url, {
    responseType: 'arraybuffer',
  });

  const buffer = Buffer.from(response.data);

  try {
    const {
      metadata: { dataURIBase64, originalHeight, originalWidth },
    } = await lqip(buffer);

    const result: PreviewImage = {
      dataURIBase64,
      originalHeight,
      originalWidth,
    };

    return result;
  } catch (error) {
    return null;
  }
};

export const insertPreviewImage = async (
  databaseItems: ParsedDatabaseItemType[],
): Promise<ParsedDatabaseItemType[]> => {
  const previewImage = await Promise.all(
    databaseItems.map(async (item) => {
      const { cover } = item;

      const previewImage = await makePreviewImage(cover);

      return {
        ...item,
        previewImage,
      };
    }),
  );
  return previewImage;
};

export const insertPreviewImageToRecordMap = async (recordMap: ExtendedRecordMap): Promise<PreviewImageMap> => {
  const urls = getPageImageUrls(recordMap, {
    mapImageUrl: defaultMapImageUrl,
  });

  const previewImageMap = await Promise.all(urls.map(async (url) => [url, await makePreviewImage(url)]));

  return Object.fromEntries(previewImageMap);
};

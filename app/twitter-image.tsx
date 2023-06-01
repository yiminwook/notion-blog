import makeOgImage from '@/utils/makeOgImage';

export const runtime = 'edge';
/** image:alt */
export const alt = 'Minwook Blog';
/** image:type */
export const contentType = 'image/png';
/** image:width & image:height */
export const size = {
  width: 1200,
  height: 637,
};

const og = async () => await makeOgImage();

export default og;

import { ImageResponse } from 'next/server';

const DEFAULT_TITLE = 'Minwook Blog';
const TITLE_STRING_LENGTH = 20;

const makeOgImage = async (title: string = DEFAULT_TITLE) => {
  try {
    let ogTitle = title ?? DEFAULT_TITLE;
    if (ogTitle.length > TITLE_STRING_LENGTH) ogTitle = title.substring(0, TITLE_STRING_LENGTH) + '...';
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(90deg, rgba(6,182,212,1) 0%, rgba(59,130,246,1) 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem 1rem',
              textAlign: 'center',
              width: '75%',
              height: '80%',
              background: 'white',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '1.5rem',
            }}
          >
            <h1
              style={{
                background: 'linear-gradient(90deg, rgba(6,182,212,1) 0%, rgba(59,130,246,1) 100%)',
                backgroundClip: 'text',
                fontFamily: 'Pretendard Black',
                padding: '1rem',
                color: 'transparent',
                fontSize: '96px',
                wordBreak: 'break-word',
              }}
            >
              {title}
            </h1>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 637,
        fonts: [
          {
            name: 'Pretendard Black',
            data: await fetch(new URL('../fonts/PretendardStd-Black.woff', import.meta.url)).then((res) =>
              res.arrayBuffer(),
            ),
          },
        ],
      },
    );
  } catch (error) {
    console.error(error);
    let status = 500;
    let message = 'Failed to generate the image';
    return new Response(message, { status });
  }
};

export default makeOgImage;

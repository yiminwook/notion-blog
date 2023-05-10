'use client';
import Giscus from '@giscus/react';

const Comments = () => {
  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto my-12">
        <Giscus
          repo="yiminwook/notion-blog"
          repoId="R_kgDOJMXa3A"
          category="giscus"
          categoryId="DIC_kwDOJMXa3M4CWLSm"
          mapping="pathname"
          strict="1"
          reactions-enabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light_high_contrast"
          lang="ko"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Comments;

import Link from 'next/link';

const HeroSection = () => {
  return (
    <section>
      <div className="flex justify-center py-12 text-center m-4 p-4 bg-[color:var(--card-bg-color)] rounded-md backdrop-blur-sm">
        <div className="flex flex-row sm:gap-4 md:gap-10">
          <Link href="/about">
            <div className="relative w-[10rem] h-[10rem] bg-[color:var(--card-bg-color)] rounded-full overflow-hidden hidden sm:block bg-[url('/image/profile.webp')] bg-contain">
              <span className="blind">프로필 이미지</span>
            </div>
          </Link>
          <div className="relative flex flex-col gap-4">
            <h1 className="font-black text-6xl leading-[1.2] break-keep">Hello, World!</h1>
            <p className="font-light text-xl text-gray-800 break-keep md:max-w-xl">
              FE부터 BE, DB까지 서비스 전체를 아우를 수 있는
              <br /> 풀스택 개발자를 목표로 하고 있습니다
            </p>
            <div className="mt-6 sm:hidden">
              <Link
                href="/about"
                className="block mx-auto px-4 py-2 border border-black rounded-3xl font-semibold bg-black text-white w-[7rem] text-center"
              >
                About me
              </Link>
            </div>
            <ul className="absolute flex gap-4 bottom-[-3rem] left-[50%] translate-x-[-50%]">
              <li>
                <Link
                  href="https://github.com/yiminwook"
                  className={
                    'inline-block overflow-hidden p-1 rounded-full border drop-shadow-sm bg-[color:var(--card-bg-color)] after:block after:bg-[url(/image/github.svg)] after:w-[16px] after:h-[16px] after:bg-cover'
                  }
                >
                  <span className="blind">깃허브 주소</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://yiminwook.tistory.com/"
                  className="inline-block overflow-hidden p-1 rounded-full border drop-shadow-sm after:block bg-[color:var(--card-bg-color)] after:bg-[url(https://t1.daumcdn.net/tistory_admin/static/top/pc/img_common_tistory_190314.png)] after:[background-position-x:-29px] after:[background-position-y:-39px] after:w-[16px] after:h-[16px]"
                >
                  <span className="blind">티스토리 주소</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// https://t1.daumcdn.net/tistory_admin/static/top/pc/img_common_tistory_190314.png
// -30px -40px
// width 14px height 16px

import Link from 'next/link';

const HeroSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-8 py-12 w-4/5 max-w-5xl mx-auto text-center md:py-24 md:text-left md:items-start">
        <div className="relative">
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 rotate-45 bg-black w-6 h-6" />
          <span className="font-bold text-white bg-black py-3 px-4 rounded-lg relative">WOW</span>
        </div>
        <h1 className="font-black text-6xl leading-[1.2] break-keep">Hello, World!</h1>
        <p className="font-light text-xl text-gray-400 md:max-w-xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo rem placeat error ducimus optio earum commodi!
          Perspiciatis veniam,
        </p>
        <div>
          <Link href="/about">
            <button className="px-4 py-2 border border-black rounded-3xl font-semibold hover:bg-black hover:text-white">
              About me
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

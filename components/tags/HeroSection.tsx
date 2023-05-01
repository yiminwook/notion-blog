interface TagsHeroSectionProps {
  subTitle?: string;
  title?: string;
}

const TagsHeroSection = ({ subTitle = 'Tags Collection', title = 'All Tags' }: TagsHeroSectionProps) => {
  return (
    <section>
      <div className="px-4 py-16 flex flex-col gap-4">
        <p className="font-medium text-gray-700 text-2xl">{subTitle}</p>
        <h2 className="font-bold text-7xl">{title}</h2>
      </div>
    </section>
  );
};

export default TagsHeroSection;

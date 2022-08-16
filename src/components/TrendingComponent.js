import { TrendingCard } from "./CustomCard";

function TrendingComponent({ title, data }) {
  return (
    <div className='my-4 trending_section'>
      <h2 className='text-xl my-3 font-semibold'>{title}</h2>
      <div className='trending_wrapper flex overflow-x-auto'>
        {data.map((item, index) => {
          return (
            <TrendingCard
              key={index}
              bgImage={item.thumbnail.regular.large}
              title={item.title}
              year={item.year}
              category={item.category}
              rating={item.rating}
              isBookmarked={item.isBookmarked}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TrendingComponent;

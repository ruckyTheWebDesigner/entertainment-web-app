import { RecommendedCard } from "./CustomCard";

function RecommendedComponent({ title, data }) {
  return (
    <div className='recommended_section'>
      <h2 className='text-xl my-3 font-semibold'>{title}</h2>
      <div className='recommended_wrapper'>
        {data.map((item, index) => {
          return (
            <RecommendedCard
              key={index}
              bgImage={`url(${item.thumbnail.regular.large})`}
              title={item.title}
              year={item.year}
              category={item.category}
              rating={item.rating}
              visiblePlayButton={true}
              isBookmarked={item.isBookmarked}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RecommendedComponent;

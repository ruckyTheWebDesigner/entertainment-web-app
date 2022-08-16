import React from "react";
import { RecommendedCard } from "./CustomCard";

function SearchResult({ numbersofresult, searchresult, search }) {
  return (
    <div className='p-3'>
      <h2 className='mb-3'>
        Found {numbersofresult} results for "{search}"
      </h2>
      {numbersofresult > 0 && (
        <div className='search_result'>
          {searchresult.map((item, index) => {
            return (
              <RecommendedCard
                className=''
                key={index}
                bgImage={`url(${item.thumbnail.regular.large})`}
                title={item.title}
                year={item.year}
                category={item.category}
                rating={item.rating}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchResult;

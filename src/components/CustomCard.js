import { Box, Card } from "@mui/material";
import React from "react";

import PlayButton from "./PlayButton";

import emptyIconBookmark from "../assets/icon-bookmark-empty.svg";
import fulIconBookmark from "../assets/icon-bookmark-full.svg";

export function TrendingCard({
  bgImage,
  title,
  year,
  category,
  rating,
  isBookmarked,
}) {
  const [showPlayButton, setShowPlayButton] = React.useState(false);

  return (
    <>
      <Box
        onMouseEnter={() => setShowPlayButton(true)}
        onMouseLeave={() => setShowPlayButton(false)}
        sx={{
          minWidth: "350px",
          maxWidth: "500px",
        }}
        className='trending_card hover:cursor-pointer hover:opacity-100 opacity-75 relative'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className='absolute top-2 right-3 bookmarkicon_wrapper'>
          <img
            src={isBookmarked ? fulIconBookmark : emptyIconBookmark}
            alt='bookmark'
            className='icon_bookmark'
          />
        </div>
        <PlayButton showButton={showPlayButton} margin={75} />
        <div className='trending_card_content absolute bottom-2 left-3  text-white '>
          <div className='flex items-center '>
            <h6>{year}</h6>
            <span className='dot'></span>
            {category === "Movie" ? (
              <svg className='ml-3 w-5 h-6' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z'
                  fill='inherit'
                />
              </svg>
            ) : (
              <svg className='ml-3 w-5 h-6' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z'
                  fill='inherit'
                />
              </svg>
            )}
            <h6 className='mx-3'>{category}</h6>
            <h6>{rating}</h6>
          </div>
          <h1 className='text-lg font-semibold'>{title}</h1>
        </div>
      </Box>
    </>
  );
}

export function RecommendedCard({
  bgImage,
  title,
  year,
  category,
  rating,
  isBookmarked,
}) {
  const [showPlayButton, setShowPlayButton] = React.useState(false);

  return (
    <Box
      onMouseEnter={() => setShowPlayButton(true)}
      onMouseLeave={() => setShowPlayButton(false)}
      className='hover:cursor-pointer hover:opacity-100 opacity-75 relative'>
      <Card
        className='div w-75 h-56 '
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className='flex justify-end mr-4 mt-3 '>
          <div className='bookmarkicon_wrapper '>
            <img
              src={isBookmarked ? fulIconBookmark : emptyIconBookmark}
              alt='bookmark'
            />
          </div>
        </div>
        <PlayButton showButton={showPlayButton} margin={45} />
      </Card>
      <div className='trending_card_content my-3 '>
        <div className='flex items-center'>
          <h6>{year}</h6>
          <span className='dot'></span>
          {category === "Movie" ? (
            <svg className='ml-3 w-5 h-6' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z'
                fill='inherit'
              />
            </svg>
          ) : (
            <svg className='ml-3 w-5 h-6' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z'
                fill='inherit'
              />
            </svg>
          )}
          <h6 className='mx-3'>{category}</h6>
          <h6>{rating}</h6>
        </div>
        <h1 className='text-base font-semibold'>{title}</h1>
      </div>
    </Box>
  );
}

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
          <div className='flex '>
            <h6>{year}</h6>
            <h6 className='mx-3'>{category}</h6>
            <h6>{rating}</h6>
          </div>
          <h1 className='text-xl font-semibold'>{title}</h1>
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
        <div className='flex'>
          <h6>{year}</h6>
          <h6 className='mx-3'>{category}</h6>
          <h6>{rating}</h6>
        </div>
        <h1 className='text-lg font-semibold'>{title}</h1>
      </div>
    </Box>
  );
}

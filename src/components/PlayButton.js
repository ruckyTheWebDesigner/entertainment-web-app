import React from "react";

import playicon from "../assets/icon-play.svg";

function PlayButton({ showButton, margin }) {
  return (
    <>
      {showButton && (
        <div
          className='flex justify-center playbutton_wrapper'
          style={{
            marginTop: margin,
          }}>
          <img src={playicon} className='play_button' alt='play' />
          <h1 className='text-xl font-semibold ml-2 text-white'>Play</h1>
        </div>
      )}
    </>
  );
}

export default PlayButton;

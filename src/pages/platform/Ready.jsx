// Copyright (C) 2019 Alina Inc. All rights reserved.
import React, { useEffect, useState } from 'react';

const Ready = () => {
  const [seconds, setSeconds] = useState(3);
  useEffect(() => {
    let interval = null;
    if (seconds > 1) {
      interval = setInterval(() => {
        setSeconds(n => n - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  // FIXME 게임제목 to real game name for each game
  // FIXME 한줄설명to real game explanation for each game
  return (
    <div>
      <h1> 게임 제목 </h1>
      <div>{seconds}</div>
      <div> 한줄설명 </div>
    </div>
  );
};

export default Ready;

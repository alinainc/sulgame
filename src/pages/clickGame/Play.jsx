// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

import clickGame from '../../messages/clickGame';

const Play = () => {
  const [clickCount, setClickCount] = useState(0);
  const defalutSecond = 10;
  const [seconds, setSeconds] = useState(defalutSecond);
  const [buttonState, setButtonState] = React.useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    const sec = defalutSecond * 1000;
    setTimeout(() => {
      setButtonState(true);
      clearInterval(id);
    }, sec);
  }, [defalutSecond]);

  const onClickButton = () => {
    const click = clickCount + 1;
    setClickCount(click);
  };

  return (
    <div>
      <h2>{clickGame.title}</h2>
      <p>{`${clickGame.time}: ${seconds}`}</p>
      <p>{`${clickGame.score}: ${clickCount}`}</p>
      <Button type="button" onClick={onClickButton} disabled={buttonState}>
        {clickGame.button}
      </Button>
    </div>
  );
};

export default Play;

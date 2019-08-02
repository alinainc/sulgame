// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap';

import { button, chooseGame } from '../../../messages';
import ChoiceList from './ChoiceList';

const Test = () => {
  const [seconds, setSeconds] = useState(3);
  const [buttonState, setButtonState] = useState(false);
  const resultRef = useRef(Math.floor(Math.random() * 2 + 1));
  const choiceRef = useRef(ChoiceList[Math.floor(Math.random() * ChoiceList.length)]);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    setTimeout(() => {
      setButtonState(true);
      clearInterval(id);
    }, 3000);
  }, []);

  const onButtonClick = ({ target: { value } }) => {
    resultRef.current = value;
  };

  return (
    <div className="container">
      <h2>{chooseGame.title}</h2>
      <p>{chooseGame.description}</p>
      <p>{`${chooseGame.time}: ${seconds}`}</p>
      <h6>{choiceRef.current}</h6>
      <Button disabled={buttonState} onClick={onButtonClick} size="lg" value="1">{button.A}</Button>
      <Button disabled={buttonState} onClick={onButtonClick} size="lg" value="2">{button.B}</Button>
    </div>
  );
};

export default Test;

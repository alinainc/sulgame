// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button, Row } from 'reactstrap';

import { sequenceGame } from '../../messages';

const Sequence = () => {
  const intervalRef = React.useRef();
  const answerRef = React.useRef(1);
  const [isClicked] = React.useState(Array(9).fill(false));
  const [milliseconds, setMilliseconds] = React.useState(0);
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setMilliseconds(s => s + 1);
    }, 100);
    intervalRef.current = intervalId;
  }, []);

  const onButtonClick = ({ target: { value } }) => {
    if (Number(value) === answerRef.current && answerRef.current < 9) {
      answerRef.current += 1;
      isClicked[value - 1] = true;
      setResult(sequenceGame.result.playing);
    } else if (Number(value) !== answerRef.current) {
      setResult(sequenceGame.result.fail);
    } else {
      clearInterval(intervalRef.current);
      isClicked[value - 1] = true;
      setResult(sequenceGame.result.success);
    }
  };

  const createShuffledArray = () => {
    const array = Array.from(Array(9)).map((e, i) => i + 1);
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const arrayRef = React.useRef(createShuffledArray());

  const createButtons = (index) => {
    const buttons = [];
    for (let i = 0; i < 3; i += 1) {
      buttons.push(
        <Button
          key={index[i]}
          value={index[i]}
          onClick={onButtonClick}
          disabled={isClicked[index[i] - 1]}
        >
          {index[i]}
        </Button>,
      );
    }
    return buttons;
  };

  const createGameBoard = () => {
    const gameBoard = [];
    for (let i = 0; i < 3; i += 1) {
      gameBoard.push(<Row key={i}>{createButtons(arrayRef.current.slice(i * 3, i * 3 + 3))}</Row>);
    }
    return gameBoard;
  };

  return (
    <div className="container">
      <h2>{sequenceGame.title}</h2>
      <Row>{`${sequenceGame.time}: ${milliseconds}`}</Row>
      <Row>{`${sequenceGame.result.title}: ${result}`}</Row>
      {createGameBoard()}
    </div>
  );
};

export default Sequence;

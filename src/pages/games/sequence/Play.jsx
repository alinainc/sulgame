// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Row } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { sequenceGame } from '../../../messages';
import shapes from '../../../shapes';

const Play = ({ match: { params: { roomId, userId } } }) => {
  const intervalRef = useRef();
  const answerRef = useRef(1);
  const [isClicked] = useState(Array(9).fill(false));
  const [milliseconds, setMilliseconds] = useState(0);
  const [result, setResult] = useState('');

  useEffect(() => {
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

  const arrayRef = useRef(createShuffledArray());

  const createButtons = (index) => {
    const buttons = [];
    for (let i = 0; i < 3; i += 1) {
      buttons.push(
        <Button
          disabled={isClicked[index[i] - 1]}
          key={index[i]}
          onClick={onButtonClick}
          size="lg"
          value={index[i]}
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

  if (result === sequenceGame.result.success) {
    return (
      <Fragment>
        <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host/`} type="update">
          {({ runMutation }) => {
            runMutation({ replay: 0 });
            return null;
          }}
        </FirebaseDatabaseMutation>
        <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/${userId}`} type="update">
          {({ runMutation }) => {
            runMutation({ end: 1, gameData: milliseconds || 0 });
            if (userId === 'host') {
              return <Redirect to={`/platform/ranking/${roomId}/user/host`} />;
            }
            return <Redirect to={`/platform/ranking/${roomId}/user/${userId}`} />;
          }}
        </FirebaseDatabaseMutation>
      </Fragment>
    );
  }

  return (
    <div className="container">
      <h2>{sequenceGame.title}</h2>
      <p>{sequenceGame.description}</p>
      <p>{`${sequenceGame.time}: ${milliseconds}`}</p>
      <p>{`${sequenceGame.result.title}: ${result}`}</p>
      {createGameBoard()}
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

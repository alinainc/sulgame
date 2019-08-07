// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Row } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { sequenceGame } from '../../../messages';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';

const Play = ({ match: { params: { roomId, userId } } }) => {
  const intervalRef = useRef();
  const answerRef = useRef(1);
  const [isClicked] = useState(Array(9).fill(false));
  const [milliseconds, setMilliseconds] = useState(0);
  const [loadSeconds, setLoadSeconds] = useState(3);
  const [result, setResult] = useState('');
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    const load = setInterval(() => {
      setLoadSeconds(s => s - 1);
    }, 1000);

    setTimeout(() => {
      setGameStart(true);
      clearInterval(load);

      const intervalId = setInterval(() => {
        setMilliseconds(s => s + 1);
      }, 100);

      intervalRef.current = intervalId;
    }, 3000);
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
          classes={{ disabled: 'sequence button disabled' }}
          className="sequence button"
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
      gameBoard.push(
        <Row className="game-board" key={i}>
          {createButtons(arrayRef.current.slice(i * 3, i * 3 + 3))}
        </Row>,
      );
    }
    return gameBoard;
  };

  if (result === sequenceGame.result.success) {
    return (
      <>
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
      </>
    );
  }

  return (
    <div className={!gameStart ? 'game-backdrop' : 'game-container'}>
      {!gameStart
        ? (
          <Ready
            description={sequenceGame.description}
            gameStart={gameStart}
            seconds={loadSeconds}
            title={sequenceGame.title}
          />
        )
        : null
      }
      <h1 className="game-header">{sequenceGame.title}</h1>
      <div className="game-body">
        <p className="sequence-body">{sequenceGame.description}</p>
        <p>{`${sequenceGame.time}: ${milliseconds}`}</p>
        <p className="sequence-body">{`${sequenceGame.result.title}: ${result}`}</p>
        {createGameBoard()}
      </div>
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

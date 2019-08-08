// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { sequenceGame } from '../../../messages';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';

const Play = ({ match: { params: { roomId, userId } } }) => {
  const answerRef = useRef(1);
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const [isClicked] = useState(Array(9).fill(false));
  const [milliseconds, setMilliseconds] = useState(0);
  const [loadSeconds, setLoadSeconds] = useState(3);
  const [result, setResult] = useState('');
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (userId) {
      firebase.database()
        .ref(`/rooms/${roomId}/players/${userId}`)
        .update({ gameData: null });
    }
  }, [roomId, userId]);
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

    timeoutRef.current = setTimeout(() => {
      setMilliseconds(sequenceGame.result.timeOut);
      setGameOver(true);
      clearInterval(intervalRef.current);
    }, 13100);
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
      clearTimeout(timeoutRef.current);
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
        <button
          type="button"
          id="sequence-button"
          disabled={isClicked[index[i] - 1]}
          key={index[i]}
          onClick={onButtonClick}
          value={index[i]}
        >
          {index[i]}
        </button>,
      );
    }
    return buttons;
  };

  const createGameBoard = () => {
    const gameBoard = [];
    for (let i = 0; i < 3; i += 1) {
      gameBoard.push(
        <div className="game-board" key={i}>
          {createButtons(arrayRef.current.slice(i * 3, i * 3 + 3))}
        </div>,
      );
    }
    return gameBoard;
  };

  if (result === sequenceGame.result.success || gameOver) {
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
            runMutation({ end: 1, gameData: milliseconds });
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
    <div className={!gameStart ? 'game game-backdrop' : 'game game-container'}>
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
      <h1>{sequenceGame.title}</h1>
      <p className="description">{sequenceGame.description}</p>
      <p className="time">{`${sequenceGame.time}: ${milliseconds}`}</p>
      <p className="time">{`${sequenceGame.result.title}: ${result}`}</p>
      <div>
        {createGameBoard()}
      </div>
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

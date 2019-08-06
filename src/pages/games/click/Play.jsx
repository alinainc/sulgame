// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import clickGame from '../../../messages/clickGame';
import shapes from '../../../shapes';
import InitWithMount from '../../components/InitWithMount';
import Ready from '../../components/Ready';

const Play = ({ match: { params: { roomId, userId } } }) => {
  const [clickCount, setClickCount] = useState(0);
  const gameSeconds = 10;
  const totalSeconds = 13;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [buttonState, setButtonState] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const initGameData = () => {
    if (userId) {
      return (
        <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/${userId}`} type="update">
          {({ runMutation }) => {
            const initData = () => runMutation({ connect: 0, gameData: 0 });
            return <InitWithMount init={initData} />;
          }}
        </FirebaseDatabaseMutation>
      );
    }
    return null;
  };

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    const sec = totalSeconds * 1000;
    const loadSec = (totalSeconds - gameSeconds) * 1000;

    setTimeout(() => {
      setGameStart(true);
    }, loadSec);

    setTimeout(() => {
      setButtonState(true);
      clearInterval(id);
    }, sec);
  }, [gameSeconds]);

  if (buttonState) {
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
            runMutation({ connect: 1, gameData: clickCount || 0 });
            if (userId === 'host') {
              return <Redirect to={`/platform/ranking/${roomId}/user/host`} />;
            }
            return <Redirect to={`/platform/ranking/${roomId}/user/${userId}`} />;
          }}
        </FirebaseDatabaseMutation>
      </>
    );
  }

  const onClickButton = () => {
    const click = clickCount + 1;
    setClickCount(click);
  };

  return (
    <div className={!gameStart ? 'game-backdrop' : 'game-container'}>
      {!gameStart
        ? (
          <Ready
            description={clickGame.description}
            gameStart={gameStart}
            seconds={seconds - gameSeconds}
            title={clickGame.title}
          />
        )
        : null
      }
      {initGameData()}
      <h5 className="game-header">{clickGame.title}</h5>
      <div className="game-body">
        <p>{`${clickGame.time}: ${seconds > gameSeconds ? gameSeconds : seconds}`}</p>
        <p>{`${clickGame.score}: ${clickCount}`}</p>
        <Button type="button" onClick={onClickButton} disabled={buttonState}>
          {clickGame.button}
        </Button>
      </div>
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

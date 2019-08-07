// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import clickGame from '../../../messages/clickGame';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';

const Play = ({ match: { params: { roomId, userId } } }) => {
  const [clickCount, setClickCount] = useState(0);
  const gameSeconds = 10;
  const totalSeconds = 13;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [buttonState, setButtonState] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    if (userId) {
      firebase.database()
        .ref(`/rooms/${roomId}/players/${userId}`)
        .update({ gameData: 0 });
    }
  }, [roomId, userId]);
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
            runMutation({ gameData: clickCount || 0 });
            if (userId === 'host') {
              return <Redirect to={`/platform/ranking/${roomId}/user/host`} />;
            }
            return <Redirect to={`/platform/ranking/${roomId}/user/${userId}`} />;
          }}
        </FirebaseDatabaseMutation>
      </>
    );
  }

  const onClickButton = (e) => {
    e.preventDefault();
    const click = clickCount + 1;
    setClickCount(click);
  };

  return (
    <div className={!gameStart ? 'game game-backdrop' : 'game game-container'}>
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
      <h1>{clickGame.title}</h1>
      <p className="description">
        {`${clickGame.time}: ${seconds > gameSeconds ? gameSeconds : seconds}`}
      </p>
      <p className="time">{`${clickGame.score}: ${clickCount}`}</p>
      <div>
        <Button
          className="clickgame button"
          type="button"
          onClick={onClickButton}
          disabled={buttonState}
        >
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

// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useIntl } from 'react-intl';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import 'react-circular-progressbar/dist/styles.css';
import { messages, t } from '../../../i18n';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';

const Play = ({ history, location, match: { params: { roomId, userId } } }) => {
  const intl = useIntl();
  const gameSeconds = 7;
  const waitingSeconds = 3;
  const finalSecond = useRef(0);
  const [seconds, setSeconds] = useState(waitingSeconds);
  const [centisecond, setCentisecond] = useState(gameSeconds);
  const [gameStart, setGameStart] = useState(false);
  const [modalFinished, setModalFinished] = useState(false);
  const secRef = useRef();

  useEffect(() => {
    if (userId === 'host') {
      (async () => {
        const players = await firebase.database()
          .ref(`/rooms/${roomId}/players`)
          .once('value');
        await firebase.database()
          .ref('/statistics/plays')
          .push({
            gametype: 'stop',
            playerCount: Object.values(players.val()).length,
            time: new Date(Date.now()).toString(),
          });
      })();
    }
  }, [roomId, userId]);
  useEffect(() => {
    if (userId) {
      firebase.database()
        .ref(`/rooms/${roomId}/players/${userId}`)
        .update({ gameData: null });
    }
  }, [roomId, userId]);

  useEffect(() => {
    if (modalFinished) {
      secRef.current = setInterval(() => {
        setCentisecond(s => (s - 0.01).toFixed(2));
      }, 10);
    }
  }, [modalFinished]);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    setTimeout(() => {
      setGameStart(true);
      setModalFinished(true);
      clearInterval(id);
    }, waitingSeconds * 1000);
  }, [history, location.pathname]);

  finalSecond.current = centisecond;
  const renderStopButton = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/${userId}`} type="update">
      {({ runMutation }) => (
        <button
          id="stop-button"
          type="button"
          onClick={() => {
            firebase.database()
              .ref(`/rooms/${roomId}/players/host`)
              .update({ replay: 0 });
            clearInterval(secRef.current);
            runMutation({ gameData: finalSecond.current === '0.00' ? 1000 : finalSecond.current });
            setTimeout(() => {
              if (userId === 'host') {
                history.push(`/platform/ranking/${roomId}/user/host`);
              }
              history.push(`/platform/ranking/${roomId}/user/${userId}`);
            }, 1000);
          }}
        >
          Stop!
        </button>
      )
      }
    </FirebaseDatabaseMutation>
  );

  if (centisecond <= 0) {
    clearInterval(secRef.current);
    firebase.database()
      .ref(`/rooms/${roomId}/players/${userId}`)
      .update({ gameData: finalSecond.current === '0.00' ? 1000 : finalSecond.current });
    firebase.database()
      .ref(`/rooms/${roomId}/players/host`)
      .update({ replay: 0 });
    setTimeout(() => {
      if (userId === 'host') {
        history.push(`/platform/ranking/${roomId}/user/host`);
      }
      history.push(`/platform/ranking/${roomId}/user/${userId}`);
    }, 1000);
  }

  return (
    <div className={!gameStart ? 'game game-backdrop' : 'game game-container'}>
      {!gameStart
        ? (
          <Ready
            description={t(intl, messages.stopGame.description)}
            gameStart={gameStart}
            seconds={seconds}
            title={t(intl, messages.stopGame.name)}
          />
        )
        : null
      }
      <h1>{t(intl, messages.stopGame.name)}</h1>
      <CircularProgressbar
        value={(centisecond / 7).toFixed(2)}
        maxValue={1}
        text={`${centisecond} ${t(intl, messages.stopGame.sec)}`}
      />
      <p className="discription">{t(intl, messages.stopGame.description)}</p>
      {renderStopButton()}
    </div>
  );
};


Play.propTypes = {
  history: shapes.history.isRequired,
  location: shapes.location.isRequired,
  match: shapes.match.isRequired,
};

export default Play;

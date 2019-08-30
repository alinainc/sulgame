// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useRef, useState } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { messages, t } from '../../../i18n';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';

const Play = ({ history, location, match: { params: { roomId, userId } } }) => {
  const intl = useIntl();
  const audioUrl = 'https://s1.vocaroo.com/media/download_temp/Vocaroo_s1XlRUvymRaF.mp3';
  /* eslint-disable-next-line no-undef */
  const touchSound = new Audio(audioUrl);
  touchSound.preload = 'auto';
  const answerRef = useRef(1);
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const [isClicked] = useState(Array(9).fill(false));
  const [milliseconds, setMilliseconds] = useState(0);
  const [loadSeconds, setLoadSeconds] = useState(3);
  const [result, setResult] = useState('');
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState('');

  useEffect(() => {
    if (userId === 'host') {
      (async () => {
        const players = await firebase.database()
          .ref(`/rooms/${roomId}/players`)
          .once('value');
        await firebase.database()
          .ref('/statistics/plays')
          .push({
            gametype: 'sequence',
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
      setGameOver(t(intl, messages.sequenceGame.result.timeOut));
      clearInterval(intervalRef.current);
    }, 13100);
  }, [history, intl, location.pathname]);

  const onButtonDown = ({ target: { value } }) => {
    if (Number(value) === answerRef.current && answerRef.current < 9) {
      if (!isMobile || !isIOS) {
        touchSound.play();
      }
      answerRef.current += 1;
      isClicked[value - 1] = true;
      setResult(t(intl, messages.sequenceGame.result.playing));
    } else if (Number(value) !== answerRef.current) {
      setResult(t(intl, messages.sequenceGame.result.fail));
    } else {
      if (!isMobile || !isIOS) {
        touchSound.play();
      }
      isClicked[value - 1] = true;
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      setResult(t(intl, messages.sequenceGame.result.success));
      isClicked[value - 1] = true;
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
          onMouseDown={onButtonDown}
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

  if (result === t(intl, messages.sequenceGame.result.success) || gameOver) {
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
            // FIX ME: temporary fix for sorting logic
            runMutation({ gameData: gameOver === '' ? milliseconds : 1000 });
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
    <div className={!gameStart ? 'game game-backdrop' : 'game'}>
      {!gameStart
        ? (
          <Ready
            description={t(intl, messages.sequenceGame.description)}
            gameStart={gameStart}
            seconds={loadSeconds}
            title={t(intl, messages.sequenceGame.title)}
          />
        )
        : null
      }
      <h1>{t(intl, messages.sequenceGame.title)}</h1>
      <p className="description">{t(intl, messages.sequenceGame.description)}</p>
      <p className="time">{`${t(intl, messages.sequenceGame.time)}: ${milliseconds}`}</p>
      <p className="time">{`${t(intl, messages.sequenceGame.result.title)}: ${result}`}</p>
      <div>
        {createGameBoard()}
      </div>
    </div>
  );
};

Play.propTypes = {
  history: shapes.history.isRequired,
  location: shapes.location.isRequired,
  match: shapes.match.isRequired,
};

export default Play;

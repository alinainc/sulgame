// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { messages, t } from '../../../i18n';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';

const Play = ({ history, location, match: { params: { roomId, userId } } }) => {
  const intl = useIntl();
  const audioUrl = 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0S1F1rL5xH3.mp3';
  /* eslint-disable-next-line no-undef */
  const clickSound = new Audio(audioUrl);
  const [clickCount, setClickCount] = useState(0);
  const gameSeconds = 5;
  const totalSeconds = 8;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [buttonState, setButtonState] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  useEffect(() => {
    if (userId === 'host') {
      firebase.database()
        .ref('/statistics/plays')
        .push({ gametype: 'click', time: new Date(Date.now()).toString() });
    }
  }, [userId]);
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
  }, [gameSeconds, history, location.pathname]);

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
    if (!isMobile || !isIOS) {
      clickSound.play();
    }
    e.preventDefault();
    const click = clickCount + 1;
    setClickCount(click);
  };

  return (
    <div className={!gameStart ? 'game game-backdrop' : 'game game-container'}>
      {!gameStart
        ? (
          <Ready
            description={t(intl, messages.clickGame.description)}
            gameStart={gameStart}
            seconds={seconds - gameSeconds}
            title={t(intl, messages.clickGame.title)}
          />
        )
        : null
      }
      <h1>{t(intl, messages.clickGame.title)}</h1>
      <p className="discription">{t(intl, messages.clickGame.description)}</p>
      <p className="time">
        {`${t(intl, messages.clickGame.time)}: ${seconds > gameSeconds ? gameSeconds : seconds}`}
      </p>
      <p className="time">{`${t(intl, messages.clickGame.score)}: ${clickCount}`}</p>
      <div>
        <button
          id="clickgame-button"
          type="button"
          onClick={onClickButton}
          disabled={buttonState}
        >
          {t(intl, messages.clickGame.button)}
        </button>
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

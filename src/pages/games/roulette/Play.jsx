// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { messages, t } from '@frontend/i18n';
import shapes from '@frontend/shapes';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import Ready from 'components/Ready';

import Roulette from './Roulette';

const Play = ({ history, location, match: { params: { roomId, userId } } }) => {
  const intl = useIntl();
  useEffect(() => {
    if (userId === 'host') {
      firebase.database()
        .ref('/statistics/plays')
        .push({ gametype: 'roulette', time: new Date(Date.now()).toString() });
    }
  }, [userId]);

  const [gameStart, setGameStart] = useState(false);
  useEffect(() => {
    if (userId === 'host') {
      firebase.database()
        .ref(`/rooms/${roomId}/players/host/`)
        .update({
          gameData: null,
        });
    }
  }, [roomId, userId]);

  useEffect(() => {
    setTimeout(() => {
      setGameStart(true);
    }, 1000);
  }, [gameStart, history, location.pathname]);

  const toWaiting = () => (
    <button
      type="button"
      onClick={async () => {
        await firebase.database().ref(`/rooms/${roomId}/players/host`).update({ start: 0 });
        history.push(`/platform/waiting_room/${roomId}/host`);
      }}
    >
      {t(intl, messages.button.retry.othergame)}
    </button>
  );
  const listenToWaitingRoom = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        if (value.start === 0) {
          return <Redirect to={`/platform/waiting_room/${roomId}/user/${userId}`} />;
        }
        return null;
      }}
    </FirebaseDatabaseNode>
  );
  const handleOnComplete = async (value) => {
    await firebase.database()
      .ref(`/rooms/${roomId}/players/host`)
      .update({ gameData: value });
  };
  const getName = obj => Object.values(obj).map(e => e.name);

  if (userId === 'host') {
    return (
      <div className={!gameStart ? 'game-backdrop' : 'roulette-container'}>
        <FirebaseDatabaseNode path={`/rooms/${roomId}/players`}>
          {({ value }) => {
            if (!value) {
              return null;
            }
            return (
              <>
                <Roulette
                  roomId={roomId}
                  options={getName(value)}
                  baseSize={150}
                  onComplete={handleOnComplete}
                />
                {toWaiting()}
                {(value.host.gameData !== 0)
                  ? <div className="roulette-result">{value.host.gameData}</div>
                  : null}
              </>
            );
          }}
        </FirebaseDatabaseNode>
        {!gameStart
          ? (
            <Ready
              description={t(intl, messages.rouletteGame.description)}
              title={t(intl, messages.rouletteGame.title)}
            />
          )
          : null
        }
      </div>
    );
  }

  return (
    <div className="game">
      <h1 className="game-header">{t(intl, messages.rouletteGame.title)}</h1>
      {listenToWaitingRoom()}
      <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host`}>
        {({ value }) => {
          if (!value) {
            return null;
          }
          if (value.gameData === undefined) {
            return (
              <p className="discription">{t(intl, messages.rouletteGame.waiting)}</p>
            );
          }
          if (value.gameData === 0) {
            return (
              <p className="discription">{t(intl, messages.rouletteGame.spining)}</p>
            );
          }
          if (value.gameData) {
            return (
              <div className="roulette-result vertical-center">{`결과:${value.gameData}`}</div>
            );
          }
          return null;
        }}
      </FirebaseDatabaseNode>
    </div>
  );
};

Play.propTypes = {
  history: shapes.history.isRequired,
  location: shapes.location.isRequired,
  match: shapes.match.isRequired,
};

export default Play;

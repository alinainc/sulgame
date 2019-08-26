// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '../../../i18n';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';
import Roulette from './Roulette';

const Play = ({ history, location, match: { params: { roomId, userId } } }) => {
  const intl = useIntl();
  const [roll, setRoll] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    if (userId === 'host') {
      firebase.database()
        .ref('/statistics/plays')
        .push({ gametype: 'roulette', time: new Date(Date.now()).toString() });
    }
  }, [userId]);

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
        await firebase.database().ref(`/rooms/${roomId}/players/host`)
          .update({ gameData: null, roulette: null, start: 0 });
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
    if (userId === 'host') {
      await firebase.database()
        .ref(`/rooms/${roomId}/players/host`)
        .update({ gameData: value });
    }
    setRoll(value);
  };
  const getName = obj => Object.values(obj).map(e => e.name);

  const renderStatus = () => (
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
            <p className="discription">{t(intl, messages.rouletteGame.spinning)}</p>
          );
        }
        return null;
      }}
    </FirebaseDatabaseNode>
  );
  const onSpin = () => {
    setRoll(false);
  };
  return (
    <div className={!gameStart ? 'game-backdrop' : 'roulette-container'}>
      {(userId !== 'host') ? listenToWaitingRoom() : null}
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
                userId={userId}
                onSpin={onSpin}
              />
              {(userId === 'host') ? toWaiting() : null}
            </>
          );
        }}
      </FirebaseDatabaseNode>
      {(roll) ? <div className="roulette-result">{roll}</div> : null}
      {(userId !== 'host') ? renderStatus() : null}
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
};

Play.propTypes = {
  history: shapes.history.isRequired,
  location: shapes.location.isRequired,
  match: shapes.match.isRequired,
};

export default Play;

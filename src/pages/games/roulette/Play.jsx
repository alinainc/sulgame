// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { button, rouletteGame } from '../../../messages';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';
import Roulette from './Roulette';

const Play = ({ history, match: { params: { roomId, userId } } }) => {
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
  }, [gameStart]);

  const toWaiting = () => (
    <button
      type="button"
      onClick={async () => {
        await firebase.database().ref(`/rooms/${roomId}/players/host`).update({ start: 0 });
        history.push(`/platform/waiting_room/${roomId}/host`);
      }}
    >
      {button.retry.othergame}
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
                {(value.host.gameData !== 0) ? <div className="roulette-result">{value.host.gameData}</div> : null}
              </>
            );
          }}
        </FirebaseDatabaseNode>
        {!gameStart
          ? (
            <Ready
              description={rouletteGame.description}
              title={rouletteGame.title}
            />
          )
          : null
        }
      </div>
    );
  }

  return (
    <>
      {listenToWaitingRoom()}
      <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host`}>
        {({ value }) => {
          if (!value) {
            return null;
          }
          if (value.gameData === undefined) {
            return <div className="roulette-pending">{rouletteGame.waiting}</div>;
          }
          if (value.gameData === 0) {
            return <div className="roulette-pending">{rouletteGame.spining}</div>;
          }
          if (value.gameData) {
            return <div className="roulette-result vertical-center">{`결과:${value.gameData}`}</div>;
          }
          return null;
        }}
      </FirebaseDatabaseNode>
    </>
  );
};

Play.propTypes = {
  history: shapes.history.isRequired,
  match: shapes.match.isRequired,
};

export default Play;

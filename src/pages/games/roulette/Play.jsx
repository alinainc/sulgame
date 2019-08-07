// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useState } from 'react';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { button, rouletteGame } from '../../../messages';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';
import Roulette from './Roulette';

const Play = ({ history, match: { params: { roomId, userId } } }) => {
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setGameStart(true);
    }, 1000);
  }, [gameStart]);

  const toWaiting = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => (
        <button
          type="button"
          onClick={() => {
            if (userId === 'host') {
              history.push(`/platform/waiting_room/${roomId}/host`);
              runMutation({ start: 0 });
            }
          }}
        >
          {button.retry.othergame}
        </button>
      )}
    </FirebaseDatabaseMutation>
  );
  const handleOnComplete = value => console.log(value);
  const getName = obj => Object.values(obj).map(e => e.name);


  return (
    <div className={!gameStart ? 'game-backdrop' : 'roulette-container'}>
      <FirebaseDatabaseNode path={`/rooms/${roomId}/players`}>
        {({ value }) => {
          if (!value) {
            return null;
          }
          return (
            <>
              <Roulette options={getName(value)} baseSize={150} onComplete={handleOnComplete} />
              {toWaiting()}
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
};

Play.propTypes = {
  history: shapes.history.isRequired,
  match: shapes.match.isRequired,
};

export default Play;

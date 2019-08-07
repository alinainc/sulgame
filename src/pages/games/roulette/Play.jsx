// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { button } from '../../../messages';
import shapes from '../../../shapes';
import Roulette from './Roulette';

const Play = ({ history, match: { params: { roomId } } }) => {
  const toWaiting = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => (
        <button
          type="button"
          onClick={() => {
            history.push(`/platform/waiting_room/${roomId}/host`);
            runMutation({ start: 0 });
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
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        return (
          <div className="roulette-container">
            <Roulette options={getName(value)} baseSize={150} onComplete={handleOnComplete} />
            {toWaiting()}
          </div>
        );
      }}
    </FirebaseDatabaseNode>
  );
};

Play.propTypes = {
  history: shapes.history.isRequired,
  match: shapes.match.isRequired,
};

export default Play;

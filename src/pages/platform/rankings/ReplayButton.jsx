// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import generateHash from 'random-hash';
import React from 'react';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { button } from '../../../messages';
import shapes from '../../../shapes';

const ReplayButton = ({ history, isHost, roomId }) => {
  const toWaiting = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => (
        <button
          onClick={() => {
            history.push(`/platform/waiting_room/${roomId}/host`);
            runMutation({ start: 0 });
          }}
          type="button"
        >
          {button.retry.othergame}
        </button>
      )}
    </FirebaseDatabaseMutation>
  );

  const replayGame = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => (
        <button
          onClick={async () => {
            runMutation({ choice: null, connect: generateHash(), replay: 1 });
          }}
          type="button"
        >
          {button.retry.thisgame}
        </button>
      )}
    </FirebaseDatabaseMutation>
  );
  return (
    <div>
      {isHost
        ? (
          <>
            {toWaiting()}
            {replayGame()}
          </>
        )
        : undefined}
    </div>
  );
};

ReplayButton.propTypes = {
  history: shapes.history.isRequired,
  isHost: PropTypes.bool.isRequired,
  roomId: PropTypes.string.isRequired,
};
export default ReplayButton;

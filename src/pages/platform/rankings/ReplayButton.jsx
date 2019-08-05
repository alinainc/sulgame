// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { button } from '../../../messages';
import shapes from '../../../shapes';

const ReplayButton = ({ history, isHost, roomId }) => {
  const toWaiting = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => (
        <Button onClick={() => {
          history.push(`/platform/waiting_room/${roomId}/host`);
          runMutation({ start: 0 });
        }}
        >
          {button.retry.othergame}
        </Button>
      )}
    </FirebaseDatabaseMutation>
  );

  const replayGame = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => (
        <Button onClick={() => {
          history.push(`/platform/waiting_room/${roomId}/host`);
          runMutation({ replay: 1 });
        }}
        >
          {button.retry.thisgame}
        </Button>
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

// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import generateHash from 'random-hash';
import React from 'react';
import { useIntl } from 'react-intl';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { messages, t } from '../../../i18n';
import shapes from '../../../shapes';

const ReplayButton = ({ history, isHost, roomId }) => {
  const intl = useIntl();
  const toWaiting = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => (
        <button
          onClick={() => {
            history.push(`/platform/waiting_room/${roomId}/host`);
            runMutation({ gameData: null, start: 0 });
          }}
          type="button"
        >
          {t(intl, messages.button.retry.othergame)}
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
          {t(intl, messages.button.retry.thisgame)}
        </button>
      )}
    </FirebaseDatabaseMutation>
  );
  return (
    <div id="replay-btn">
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

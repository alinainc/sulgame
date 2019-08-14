// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '@frontend/i18n';
import shapes from '@frontend/shapes';
import GameList from './GameList';
import InviteList from './InviteList';
import PlayerList from './PlayerList';

const WaitingRoom = ({ isHost, match: { params: { roomId, userId } } }) => {
  const intl = useIntl();

  const [state, setState] = useState({ show: false });

  const showModal = () => {
    setState({ show: true });
  };

  const hideModal = () => {
    setState({ show: false });
  };

  const renderWaitingRoom = () => (
    <div className="waiting">
      <h1>
        <span>{t(intl, messages.mainPage.title)}</span>
        <span role="img" aria-label="moon">🌙</span>
      </h1>
      <PlayerList roomId={roomId} userId={isHost ? 'host' : userId} />
      <button type="button" onClick={showModal} id="invite-btn">
        {'👭'}
        {t(intl, messages.waitingRoom.invite)}
        {'👬'}
      </button>
      {isHost
        ? (<GameList roomId={roomId} isHost={isHost} />)
        : (<GameList userId={userId} roomId={roomId} isHost={isHost} />)}
    </div>
  );

  const checkUserExists = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players`}>
      {({ value }) => {
        if (!value) {
          return <div className="loader" />;
        }
        const ids = Object.keys(value);
        if (!isHost && !ids.includes(userId)) {
          return <div>{t(intl, messages.waitingRoom.nouser)}</div>;
        }
        return renderWaitingRoom();
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <div className="waiting">
      <InviteList handleClose={hideModal} roomId={roomId} show={state.show} />
      {checkUserExists()}
    </div>
  );
};

WaitingRoom.propTypes = {
  isHost: PropTypes.bool,
  match: shapes.match.isRequired,
};

WaitingRoom.defaultProps = {
  isHost: undefined,
};

export default WaitingRoom;

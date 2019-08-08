// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { mainPage, waitingRoom } from '../../../messages';
import shapes from '../../../shapes';
import GameList from './GameList';
import InviteList from './InviteList';
import PlayerList from './PlayerList';

const WaitingRoom = ({ history, isHost, match: { params: { roomId, userId } } }) => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.onpopstate = () => {
      history.push('');
    };
  });

  const renderWaitingRoom = () => (
    <div className="waiting">
      <h1>
        <span>{mainPage.title}</span>
        <span role="img" aria-label="moon">🌙</span>
      </h1>
      <InviteList roomId={roomId} />
      <PlayerList roomId={roomId} userId={isHost ? 'host' : userId} />
      {isHost
        ? (<GameList roomId={roomId} isHost={isHost} />)
        : (<GameList userId={userId} roomId={roomId} isHost={isHost} />)}
    </div>
  );

  const checkUserExists = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players`}>
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        const ids = Object.keys(value);
        if (!isHost && !ids.includes(userId)) {
          return <div>{waitingRoom.nouser}</div>;
        }
        return renderWaitingRoom();
      }}
    </FirebaseDatabaseNode>
  );

  return checkUserExists();
};

WaitingRoom.propTypes = {
  isHost: PropTypes.bool,
  match: shapes.match.isRequired,
};

WaitingRoom.defaultProps = {
  isHost: undefined,
};

export default WaitingRoom;

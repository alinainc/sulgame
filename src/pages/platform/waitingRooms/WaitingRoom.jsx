// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';

import { mainPage } from '../../../messages';
import shapes from '../../../shapes';
import GameList from './GameList';
import InviteList from './InviteList';
import PlayerList from './PlayerList';

const WaitingRoom = ({ isHost, match: { params: { roomId, userId } } }) => (
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

WaitingRoom.propTypes = {
  isHost: PropTypes.bool,
  match: shapes.match.isRequired,
};

WaitingRoom.defaultProps = {
  isHost: undefined,
};

export default WaitingRoom;

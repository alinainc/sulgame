// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';

import { mainPage, waitingRoom } from '../../../messages';
import shapes from '../../../shapes';
import GameList from './GameList';
import PlayerList from './PlayerList';
import Qrcode from './Qrcode';
import UrlCopy from './UrlCopy';

const WaitingRoom = ({ isHost, match: { params: { roomId, userId } } }) => (
  <div className="waiting">
    <h1>
      <span>{mainPage.title}</span>
      <span role="img" aria-label="moon">🌙</span>
    </h1>
    <div className="section enter">
      <div className="bar">{waitingRoom.invite}</div>
      <Qrcode value={`localhost:3000/platform/entry/${roomId}`} />
      <UrlCopy roomId={roomId} />
    </div>
    <PlayerList roomId={roomId} />
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

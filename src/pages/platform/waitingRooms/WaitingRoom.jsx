// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'reactstrap';

import { waitingRoom } from '../../../messages';
import shapes from '../../../shapes';
import GameList from './GameList';
import PlayerList from './PlayerList';
import Qrcode from './Qrcode';
import UrlCopy from './UrlCopy';

const WaitingRoom = ({ isHost, match: { params: { roomId, userId } } }) => (
  <Container className="waiting">
    <h2>{waitingRoom.title}</h2>
    <UrlCopy roomId={roomId} />
    <Qrcode value={`localhost:3000/platform/entry/${roomId}`} />
    <PlayerList roomId={roomId} />
    {isHost
      ? (<GameList roomId={roomId} isHost={isHost} />)
      : (<GameList userId={userId} roomId={roomId} isHost={isHost} />)}
  </Container>
);

WaitingRoom.propTypes = {
  isHost: PropTypes.bool,
  match: shapes.match.isRequired,
};

WaitingRoom.defaultProps = {
  isHost: undefined,
};

export default WaitingRoom;

// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'reactstrap';

import { waitingRoom } from '../../../messages';
import shapes from '../../../shapes';
import GameList from './GameList';
import PlayerList from './PlayerList';
import UrlCopy from './UrlCopy';

const WaitingRoom = ({ isHost, match: { params: { roomId, userId } } }) => (
  <div className="container">
    <Container>
      <h2>{waitingRoom.title}</h2>
      <UrlCopy roomId={roomId} />
      <PlayerList roomId={roomId} />
      {isHost
        ? (<GameList roomId={roomId} isHost={isHost} />)
        : (<GameList userId={userId} roomId={roomId} isHost={isHost} />)}
    </Container>
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

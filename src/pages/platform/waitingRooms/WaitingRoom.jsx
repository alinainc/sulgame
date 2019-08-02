// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Container } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { waitingRoom } from '../../../messages';
import shapes from '../../../shapes';
import GameList from './GameList';
import PlayerList from './PlayerList';
import UrlCopy from './UrlCopy';

const InitWithMount = ({ init }) => {
  useEffect(() => {
    init();
  }, []);
  return null;
};

const WaitingRoom = ({ isHost, match: { params: { roomId, userId } } }) => {
  const initGameData = () => {
    if (userId) {
      return (
        <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/${userId}`} type="update">
          {({ runMutation }) => {
            const initData = () => runMutation({ end: 0, gameData: 0 });
            return <InitWithMount init={initData} />;
          }}
        </FirebaseDatabaseMutation>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <Container>
        <h2>{waitingRoom.title}</h2>
        {initGameData()}
        <UrlCopy roomId={roomId} />
        <PlayerList roomId={roomId} />
        {isHost
          ? (<GameList roomId={roomId} isHost={isHost} />)
          : (<GameList userId={userId} roomId={roomId} isHost={isHost} />)}
      </Container>
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

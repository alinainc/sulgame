// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import generateHash from 'random-hash';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { button, games, waitingRoom } from '../../../messages';
import GameListForm from '../../components/GameListForm';

const PlayerList = ({ roomId, userId }) => {
  const updateConnect = async () => {
    const hostConnect = await firebase.database()
      .ref(`/rooms/${roomId}/players/host/connect`)
      .once('value');
    await firebase.database()
      .ref(`/rooms/${roomId}/players/${userId}`)
      .update({ connect: hostConnect.val() });
  };


  const listenStart = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        if (value.start === 1) {
          if (!userId) {
            return <Redirect to={`/games/${value.gametype}/play/${roomId}/user/host`} />;
          }
          updateConnect();
          return <Redirect to={`/games/${value.gametype}/play/${roomId}/user/${userId}`} />;
        }

        return null;
      }}
    </FirebaseDatabaseNode>
  );

  const playGame = gametype => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => {
        if (userId !== 'host') {
          return null;
        }
        return (
          <button
            className="game-start"
            type="button"
            onClick={() => {
              runMutation({ connect: generateHash(), gametype, start: 1 });
            }}
          >
            {button.start}
          </button>
        );
      }}
    </FirebaseDatabaseMutation>
  );

  const renderGames = () => (
    <GameListForm
      title={{ key: waitingRoom.games }}
      rows={[{ host: item => <>{playGame(item.type)}</> }]}
      value={games}
      className="game"
    />
  );
  return (
    <div className="section">
      {listenStart()}
      {renderGames()}
    </div>
  );
};

PlayerList.propTypes = {
  isHost: PropTypes.bool,
  roomId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};
PlayerList.defaultProps = {
  isHost: false,
  userId: 'host',
};
export default PlayerList;

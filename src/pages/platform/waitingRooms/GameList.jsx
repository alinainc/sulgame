// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Col } from 'reactstrap';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { button, games, waitingRoom } from '../../../messages';
import GameListForm from '../../components/GameList';

const PlayerList = ({ isHost, roomId, userId }) => {
  const listenStart = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host/start`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        if (value === 1) {
          if (!userId) {
            return <Redirect to={`/clickgame/play/${roomId}/user/host`} />;
          }
          return <Redirect to={`/clickgame/play/${roomId}/user/${userId}`} />;
        }
        return null;
      }}
    </FirebaseDatabaseNode>
  );

  const playGame = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => {
        if (userId !== 'host') {
          return null;
        }
        return (
          <Button onClick={() => {
            runMutation({ gametype: 1, start: 1 });
          }
            }
          >
            {button.start}
          </Button>
        );
      }}
    </FirebaseDatabaseMutation>
  );

  const renderGames = () => (
    <GameListForm
      title={{ key: waitingRoom.games }}
      rows={[{
        host: isHost
          ? item => (
            <>
              <Col>
                {get(item, 'name', '')}
              </Col>
              <Col>{playGame()}</Col>
            </>
          )
          : undefined,
        key: 'name',
      }, {
        key: 'description',
      }]}
      value={games}
    />
  );
  return (
    <Fragment>
      {listenStart()}
      {renderGames()}
    </Fragment>
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

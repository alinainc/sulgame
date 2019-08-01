// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import React, { Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Redirect } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { button, games } from '../../messages';
import shapes from '../../shapes';
import GameList from '../components/GameList';
import PlayerList from '../components/PlayerList';

const WaitingRoom = ({ match: { params: { isHost, roomId, userId } } }) => {

  const renderRoomIdCopy = () => (
    <Fragment>
      <Row>roomId</Row>
      <Row>
        <Col>{roomId}</Col>
        <Col>
          <CopyToClipboard text={`localhost:3000/platform/entry/${roomId}`}>
            <Button>URL 복사</Button>
          </CopyToClipboard>
        </Col>
      </Row>
    </Fragment>
  );

  const renderPlayers = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/`}>
      {({ value }) => (
        <PlayerList
          col={{
            key: 'name',
            name: 'Players',
            xsChild: 3,
            xsHead: 12,
          }}
          value={value}
        />
      )}
    </FirebaseDatabaseNode>
  );
  const listenStart = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host/start`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        if (value === 1) {
          return <Redirect to="/clickgame/play" />;
        }
        return null;
      }}
    </FirebaseDatabaseNode>
  );
  const playGame = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => {
        if (userId) {
          return null;
        }
        return <Button onClick={() => runMutation({ start: 1 })}>{button.start}</Button>;
      }}
    </FirebaseDatabaseMutation>
  );
  const renderGames = () => (
    <GameList
      title={{ key: 'Games' }}
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
    <div className="container">
      <Container>
        <h1>대기 방</h1>
        {renderRoomIdCopy()}
        {renderPlayers()}
        {renderGames()}
        {listenStart()}
      </Container>
    </div>
  );
};

WaitingRoom.propTypes = {
  match: shapes.match.isRequired,
};

export default WaitingRoom;

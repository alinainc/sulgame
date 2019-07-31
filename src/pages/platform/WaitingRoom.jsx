// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { Fragment } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import WaitingList from '../components/WaitingList'
import { games } from '../../messages';

import { FirebaseDatabaseNode } from '@react-firebase/database';

const WaitingRoom = ({ match }) => {
  const roomId = match.params.roomId;

  const renderRoomIdCopy = roomId => (
    <Fragment>
      <Row>roomId</Row>
      <Row>
        <Col>{roomId}</Col>
        <Col>
          <Button>URL 복사</Button>
        </Col>
      </Row>
    </Fragment>
  );

  const renderPlayers = (roomId) => {
    return (
      <FirebaseDatabaseNode path={`/rooms/${roomId}/`}>
        {({value}) =>
          <WaitingList
            col={{
              key: 'name',
              name: 'Players',
              xsHead: 12,
              xsChild: 3,
            }}
            value={value}
          />
        }
      </FirebaseDatabaseNode>
    );
  };

  const renderGames = () => {
    return (
      <WaitingList
        col={{
          key: 'name',
          name: 'Games',
          xsHead: 12,
          xsChild: 12,
        }}
        value={games}
      />
    );
  };

  return (
    <div className="container">
      <Container>
        <h1>대기 방</h1>
        {renderRoomIdCopy(roomId)}
        {renderPlayers(roomId)}
        {renderGames()}
      </Container>
    </div>
  );
};

export default WaitingRoom;

// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { games } from '../../messages';
import WaitingList from '../components/WaitingList';


const WaitingRoom = ({ match: { params: { roomId } } }) => {
  const renderRoomIdCopy = () => (
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

  const renderPlayers = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/`}>
      {({ value }) => (
        <WaitingList
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


  const renderGames = () => (
    <WaitingList
      col={{
        key: 'name',
        name: 'Games',
        xsChild: 12,
        xsHead: 12,
      }}
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
      </Container>
    </div>
  );
};

WaitingRoom.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default WaitingRoom;

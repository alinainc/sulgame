// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { Fragment } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import WaitingList from '../components/WaitingList'

import { FirebaseDatabaseNode } from '@react-firebase/database';

const WaitingRoom = ({ match }) => {
  const roomURL = match.params.roomURL;

  const renderPlayers = players => (
    <SimpleList
      cols={[{
        key: 'name',
        name: 'Players',
        xs: 12,
      }]}
      items={players}
    />
  );

  const renderPlayers = (URL) => {
    return (
      <FirebaseDatabaseNode path={`/rooms/${URL}/`}>
        {({value}) =>
          <WaitingList
            col={{
              key: 'nickname',
              name: 'Players',
              xs: 12,
            }}
            value={value}
          />
        }
      </FirebaseDatabaseNode>
      
    )
  };

  return (
    <div className="container">
      <Container>
        <h1>대기 방</h1>
        {renderUrlCopy(roomURL)}
        {renderPlayers(roomURL)}
      </Container>
    </div>
  );
};

export default WaitingRoom;

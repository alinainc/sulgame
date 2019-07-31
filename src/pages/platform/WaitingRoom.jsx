// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { Fragment } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

import SimpleList from '../components/SimpleList';

const WaitingRoom = () => {
  // FIXME: temporary players, games, and URL for frontend demo
  const dummyPlayers = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
  const dummyGames = [{ name: 'game1' }, { name: 'game2' }, { name: 'game3' }];
  const dummyURL = 'sdlkjxsdsdfj';

  const renderUrlCopy = URL => (
    <Fragment>
      <Row>Url</Row>
      <Row>
        <Col>{URL}</Col>
        <Col>
          <Button>Copy</Button>
        </Col>
      </Row>
    </Fragment>
  );

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

  const renderGames = games => (
    <Fragment>
      <SimpleList
        cols={[{
          key: 'name',
          name: 'Games',
          xs: 12,
        }]}
        items={games}
      />
    </Fragment>
  );

  return (
    <div className="container">
      <Container>
        <h1>대기 방</h1>
        {renderUrlCopy(dummyURL)}
        {renderPlayers(dummyPlayers)}
        {renderGames(dummyGames)}
      </Container>
    </div>
  );
};

export default WaitingRoom;

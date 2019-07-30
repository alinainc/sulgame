// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

import SimpleList from '../components/SimpleList';

const WaitingRoom = () => {
  // temporary players, games, and URL for frontend demo
  const players = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
  const games = [{ name: 'game1' }, { name: 'game2' }, { name: 'game3' }];
  const tempURL = 'sdlkjxsdsdfj';

  const renderUrlCopy = (URL) => {
    return (
      <>
        <Row>Url</Row>
        <Row>
          <Col>{URL}</Col>
          <Col>
            <Button>Copy</Button>
          </Col>
        </Row>
      </>
    );
  };

  // eslint-disable-next-line no-shadow
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

  // eslint-disable-next-line no-shadow
  const renderGames = games => (
    <>
      <SimpleList
        cols={[{
          key: 'name',
          name: 'Games',
          xs: 12,
        }]}
        items={games}
      />
    </>
  );

  return (
    <div className="container">
      <Container>
        <h1>대기 방</h1>
        {renderUrlCopy(tempURL)}
        {renderPlayers(players)}
        {renderGames(games)}
      </Container>
    </div>
  );
};

export default WaitingRoom;

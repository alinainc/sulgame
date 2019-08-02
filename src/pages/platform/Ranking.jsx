// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { button, ranking } from '../../messages';
import shapes from '../../shapes';
import PlayerList from '../components/PlayerList';

const Ranking = ({ history, isHost, match: { params: { roomId, userId } } }) => {
  const toMain = () => history.push('/');
  const toWaiting = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => (
        <Button onClick={() => {
          history.push(`/platform/waiting_room/${roomId}/host`);
          runMutation({ end: 0, start: 0 });
        }}
        >
          {button.retry.othergame}
        </Button>
      )}
    </FirebaseDatabaseMutation>
  );

  const listenToWaiting = () => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/${userId}`} type="update">
      {({ runMutation }) => {
        runMutation({ end: null, gameData: null });
        return <Redirect to={`/platform/waiting_room/${roomId}/user/${userId}`} />;
      }}
    </FirebaseDatabaseMutation>
  );

  const renderRanking = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        if (!value.players.host.start) {
          return listenToWaiting(value.players.host.start);
        }
        return (
          <PlayerList
            cols={[{
              key: 'rank',
              name: ranking.rank.title,
            }, {
              key: 'name',
              name: ranking.name,
            }, {
              key: 'gameData',
              name: ranking.score,
            }]}
            isRank
            value={value}
          />
        );
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <Container>
      <h1>{ranking.title}</h1>
      <Button onClick={toMain}>{button.quit}</Button>
      {renderRanking()}
      {isHost
        ? (
          <>
            {toWaiting()}
            <Button>{button.retry.thisgame}</Button>
          </>
        )
        : undefined}
    </Container>
  );
};

Ranking.propTypes = {
  history: shapes.history.isRequired,
  isHost: PropTypes.bool,
  match: shapes.match.isRequired,
};

Ranking.defaultProps = {
  isHost: undefined,
};

export default Ranking;

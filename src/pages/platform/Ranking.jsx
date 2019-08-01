// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Button, Container } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { button, ranking } from '../../messages';
import shapes from '../../shapes';
import PlayerList from '../components/PlayerList';

const Ranking = ({ history, isHost, match: { params: { roomId } } }) => {
  const toMain = () => history.push('/');
  const toWaiting = () => history.push(`/platform/waiting_room/${roomId}/host`);

  const renderRanking = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}`}>
      {({ value }) => (
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
      )}
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
            <Button onClick={toWaiting}>{button.retry.othergame}</Button>
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

Ranking.defaultProps = {
  isHost: undefined,
};

export default Ranking;

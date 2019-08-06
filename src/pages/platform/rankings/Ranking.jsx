// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { button, ranking } from '../../../messages';
import shapes from '../../../shapes';
import RankingList from '../../components/RankingList';
import ReplayButton from './ReplayButton';

const Ranking = ({ history, isHost, match: { params: { roomId, userId } } }) => {
  const toMain = () => history.push('/');

  const renderRanking = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        if (value.players.host.replay === 1) {
          if (!userId) {
            return (
              <Redirect
                to={`/games/${value.players.host.gametype}/play/${roomId}/user/host`}
              />
            );
          }
          return (
            <Redirect
              to={`/games/${value.players.host.gametype}/play/${roomId}/user/${userId}`}
            />
          );
        }
        if (!value.players.host.start) {
          return <Redirect to={`/platform/waiting_room/${roomId}/user/${userId}`} />;
        }
        return (
          <RankingList
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
    <div className="ranking">
      <h2>{ranking.title}</h2>
      <button type="button" onClick={toMain}>{button.quit}</button>
      {renderRanking()}
      <ReplayButton history={history} roomId={roomId} isHost={isHost} />
    </div>
  );
};

Ranking.propTypes = {
  history: shapes.history.isRequired,
  isHost: PropTypes.bool,
  match: shapes.match.isRequired,
};

Ranking.defaultProps = {
  isHost: false,
};

export default Ranking;

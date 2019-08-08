// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { button, ranking } from '../../../messages';
import shapes from '../../../shapes';
import RankingGroup from '../../components/RankingGroup';
import RankingList from '../../components/RankingList';
import HostOut from './HostOut';
import ReplayButton from './ReplayButton';

const Ranking = ({ history, isHost, match: { params: { roomId, userId } } }) => {
  const toMain = () => {
    if (isHost) {
      firebase.database()
        .ref(`/rooms/${roomId}/players/host`)
        .set({});
    }
    if (userId) {
      firebase.database()
        .ref(`/rooms/${roomId}/players/${userId}`)
        .set({});
    }
    history.push('/');
  };

  const onFeedbackClick = () => {
    history.push('/platform/rating');
  };

  const removeLeaver = async () => {
    const users = await firebase.database()
      .ref(`/rooms/${roomId}/players`)
      .once('value');
    const { host: { connect } } = users.val();
    const leavers = [];
    Object.keys(users.val()).forEach((player) => {
      if (users.val()[player].connect !== connect) {
        leavers.push(player);
      }
    });
    leavers.forEach((leaver) => {
      firebase.database()
        .ref(`/rooms/${roomId}/players/${leaver}`)
        .set(null);
    });
  };
  if (isHost) {
    removeLeaver();
  }

  const updateConnect = async () => {
    const hostConnect = await firebase.database()
      .ref(`/rooms/${roomId}/players/host/connect`)
      .once('value');
    await firebase.database()
      .ref(`/rooms/${roomId}/players/${userId}`)
      .update({ connect: hostConnect.val() });
  };
  const getHostConnect = async () => {
    const connect = await firebase.database()
      .ref(`/rooms/${roomId}/players/host/connect`)
      .once('value');
    return connect.val();
  };
  const renderRanking = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        if (!value.players.host) {
          return <HostOut history={history} />;
        }
        if (value.players.host.replay === 1) {
          if (!userId) {
            return (
              <Redirect
                to={`/games/${value.players.host.gametype}/play/${roomId}/user/host`}
              />
            );
          }
          updateConnect();
          return (
            <Redirect
              to={`/games/${value.players.host.gametype}/play/${roomId}/user/${userId}`}
            />
          );
        }
        if (!value.players.host.start) {
          updateConnect();
          return <Redirect to={`/platform/waiting_room/${roomId}/user/${userId}`} />;
        }

        if (value.players.host.gametype === 'choose') {
          return <RankingGroup isRank roomId={roomId} value={value} />;
        }

        const hostConnect = getHostConnect();

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
            userId={isHost ? 'host' : userId}
            value={value}
            hostConnect={hostConnect}
          />
        );
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <div className="ranking">
      <h1>{ranking.title}</h1>
      <button
        type="button"
        onClick={toMain}
        className="quit"
      >
        {button.quit}
      </button>
      {renderRanking()}
      <ReplayButton history={history} roomId={roomId} isHost={isHost} />
      <button type="button" className="feedback-button" onClick={onFeedbackClick}>
        <span role="img" aria-label="feedback">✉️</span>
      </button>
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

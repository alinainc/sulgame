// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import generateHash from 'random-hash';
import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '../../../i18n';
import { games } from '../../../i18n/messages';
import GameListForm from '../../components/GameListForm';

const GameList = ({ roomId, userId }) => {
  const intl = useIntl();
  const updateConnect = async () => {
    const hostConnect = await firebase.database()
      .ref(`/rooms/${roomId}/players/host/connect`)
      .once('value');
    await firebase.database()
      .ref(`/rooms/${roomId}/players/${userId}`)
      .update({ connect: hostConnect.val() });
  };

  const listenStart = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        if (value.start === 1) {
          if (!userId) {
            return <Redirect to={`/games/${value.gametype}/play/${roomId}/user/host`} />;
          }
          updateConnect();
          return <Redirect to={`/games/${value.gametype}/play/${roomId}/user/${userId}`} />;
        }

        return null;
      }}
    </FirebaseDatabaseNode>
  );

  const playGame = gametype => (
    <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host`} type="update">
      {({ runMutation }) => {
        if (userId !== 'host') {
          return null;
        }
        if (gametype === 'subway') {
          return (
            <button className="game-prepare" disabled type="button">
              {t(intl, messages.button.prepare)}
            </button>
          );
        }
        return (
          <button
            className="game-start"
            type="button"
            onClick={() => {
              runMutation({ connect: generateHash(), gametype, start: 1 });
            }}
          >
            {t(intl, messages.button.start)}
          </button>
        );
      }}
    </FirebaseDatabaseMutation>
  );

  const renderGames = () => (
    <GameListForm
      rows={[{ host: item => <>{playGame(item.type)}</> }]}
      value={games}
      className="game"
    />
  );
  return (
    <Fragment>
      {listenStart()}
      <table>
        <thead>
          <tr>
            <td>{t(intl, messages.waitingRoom.games)}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="vertical-scroll">
                {renderGames()}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

GameList.propTypes = {
  roomId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};
GameList.defaultProps = {
  userId: 'host',
};
export default GameList;

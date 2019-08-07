// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { waitingRoom } from '../../../messages';
import PlayerListForm from '../../components/PlayerList';

const PlayerList = ({ roomId, userId }) => (
  <table>
    <thead>
      <tr>
        <td>{waitingRoom.players}</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <FirebaseDatabaseNode path={`/rooms/${roomId}/`}>
            {({ value }) => (
              <PlayerListForm
                value={value}
                userId={userId}
              />
            )}
          </FirebaseDatabaseNode>
        </td>
      </tr>
    </tbody>
  </table>
);

PlayerList.propTypes = {
  roomId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PlayerList;

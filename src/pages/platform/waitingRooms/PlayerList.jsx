// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { waitingRoom } from '../../../messages';
import PlayerListForm from '../../components/PlayerList';

const PlayerList = ({ roomId, userId }) => (
  <FirebaseDatabaseNode path={`/rooms/${roomId}/`}>
    {({ value }) => {
      if (!value) {
        return <Spinner color="primary" />;
      }
      return (
        <table>
          <thead>
            <tr>
              <td>
                {waitingRoom.players}
                {` (${Object.values(value.players).length}명)`}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <PlayerListForm
                  value={value}
                  userId={userId}
                />
              </td>
            </tr>
          </tbody>
        </table>
      );
    }}
  </FirebaseDatabaseNode>
);

PlayerList.propTypes = {
  roomId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default PlayerList;

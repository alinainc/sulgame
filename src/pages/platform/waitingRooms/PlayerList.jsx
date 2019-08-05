// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { waitingRoom } from '../../../messages';
import PlayerListForm from '../../components/PlayerList';

const PlayerList = ({ roomId }) => (
  <FirebaseDatabaseNode path={`/rooms/${roomId}/`}>
    {({ value }) => (
      <PlayerListForm
        cols={[{
          key: 'name',
          name: waitingRoom.players,
          xsChild: 3,
          xsHead: 12,
        }]}
        value={value}
      />
    )}
  </FirebaseDatabaseNode>
);

PlayerList.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default PlayerList;

// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import shapes from '../../../shapes';
import ReplayButton from '../../platform/rankings/ReplayButton';
import Roulette from './Roulette';

const Play = ({ history, isHost, match: { params: { roomId } } }) => {
  const handleOnComplete = (value) => {
    console.log(value);
  };
  const getName = obj => Object.values(obj).map(e => e.name);
  return (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players`}>
      {({ value }) => {
        if (!value) {
          return null;
        }
        return (
          <>
            <Roulette options={getName(value)} baseSize={150} onComplete={handleOnComplete} />
            <ReplayButton history={history} roomId={roomId} isHost={isHost} />
          </>
        );
      }}
    </FirebaseDatabaseNode>
  );
};

Play.propTypes = {
  history: shapes.history.isRequired,
  isHost: PropTypes.bool,
  match: shapes.match.isRequired,
};

Play.defaultProps = {
  isHost: false,
};

export default Play;

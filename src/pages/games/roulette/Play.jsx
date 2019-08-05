// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';

import shapes from '../../../shapes';
import ReplayButton from '../../platform/rankings/ReplayButton';
import Roulette from './Roulette';

const Play = ({ history, isHost, match: { params: { roomId } } }) => {
  const handleOnComplete = (value) => {
    console.log(value);
  };

  const options = ['고대웅', '민홍', '배진영', '윤지은', '정경진', '한주성'];
  return (
    <>
      <Roulette options={options} baseSize={500} onComplete={handleOnComplete} />
      <ReplayButton history={history} roomId={roomId} isHost={isHost} />
    </>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

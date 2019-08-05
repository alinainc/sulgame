// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';

import Roulette from './Roulette';

const Play = () => {
  const handleOnComplete = (value) => {
    console.log(value);
  };

  const options = ['고대웅', '민홍', '배진영', '윤지은', '정경진', '한주성'];
  return (
    <Roulette options={options} baseSize={500} onComplete={handleOnComplete} />
  );
};

export default Play;

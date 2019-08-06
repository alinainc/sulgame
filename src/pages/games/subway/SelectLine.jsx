// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button } from 'reactstrap';

import subwayGame from '../../../messages/subwayGame';
import shapes from '../../../shapes';

const SelectLine = ({ history, match: { params: { roomId, userId } } }) => {
  const lines = [
    'line1', 'line2', 'line3', 'line4', 'line5',
    'line6', 'line7', 'line8', 'line9',
  ];

  const onClickButton = (e) => {
    history.push(`/games/subway/play/${e.target.value}/${roomId}/user/${userId}`);
  };
  return (
    <div>
      <h2>{subwayGame.selectLine.title}</h2>
      {lines.map(line => (
        <Button key={line} value={line} onClick={onClickButton}>
          {subwayGame.selectLine.line[line]}
        </Button>
      ))}
    </div>
  );
};

SelectLine.propTypes = {
  history: shapes.history.isRequired,
  match: shapes.match.isRequired,
};

export default SelectLine;

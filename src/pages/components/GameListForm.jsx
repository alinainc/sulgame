// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const GameListForm = ({ rows, value }) => {
  const items = Object.keys(value).map((game) => {
    const item = Object.assign({}, value[game]);
    item.key = game;
    return item;
  });

  return (
    items.map(item => (
      rows.map(row => (
        <tbody key={get(item, 'key', '')}>
          <tr>
            <td id="game-name">{get(item, 'name', '')}</td>
            <td rowSpan="2">{row.host ? row.host(item) : null}</td>
          </tr>
          <tr>
            <td>{get(item, 'description', '')}</td>
          </tr>
        </tbody>
      ))
    ))
  );
};

GameListForm.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
  })),
  title: PropTypes.shape({ key: PropTypes.string }),
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

GameListForm.defaultProps = {
  rows: [],
  title: undefined,
  value: undefined,
};

export default GameListForm;

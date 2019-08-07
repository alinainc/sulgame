// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const GameListForm = ({ rows, title, value }) => {
  const items = Object.values(value);

  return (
    <div className="section game-list">
      <div className="bar" key={title.key}>{title.key}</div>
      {items.map(item => (
        <table key={item.key}>
          {rows.map(row => (
            <tbody>
              <tr>
                <td id="game-name">{get(item, 'name', '')}</td>
                <td rowSpan="2">{row.host ? row.host(item) : null}</td>
              </tr>
              <tr>
                <td>{get(item, 'description', '')}</td>
              </tr>
            </tbody>
          ))}
        </table>
      ))}
    </div>
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

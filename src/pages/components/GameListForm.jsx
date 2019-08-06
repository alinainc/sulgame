// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const GameListForm = ({ rows, title, value }) => {
  const items = Object.values(value);

  return (
    <div className="section">
      <div className="bar" key={title.key}>{title.key}</div>
      <div className="game-list">
        {items.map(item => (
          rows.map(row => (
            <table className="game" key={row.key}>
              <tbody className="game-info">
                <tr>
                  <td>{get(item, 'name', '')}</td>
                  <td rowSpan="3">{row.host ? row.host(item) : null}</td>
                </tr>
                <tr>
                  <td id="game-description">{get(item, 'description', '')}</td>
                </tr>
              </tbody>
            </table>
          ))
        ))}
      </div>
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

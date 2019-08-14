// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { messages, t } from '@frontend/i18n';

const GameListForm = ({ rows, value }) => {
  const intl = useIntl();

  return (
    Object.keys(value).map(game => (
      rows.map(row => (
        <table key={game} className="game-list">
          <tbody>
            <tr>
              <td id="game-name">{t(intl, messages[game].name)}</td>
              <td rowSpan="2">{row.host ? row.host(value[game]) : null}</td>
            </tr>
            <tr>
              <td id="game-description">{t(intl, messages[game].description)}</td>
            </tr>
          </tbody>
        </table>
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

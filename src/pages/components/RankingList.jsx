// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

import { ranking } from '../../messages';
import RankLogic from './RankLogic';

const RankingList = ({ cols, isRank, userId, value }) => {
  let items;

  if (value) {
    if (value.players) {
      items = Object.keys(value.players).map((player) => {
        const item = Object.assign({}, value.players[player]);
        item.key = player;
        if (player === userId) {
          item.isMe = true;
        }
        return item;
      });
      if (isRank) {
        RankLogic(items);
      }
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>{ranking.rank.title}</th>
          <th>{ranking.name}</th>
          <th>{ranking.score}</th>
        </tr>
      </thead>
      <tbody>
        {!items
          ? <Spinner color="primary" />
          : items.map((item, i) => (
            <tr key={item.key}>
              {cols.map(col => (
                <td id={col.key === 'name' && item.isMe ? 'me' : null} key={col.key}>
                  {col.key === 'rank'
                    ? `${i + 1}${ranking.rank.postfix}`
                    : get(item, col.key, ' ')}
                </td>
              ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

RankingList.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    key: PropTypes.string,
    name: PropTypes.string.isRequired,
    xsChild: PropTypes.number,
    xsHead: PropTypes.number,
  })),
  isRank: PropTypes.bool,
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

RankingList.defaultProps = {
  cols: [],
  isRank: undefined,
  value: undefined,
};

export default RankingList;

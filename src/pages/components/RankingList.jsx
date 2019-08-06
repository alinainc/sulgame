// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get, remove } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

import { ranking } from '../../messages';
import RankLogic from './RankLogic';

const RankingList = ({ cols, isRank, value }) => {
  let items;

  if (value) {
    if (value.players) {
      items = Object.values(value.players);
      remove(items, ({ connect }) => (connect === 0));
      if (isRank) {
        RankLogic(items);
      }
    }
  }

  return (
    <div className="section">
      <div className="bar">
        {cols.map(col => <span key={col.name} xs={col.xsHead}>{col.name}</span>)}
      </div>
      {!value
        ? <Spinner color="primary" />
        : items.map((item, i) => (
          <div key={item.name || item.nickname} className="players">
            {cols.map(col => (
              <span>
                {col.key === 'rank'
                  ? `${(i + 1)} ${ranking.rank.postfix}`
                  : get(item, col.key, ' ')}
              </span>
            ))}
          </div>
        ))}
    </div>
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

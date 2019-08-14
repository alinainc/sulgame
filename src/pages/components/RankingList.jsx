// Copyright (C) 2019 Alina Inc. All rights reserved.

import { get, remove } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from 'reactstrap';

import { messages, t } from '../../i18n';
import RankLogic from './RankLogic';

const RankingList = ({ cols, isRank, userId, value }) => {
  const intl = useIntl();
  let items;
  let gameType;

  if (value.players) {
    items = Object.keys(value.players).map((player) => {
      const item = Object.assign({}, value.players[player]);
      item.key = player;
      if (player === userId) {
        item.isMe = true;
      }
      if (player === 'host') {
        gameType = item.gametype;
      }
      return item;
    });

    const gameDataList = items.map(({ gameData }) => gameData);

    if (gameDataList.includes(undefined)) {
      return 'Please wait...\n';
    }

    remove(items, player => player.name === undefined);
    remove(items, player => player.gameData === undefined);
    if (isRank) {
      RankLogic(items);
    }
  }

  let rank = 1;
  let commonPlace = 1;
  let prevGameData = 0;

  const renderRankEntry = (item, col) => {
    if (col.key === 'rank') {
      return `${rank}${t(intl, messages.ranking.rank.postfix)}`;
    }
    if (gameType === 'sequence' && col.key === 'gameData') {
      const time = get(item, col.key, '');
      // FIX ME: temporary fix for sorting logic
      if (time > 500) {
        return t(intl, messages.sequenceGame.result.timeOut);
      }
      return `${time / 10} ${t(intl, messages.sequenceGame.second)}`;
    }
    return get(item, col.key, '');
  };

  return (
    <table>
      <thead key="head">
        <tr>
          <th>{t(intl, messages.ranking.rank.title)}</th>
          <th>{t(intl, messages.ranking.name)}</th>
          <th>{t(intl, messages.ranking.score)}</th>
        </tr>
      </thead>
      <tbody key="body">
        {!items
          ? <Spinner color="primary" />
          : items.map((item, i) => {
            if (i === 0) {
              prevGameData = item.gameData;
            } else {
              if (prevGameData === item.gameData) {
                commonPlace += 1;
              } else {
                rank += commonPlace;
                commonPlace = 1;
              }
              prevGameData = item.gameData;
            }
            return (
              <tr key={item.key}>
                {cols.map(col => (
                  <td id={col.key === 'name' && item.isMe ? 'me' : null} key={col.key}>
                    {renderRankEntry(item, col)}
                  </td>
                ))
                }
              </tr>
            );
          })
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
  userId: PropTypes.string.isRequired,
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

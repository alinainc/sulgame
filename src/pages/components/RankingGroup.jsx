// Copyright (C) 2019 Alina Inc. All rights reserved.

import { remove } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { chooseGame } from '../../messages';
import RankLogic from './RankLogic';

const RankingGroup = ({ isRank, roomId, value }) => {
  const groupA = [];
  const groupB = [];
  let items;

  if (value.players) {
    items = Object.values(value.players);
    const gameDataList = items.map(({ gameData }) => gameData);

    if (gameDataList.includes(undefined)) {
      return 'Loading...';
    }
    remove(items, ({ connect }) => (connect === 0));

    if (isRank) {
      RankLogic(items);
    }

    items.forEach((item) => {
      if (item.gameData === 'A') {
        groupA.push(item.name);
      } else if (item.gameData === 'B') {
        groupB.push(item.name);
      }
    });
  }

  const renderTableBody = () => {
    const tableBody = [];
    const len = groupA.length > groupB.length ? groupA.length : groupB.length;
    for (let i = 0; i < len; i += 1) {
      tableBody.push(
        <tr key={i}>
          <td key="A">{groupA[i] || ''}</td>
          <td key="B">{groupB[i] || ''}</td>
        </tr>,
      );
    }
    return tableBody;
  };

  const renderOrder = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host/order`}>
      {(order) => {
        if (!order) {
          return <Spinner color="primary" />;
        }
        return <h3 align="center">{`${order.value} 마셔라!`}</h3>;
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <div className="section">
      {renderOrder()}
      <table>
        <thead>
          <tr>
            <th>{chooseGame.A}</th>
            <th>{chooseGame.B}</th>
          </tr>
        </thead>
        <tbody>
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  );
};

RankingGroup.propTypes = {
  isRank: PropTypes.bool,
  roomId: PropTypes.string.isRequired,
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

RankingGroup.defaultProps = {
  isRank: undefined,
  value: undefined,
};

export default RankingGroup;
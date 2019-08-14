// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '../../i18n';
import Station from '../games/subway/Station';

const RankingSubway = ({ roomId, userId, value }) => {
  const intl = useIntl();

  // const initData = (roomId) => (
  //   firebase.database()

  //     .ref(`rooms/${roomId}/players/host/gameData`)
  //     .set({});
  //   firebase.database()
  //     .ref(`rooms/${roomId}/players/host/turn`)
  //     .set({});
  // )


  const renderResult = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host`}>
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        const name = "temp";
        const result = value.result;
        const line = value.line;
        const lineLength = Station[line].length;
        const answer = value.gameData;
        console.log(value);
        console.log(answer);
        console.log(Station[line].length);
        return (
          <div>
            <h2>{name}</h2>
            <h2>{result}</h2>
            <h3>{`지하철 ${t(intl, messages.subwayGame.selectLine.line[line])}`}</h3>
            {/* <h3>{`총 ${}개 중 8개 정답!`}</h3> */}
            <h3>틀린 답 : 홍대입구</h3>
          </div>
        );
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <div>
      {}
      {renderResult()}
      지하철
    </div>
  );
};

RankingSubway.propTypes = {
  roomId: PropTypes.string.isRequired,
  value: PropTypes.shape({
    players: PropTypes.shape({}),
  }),
};

RankingSubway.defaultProps = {
  value: undefined,
};

export default RankingSubway;

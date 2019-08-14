// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';


const RankingSubway = ({ roomId, value }) => {

  const renderResult = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host`}>
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        const name = "temp";
        const result = value.result;
        return (
          <div>
            <h2>{name}</h2>
            <h2>{result}</h2>
            <h3>총 15개 중 8개 정답!</h3>
            <h3>틀린 답 : 홍대입구</h3>
          </div>
        );
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <div>
      {/* {renderResult()} */}
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

// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import { replace } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '../../i18n';
import Station from '../games/subway/Station';

const RankingSubway = ({ roomId, userId }) => {
  const intl = useIntl();

  const renderResult = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players`}>
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        const { name } = value[value.host.turn];
        const answers = Object.values(value.host.gameData);
        const filteredAnswer = answers
          .filter(({ isWrong }) => isWrong);
        const wrongAnswer = filteredAnswer.length
          ? filteredAnswer[0].input : t(intl, messages.subwayGame.timeout);
        const { host: { line } } = value;
        const rightAnswers = answers.length - filteredAnswer.length;

        const i18nObject = {
          '#1': Station[line].length,
          '#2': rightAnswers,
        };
        return (
          <div>
            <h2>{`${name} ${t(intl, messages.subwayGame.drink)}`}</h2>
            <h3>
              {`${t(intl, messages.subwayGame.subway)}:
              ${t(intl, messages.subwayGame.selectLine.line[line])}`}
            </h3>
            <h3>
              {replace(t(intl, messages.subwayGame.result),
                /#1|#2/gi,
                matched => i18nObject[matched])}
            </h3>
            <h3>{`${t(intl, messages.subwayGame.wrongAnswer)}: ${wrongAnswer}`}</h3>
          </div>
        );
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <div>
      {renderResult()}
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

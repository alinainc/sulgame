// Copyright (C) 2019 Alina Inc. All rights reserved.

import { replace } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '../../i18n';
import Station from '../games/subway/Station';

const RankingSubway = ({ roomId }) => {
  const intl = useIntl();

  const renderResult = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players`}>
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        const { name } = value[value.host.turn];
        const answers = value.host.gameData ? Object.values(value.host.gameData) : [];
        const filteredAnswer = answers
          .filter(({ isWrong }) => isWrong);
        const wrongAnswer = filteredAnswer.length
          ? filteredAnswer[0].input : t(intl, messages.subwayGame.timeout);
        const { host: { line } } = value;
        const rightAnswers = answers.length - filteredAnswer.length;
        const isOverlapped = Station[line].includes(wrongAnswer);
        const i18nObject = {
          '#1': Station[line].length,
          '#2': rightAnswers,
        };
        return (
          <div>
            {(Station[line].length === rightAnswers)
              ? (<h2 id="subway-title">{t(intl, messages.subwayGame.clear)}</h2>)
              : (<h2 id="subway-title">{`${name} ${t(intl, messages.subwayGame.drink)}`}</h2>)
            }
            <button
              disabled
              type="button"
              id={line}
            >
              {t(intl, messages.subwayGame.selectLine.line[line])}
            </button>
            {(Station[line].length === rightAnswers)
              ? (
                <h3>
                  {replace(t(intl, messages.subwayGame.result),
                    /#1|#2/gi,
                    matched => i18nObject[matched])}
                </h3>
              )
              : (
                <>
                  <h3>
                    {replace(t(intl, messages.subwayGame.result),
                      /#1|#2/gi,
                      matched => i18nObject[matched])}
                  </h3>
                  <h3>
                    {`${t(intl, messages.subwayGame.wrongAnswer)}:
                ${wrongAnswer} ${isOverlapped ? t(intl, messages.subwayGame.duplication) : ''}`}
                  </h3>
                </>
              )
            }
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

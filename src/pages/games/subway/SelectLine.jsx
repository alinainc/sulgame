// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '../../../i18n';
import shapes from '../../../shapes';

const SelectLine = ({ history, match: { params: { roomId, userId } } }) => {
  const intl = useIntl();
  const lines = [
    'line1', 'line2', 'line3', 'line4', 'line5',
    'line6', 'line7', 'line8', 'line9', 'gyeongui',
  ];
  useEffect(() => {
    if (userId === 'host') {
      firebase.database()
        .ref(`rooms/${roomId}/players/host/`)
        .update({ gameData: null, replay: 0, start: 1, turn: null });
    }
  }, [roomId, userId]);

  const onClickButton = (e) => {
    firebase.database()
      .ref(`rooms/${roomId}/players/host`)
      .update({ line: e.target.value, start: 2 });
    history.push(`/games/subway/play/${e.target.value}/${roomId}/user/${userId}`);
  };
  const renderHostPage = () => (
    <div>
      <h2>{t(intl, messages.subwayGame.selectLine.title)}</h2>
      {lines.map(line => (
        <Button key={line} value={line} onClick={onClickButton}>
          {t(intl, messages.subwayGame.selectLine.line[line])}
        </Button>
      ))}
    </div>
  );
  const renderPlayerPage = () => (
    <div>
      <FirebaseDatabaseNode path={`rooms/${roomId}/players/host`}>
        {({ value }) => {
          if (!value) {
            return <div className="loader" />;
          }
          if (value.start === 2) {
            return (
              <Redirect to={`/games/subway/play/${value.line}/${roomId}/user/${userId}`} />
            );
          }
          return (
            <div>
              <div className="loader" />
              <h3 id="waiting">방장이 호선을 선택하고 있습니다</h3>
            </div>
          );
        }}
      </FirebaseDatabaseNode>
    </div>
  );
  if (userId === 'host') {
    return renderHostPage();
  }
  return renderPlayerPage();
};

SelectLine.propTypes = {
  history: shapes.history.isRequired,
  match: shapes.match.isRequired,
};

export default SelectLine;

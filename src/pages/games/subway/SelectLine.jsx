// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

import { messages, t } from '@frontend/i18n';
import shapes from '@frontend/shapes';
import { FirebaseDatabaseNode } from '@react-firebase/database';

const SelectLine = ({ history, match: { params: { roomId, userId } } }) => {
  const intl = useIntl();
  const lines = [
    'line1', 'line2', 'line3', 'line4', 'line5',
    'line6', 'line7', 'line8', 'line9',
  ];
  useEffect(() => {
    if (userId === 'host') {
      firebase.database()
        .ref(`rooms/${roomId}/players/host/`)
        .update({ gameData: null, turn: null, start: 1, replay: 0 });
    }
  }, [roomId]);

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
            return null;
          }
          if (value.start === 2) {
            return (
              <Redirect to={`/games/subway/play/${value.line}/${roomId}/user/${userId}`} />
            );
          }
          return null;
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

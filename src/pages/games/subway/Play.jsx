// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { Button, Col, Input, Row, Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { messages, t } from '../../../i18n';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';
import Station from './Station';

const Play = ({ match: { params: { lineNum, roomId, userId } } }) => {
  const intl = useIntl();

  const defaultSecond = 10;
  const [countSecond, setCountSecond] = React.useState(3);
  const inputRef = useRef();
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const stationRef = useRef(Station[lineNum]);
  const [gameStart, setGameStart] = useState(false);
  const [seconds, setSeconds] = useState(13);
  const [disabled, setDisabled] = useState(false);
  const [result, setResult] = useState();
  const [turnCount, setTurnCount] = useState(0);

  useEffect(() => {
    if (userId === 'host') {
      firebase.database()
        .ref(`rooms/${roomId}/players/host/gameData`)
        .set({});
      firebase.database()
        .ref(`rooms/${roomId}/players/host/turn`)
        .set({});
    }
    const countInterval = setInterval(() => {
      setCountSecond(s => s - 1);
    }, 1000);
    setTimeout(() => {
      setGameStart(true);
      clearInterval(countInterval);
    }, 3000);
  }, [roomId, userId]);

  useEffect(() => {
    (async () => {
      const players = await firebase.database()
        .ref(`rooms/${roomId}/players/`)
        .once('value');
      const keys = Object.keys(players.val());
      const cnt = await firebase.database()
        .ref(`rooms/${roomId}/players/host/gameData`)
        .once('value');
      let count;
      if (cnt.val() !== null && cnt.val() !== undefined) {
        count = Object.values(cnt.val()).length;
      } else {
        count = 0;
      }
      const userKey = keys[count % keys.length];
      await firebase.database()
        .ref(`rooms/${roomId}/players/host/turn`)
        .set(userKey);
      return null;
    })();
  }, [roomId, turnCount, userId]);

  const stop = (disabledButton, resultText, initSeconds) => {
    if (disabledButton) {
      setDisabled(disabledButton);
    }
    if (initSeconds) {
      setSeconds(initSeconds);
    }
    setResult(resultText);
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  };

  if (stationRef.current.length < 1) {
    stop(true, t(intl, messages.subwayGame.play.result.finish));
  }

  const resetTime = (singlePlay) => {
    if (singlePlay) {
      setSeconds(10);
      setCountSecond(10);
    }
    const sec = (gameStart ? defaultSecond : 13) * 1000;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisabled(true);
      setResult(t(intl, messages.subwayGame.play.result.timeout));
      firebase.database()
        .ref(`rooms/${roomId}/players/host`)
        .update({ start: 3 });
      clearInterval(intervalRef.current);
    }, sec);
  };

  const onClickButton = async () => {
    let input = inputRef.current.value.trim();
    if (input !== '서울역' && input.slice(-1) === '역') {
      input = input.substring(0, input.length - 1);
    }
    const isExist = stationRef.current.indexOf(input);
    if ((isExist !== -1)) {
      stationRef.current.splice(isExist, 1);
      await firebase.database()
        .ref(`rooms/${roomId}/players/host/gameData`)
        .push({ input, isWrong: false, userId });
      const users = await firebase.database()
        .ref(`rooms/${roomId}/players`)
        .once('value');
      if (Object.values(users.val()).length) {
        resetTime(true);
      } else {
        await stop(false, t(intl, messages.subwayGame.play.result.correct), 10);
      }
      await setTurnCount(turnCount + 1);
    } else {
      firebase.database()
        .ref(`rooms/${roomId}/players/host/gameData`)
        .push({ input, isWrong: true, userId });
      firebase.database()
        .ref(`rooms/${roomId}/players/host`)
        .update({ start: 3 });
      stop(true, t(intl, messages.subwayGame.play.result.wrong));
    }
    inputRef.current.value = '';
  };

  const onInputPress = (e) => {
    if (e.charCode === 13) {
      onClickButton();
    }
  };

  const renderAnswer = () => (
    <>
      <FirebaseDatabaseNode path={`rooms/${roomId}/players/host`}>
        {({ value }) => {
          if (!value) {
            return <Spinner color="primary" />;
          }
          if (value.turn !== userId) {
            stop(true, '');
          }
          if (value.gameData) {
            const keys = Object.keys(value.gameData);
            const inputs = keys
              .map(key => Object.assign(value.gameData[key], { key }));
            return (
              <ul>
                {inputs.map(answer => (<li key={answer.key}>{answer.input}</li>))}
              </ul>
            );
          }
          return null;
        }}
      </FirebaseDatabaseNode>
    </>
  );

  const listenGameover = () => (
    <FirebaseDatabaseNode path={`rooms/${roomId}/players/host/start`}>
      {({ value }) => {
        if (value === 3) {
          stop(true, '');
          if (userId === 'host') {
            return <Redirect to={`/platform/ranking/${roomId}/user/host`} />;
          }
          return <Redirect to={`/platform/ranking/${roomId}/user/${userId}`} />;
        }
        return null;
      }}
    </FirebaseDatabaseNode>
  );

  const listenTurn = () => (
    <FirebaseDatabaseNode path={`rooms/${roomId}/players/host/turn`}>
      {({ value }) => {
        if (value !== null) {
          if (value !== userId) {
            setSeconds(10);
            if (gameStart) {
              stop(true, '');
            }
            return null;
          }
          setDisabled(false);
          setResult('');
          intervalRef.current = setInterval(() => {
            setSeconds(s => s - 1);
          }, 1000);
          resetTime(false);
          return null;
        }
        return null;
      }}
    </FirebaseDatabaseNode>
  );

  return (
    <div className={!gameStart ? 'game-backdrop' : null}>
      {listenGameover()}
      {listenTurn()}
      {!gameStart
        && (
          <Ready
            description={t(intl, messages.subwayGame.description)}
            seconds={countSecond}
            title={t(intl, messages.subwayGame.play.title)}
          />
        )}
      <h1>{t(intl, messages.subwayGame.play.title)}</h1>
      <h3>{`${t(intl, messages.subwayGame.selectLine.line[lineNum])}`}</h3>
      {renderAnswer()}
      <p>{`time: ${seconds}`}</p>
      <Row>
        <Col>
          <Input
            placeholder={t(intl, messages.subwayGame.play.input)}
            innerRef={inputRef}
            onKeyPress={onInputPress}
            disabled={disabled}
          />
        </Col>
        <Col>
          <Button type="button" onClick={onClickButton} disabled={disabled}>
            {t(intl, messages.subwayGame.play.button)}
          </Button>
        </Col>
      </Row>
      <p>{result}</p>
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

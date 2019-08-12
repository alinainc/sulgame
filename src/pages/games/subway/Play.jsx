// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Col, Input, Row, Spinner } from 'reactstrap';

import { FirebaseDatabaseNode } from '@react-firebase/database';

import { subwayGame } from '../../../messages';
import shapes from '../../../shapes';
import Ready from '../../components/Ready';
import Station from './Station';

const Play = ({ match: { params: { lineNum, roomId, userId } } }) => {
  const defaultSecond = 10;
  const gameSeconds = 13;
  const inputRef = useRef();
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const stationRef = useRef(Station[lineNum]);
  const [seconds, setSeconds] = useState(gameSeconds);
  const [disabled, setDisabled] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState();
  const [gameStart, setGameStart] = useState(false);
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
        .ref(`rooms/${roomId}/players/host`)
        .update({ turn: userKey });
      return null;
    })();
  }, [roomId, turnCount, userId]);
  useEffect(() => {
    if (!answers.length) {
      const loadSec = (gameSeconds - defaultSecond) * 1000;
      setTimeout(() => {
        setGameStart(true);
      }, loadSec);
    }
    if (stationRef.current.length < 1) {
      setDisabled(true);
      setResult(subwayGame.play.result.finish);
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
      const sec = (answers.length ? defaultSecond : gameSeconds) * 1000;
      timeoutRef.current = setTimeout(() => {
        setDisabled(true);
        setResult(subwayGame.play.result.timeout);
        clearInterval(intervalRef.current);
      }, sec);
    }
  }, [defaultSecond, gameSeconds, answers]);

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

  const onClickButton = () => {
    const input = inputRef.current.value;
    const isExist = stationRef.current.indexOf(input);

    if ((isExist !== -1)) {
      stationRef.current.splice(isExist, 1);
      setAnswers([
        ...answers,
        {
          id: answers.length,
          value: input,
        },
      ]);
      firebase.database()
        .ref(`rooms/${roomId}/players/host/gameData`)
        .push({ input, isWrong: false, userId });
      setTurnCount(turnCount + 1);
      stop(false, subwayGame.play.result.correct, 10);
    } else {
      firebase.database()
        .ref(`rooms/${roomId}/players/host/gameData`)
        .push({ input, isWrong: true, userId });
      firebase.database()
        .ref(`rooms/${roomId}/players/host`)
        .update({ start: 3 });
      stop(true, subwayGame.play.result.wrong);
    }
    inputRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    inputRef.current.value = '';
  };

  const onInputPress = (e) => {
    if (e.charCode === 13) {
      onClickButton();
    }
  };

  const renderAnswer = () => (
    <FirebaseDatabaseNode path={`rooms/${roomId}/players/host/gameData`}>
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        const keys = Object.keys(value);
        const inputs = keys
          .map(key => Object.assign(value[key], { key }));
        return (
          <ul>
            {inputs.map(answer => (<li key={answer.key}>{answer.input}</li>))}
          </ul>
        );
      }}
    </FirebaseDatabaseNode>
  );
  const listenGameover = () => (
    <FirebaseDatabaseNode path={`rooms/${roomId}/players/host/start`}>
      {({ value }) => {
        if (value === 3) {
          if (userId === 'host') {
            return <Redirect to={`/platform/waiting_room/${roomId}/host`} />;
          }
          return <Redirect to={`/platform/waiting_room/${roomId}/user/${userId}`} />;
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
            setDisabled(true);
            setSeconds(13);
            return null;
          }
          setDisabled(false);
          setSeconds(13);
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
            description={subwayGame.description}
            seconds={seconds - defaultSecond}
            title={subwayGame.play.title}
          />
        )}
      <h1>{subwayGame.play.title}</h1>
      <h3>{`${subwayGame.selectLine.line[lineNum]}`}</h3>
      {renderAnswer()}
      <p>{`time: ${seconds}`}</p>
      <Row>
        <Col>
          <Input
            placeholder={subwayGame.play.input}
            innerRef={inputRef}
            onKeyPress={onInputPress}
            disabled={disabled}
          />
        </Col>
        <Col>
          <Button type="button" onClick={onClickButton} disabled={disabled}>
            {subwayGame.play.button}
          </Button>
        </Col>
      </Row>
      <p>{result}</p>
    </div>
  );
};

Play.propTypes = {
  history: shapes.history.isRequired,
  match: shapes.match.isRequired,
};

export default Play;

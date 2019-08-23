// Copyright (C) 2019 Alina Inc. All rights reserved.

import firebase from 'firebase/app';
import { difference } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

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
  const [playerList, setPlayerList] = useState(null);

  useEffect(() => {
    if (userId === 'host') {
      firebase.database()
        .ref('/statistics/plays')
        .push({ gametype: 'subway', time: new Date(Date.now()).toString() });
    }
  }, [userId]);

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
      await setPlayerList(players.val());
    })();
  }, [roomId]);

  useEffect(() => {
    (async () => {
      const cnt = await firebase.database()
        .ref(`rooms/${roomId}/players/host/gameData`)
        .once('value');
      let count;
      if (cnt.val() !== null && cnt.val() !== undefined) {
        count = Object.values(cnt.val()).length;
      } else {
        count = 0;
      }
      const turns = await firebase.database()
        .ref(`rooms/${roomId}/players/host/keys`)
        .once('value');
      const userKey = turns.val()[count % turns.val().length];
      await firebase.database()
        .ref(`rooms/${roomId}/players/host`)
        .update({ turn: userKey });
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
    const answers = await firebase.database()
      .ref(`rooms/${roomId}/players/host/gameData`)
      .once('value');
    const arrAnswers = answers.val() ? Object.values(answers.val()).map(e => e.input) : null;
    const remainedStations = difference(stationRef.current, arrAnswers);
    const isExist = remainedStations.indexOf(input);
    inputRef.current.value = '';
    if ((isExist !== -1)) {
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
            const inputStations = inputs.map(e => e.input);
            const remainedStations = difference(stationRef.current, inputStations);
            if (remainedStations.length === 0) {
              if (userId === 'host') {
                return <Redirect to={`/platform/ranking/${roomId}/user/host`} />;
              }
              return <Redirect to={`/platform/ranking/${roomId}/user/${userId}`} />;
            }

            return (
              <>
                {inputs.map(answer => (
                  <button
                    disabled
                    type="button"
                    id={lineNum.concat('-game')}
                    key={answer.key}
                  >
                    {answer.input}
                  </button>
                ))}
              </>
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
        if (value === 0) {
          return <Redirect to={`/platform/waiting_room/${roomId}/user/${userId}`} />;
        }
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
            toast.warning(
              playerList[value].name.concat(t(intl, messages.subwayGame.turn.players)),
            );
            if (gameStart) {
              stop(true, '');
            }
            return null;
          }
          toast.success(t(intl, messages.subwayGame.turn.yours));
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

  const renderExitButton = () => (
    <FirebaseDatabaseMutation type="update" path={`rooms/${roomId}/players/host`}>
      {({ runMutation }) => (
        <button onClick={() => runMutation({ start: 0 })} type="button" className="button-quit">
          {t(intl, messages.button.quit)}
        </button>
      )}
    </FirebaseDatabaseMutation>
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
      <div className="subway-game">
        {(userId === 'host') ? renderExitButton() : null}
        <h1 id="subway-title">{t(intl, messages.subwayGame.play.title)}</h1>
        <h3>{`🕐 ${seconds}`}</h3>
        <button id={lineNum.concat('-game')} disabled type="button">
          {t(intl, messages.subwayGame.selectLine.line[lineNum])}
        </button>
        {renderAnswer()}
        <div id="subway-label">
          <input
            autoComplete="off"
            id="subway-input"
            placeholder={t(intl, messages.subwayGame.play.input)}
            ref={inputRef}
            onKeyPress={onInputPress}
            disabled={disabled}
          />
          <button id="submit-button" type="button" onClick={onClickButton} disabled={disabled}>
            {t(intl, messages.subwayGame.play.button)}
          </button>
        </div>
        <p>{result}</p>
      </div>
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

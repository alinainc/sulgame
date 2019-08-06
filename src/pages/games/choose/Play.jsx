// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { button, chooseGame } from '../../../messages';
import shapes from '../../../shapes';
import InitWithMount from '../../components/InitWithMount';
import Ready from '../../components/Ready';
import ChoiceList from './ChoiceList';

const Play = ({ match: { params: { roomId, userId } } }) => {
  const [buttonState, setButtonState] = useState(false);
  const resultRef = useRef(Math.floor(Math.random() * 2 + 1));
  const choiceRef = useRef(ChoiceList[Math.floor(Math.random() * ChoiceList.length)]);
  const gameSeconds = 3;
  const totalSeconds = 6;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [gameStart, setGameStart] = useState(false);

  const storeChoice = () => {
    if (userId === 'host') {
      return (
        <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host/`} type="update">
          {({ runMutation }) => {
            const initData = () => runMutation({ choice: choiceRef.current });
            return <InitWithMount init={initData} />;
          }}
        </FirebaseDatabaseMutation>
      );
    }
    return null;
  };

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    const sec = totalSeconds * 1000;
    const loadSec = (totalSeconds - gameSeconds) * 1000;

    setTimeout(() => {
      setGameStart(true);
    }, loadSec);

    setTimeout(() => {
      setButtonState(true);
      clearInterval(id);
    }, sec);
  }, []);

  const onButtonClick = ({ target: { value } }) => {
    resultRef.current = value;
  };

  const renderChoice = () => (
    <FirebaseDatabaseNode path={`/rooms/${roomId}/players/host/choice`}>
      {({ value }) => {
        if (!value) {
          return <Spinner color="primary" />;
        }
        return <h2>{value}</h2>;
      }}
    </FirebaseDatabaseNode>
  );

  if (buttonState) {
    return (
      <>
        <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/host/`} type="update">
          {({ runMutation }) => {
            runMutation({ replay: 0 });
            return null;
          }}
        </FirebaseDatabaseMutation>
        <FirebaseDatabaseMutation path={`/rooms/${roomId}/players/${userId}`} type="update">
          {({ runMutation }) => {
            runMutation({ end: 1, gameData: resultRef.current || 0 });
            if (userId === 'host') {
              return <Redirect to={`/platform/ranking/${roomId}/user/host`} />;
            }
            return <Redirect to={`/platform/ranking/${roomId}/user/${userId}`} />;
          }}
        </FirebaseDatabaseMutation>
      </>
    );
  }

  return (
    <div className={!gameStart ? 'game-backdrop' : 'game-container'}>
      {!gameStart
        ? (
          <Ready
            description={chooseGame.description}
            gameStart={gameStart}
            seconds={seconds - gameSeconds}
            title={chooseGame.title}
          />
        )
        : null
      }
      {storeChoice()}
      <h5 className="game-header">{chooseGame.title}</h5>
      <div className="game-body">
        <p>{chooseGame.description}</p>
        <p>{`${chooseGame.time}: ${seconds > gameSeconds ? gameSeconds : seconds}`}</p>
        {renderChoice()}
        <Button
          disabled={buttonState}
          onClick={onButtonClick}
          size="lg"
          value="A"
        >
          {button.A}
        </Button>
        <Button
          disabled={buttonState}
          onClick={onButtonClick}
          size="lg"
          value="B"
        >
          {button.B}
        </Button>
      </div>
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

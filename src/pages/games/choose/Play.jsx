// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';

import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';

import { button, chooseGame } from '../../../messages';
import shapes from '../../../shapes';
import InitWithMount from '../../components/InitWithMount';
import ChoiceList from './ChoiceList';

const Play = ({ match: { params: { roomId, userId } } }) => {
  const [seconds, setSeconds] = useState(3);
  const [buttonState, setButtonState] = useState(false);
  const resultRef = useRef(Math.floor(Math.random() * 2 + 1));
  const choiceRef = useRef(ChoiceList[Math.floor(Math.random() * ChoiceList.length)]);

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

    setTimeout(() => {
      setButtonState(true);
      clearInterval(id);
    }, 3000);
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
        return <h6>{value}</h6>;
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
    <div className="container">
      {storeChoice()}
      <h2>{chooseGame.title}</h2>
      <p>{chooseGame.description}</p>
      <p>{`${chooseGame.time}: ${seconds}`}</p>
      {renderChoice()}
      <Button disabled={buttonState} onClick={onButtonClick} size="lg" value="A">{button.A}</Button>
      <Button disabled={buttonState} onClick={onButtonClick} size="lg" value="B">{button.B}</Button>
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

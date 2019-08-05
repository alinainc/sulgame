// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { button, chooseGame } from '../../../messages';
import shapes from '../../../shapes';
import ChoiceList from './ChoiceList';

const Play = ({ match: { params: { roomId, userId } } }) => {
  const [seconds, setSeconds] = useState(3);
  const [buttonState, setButtonState] = useState(false);
  const resultRef = useRef(Math.floor(Math.random() * 2 + 1));
  const choiceRef = useRef(ChoiceList[Math.floor(Math.random() * ChoiceList.length)]);

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
      <h2>{chooseGame.title}</h2>
      <p>{chooseGame.description}</p>
      <p>{`${chooseGame.time}: ${seconds}`}</p>
      <h6>{choiceRef.current}</h6>
      <Button disabled={buttonState} onClick={onButtonClick} size="lg" value="1">{button.A}</Button>
      <Button disabled={buttonState} onClick={onButtonClick} size="lg" value="2">{button.B}</Button>
    </div>
  );
};

Play.propTypes = {
  match: shapes.match.isRequired,
};

export default Play;

// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button, Col, Input, Row } from 'reactstrap';

import { subwayGame } from '../../../messages';
import Station from './Station';

const Play = () => {
  const defaultSecond = 10;
  const inputRef = React.useRef();
  const intervalRef = React.useRef();
  const timeoutRef = React.useRef();
  const lineNum = React.useRef(Math.floor(Math.random() * 9) + 1);
  const stationRef = React.useRef(Station[`line${lineNum.current}`]);
  const [seconds, setSeconds] = React.useState(defaultSecond);
  const [disabled, setDisabled] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);
  const [result, setResult] = React.useState();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    intervalRef.current = intervalId;

    const sec = defaultSecond * 1000;
    const timeoutId = setTimeout(() => {
      setResult(subwayGame.resultTimeout);
      setDisabled(true);
      clearInterval(intervalId);
    }, sec);
    timeoutRef.current = timeoutId;
  }, [defaultSecond, answers]);

  const stop = (disabledButton, resultText, initSeconds) => {
    if (disabledButton) {
      setDisabled(disabledButton);
    }
    if (resultText) {
      setResult(resultText);
    }
    if (initSeconds) {
      setSeconds(initSeconds);
    }
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
      stop(false, subwayGame.resultCorrect, 10);
    } else {
      stop(true, subwayGame.resultWrong);
    }

    if (stationRef.current.length < 1) {
      stop(true, subwayGame.resultFinish);
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
      inputRef.current.value = '';
    }
  };
  return (
    <div>
      <h1>{subwayGame.title}</h1>
      <h3>{`${lineNum.current}${subwayGame.line}`}</h3>
      <ul>
        { answers.map(answer => (<li key={answer.id}>{answer.value}</li>))}
      </ul>
      <p>{`time: ${seconds}`}</p>
      <Row>
        <Col>
          <Input
            placeholder={subwayGame.input}
            innerRef={inputRef}
            onKeyPress={onInputPress}
            disabled={disabled}
          />
        </Col>
        <Col>
          <Button type="button" onClick={onClickButton} disabled={disabled}>
            {subwayGame.button}
          </Button>
        </Col>
      </Row>
      <p>{result}</p>
    </div>
  );
};

export default Play;

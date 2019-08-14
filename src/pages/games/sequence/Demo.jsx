// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { messages, t } from '@frontend/i18n';
import shapes from '@frontend/shapes';
import Ready from 'components/Ready';

const Demo = ({ history }) => {
  const intl = useIntl();
  const answerRef = useRef(1);
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const [isClicked] = useState(Array(9).fill(false));
  const [milliseconds, setMilliseconds] = useState(0);
  const [loadSeconds, setLoadSeconds] = useState(3);
  const [result, setResult] = useState('');
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState('');

  useEffect(() => {
    const load = setInterval(() => {
      setLoadSeconds(s => s - 1);
    }, 1000);

    setTimeout(() => {
      setGameStart(true);
      clearInterval(load);

      const intervalId = setInterval(() => {
        setMilliseconds(s => s + 1);
      }, 100);

      intervalRef.current = intervalId;
    }, 3000);

    timeoutRef.current = setTimeout(() => {
      setGameOver(t(intl, messages.sequenceGame.result.timeOut));
      clearInterval(intervalRef.current);
    }, 13100);
  }, [intl]);

  const onButtonClick = ({ target: { value } }) => {
    if (Number(value) === answerRef.current && answerRef.current < 9) {
      answerRef.current += 1;
      isClicked[value - 1] = true;
      setResult(t(intl, messages.sequenceGame.result.playing));
    } else if (Number(value) !== answerRef.current) {
      setResult(t(intl, messages.sequenceGame.result.fail));
    } else {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      isClicked[value - 1] = true;
      setResult(t(intl, messages.sequenceGame.result.success));
    }
  };

  const createShuffledArray = () => {
    const array = Array.from(Array(9)).map((e, i) => i + 1);
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const arrayRef = useRef(createShuffledArray());

  const createButtons = (index) => {
    const buttons = [];
    for (let i = 0; i < 3; i += 1) {
      buttons.push(
        <button
          type="button"
          id="sequence-button"
          disabled={isClicked[index[i] - 1]}
          key={index[i]}
          onClick={onButtonClick}
          value={index[i]}
        >
          {index[i]}
        </button>,
      );
    }
    return buttons;
  };

  const createGameBoard = () => {
    const gameBoard = [];
    for (let i = 0; i < 3; i += 1) {
      gameBoard.push(
        <div className="game-board" key={i}>
          {createButtons(arrayRef.current.slice(i * 3, i * 3 + 3))}
        </div>,
      );
    }
    return gameBoard;
  };

  if (result === t(intl, messages.sequenceGame.result.success) || gameOver) {
    return (
      <div className="ranking">
        <h1>{t(intl, messages.ranking.title)}</h1>
        <button id="replay-btn" type="button" onClick={() => history.push('/')}>
          게임하러 가기
        </button>
        {`결과 : ${gameOver ? '시간 초과' : milliseconds}`}
        {/* <ReplayButton history={history} roomId={roomId} isHost={isHost}/> */}
      </div>
    );
  }

  return (
    <div className={!gameStart ? 'game game-backdrop' : 'game game-container'}>
      {!gameStart
        ? (
          <Ready
            description={t(intl, messages.sequenceGame.description)}
            gameStart={gameStart}
            seconds={loadSeconds}
            title={t(intl, messages.sequenceGame.title)}
          />
        )
        : null
      }
      <h1>{t(intl, messages.sequenceGame.title)}</h1>
      <p className="description">{t(intl, messages.sequenceGame.description)}</p>
      <p className="time">{`${t(intl, messages.sequenceGame.time)}: ${milliseconds}`}</p>
      <p className="time">{`${t(intl, messages.sequenceGame.result.title)}: ${result}`}</p>
      <div>
        {createGameBoard()}
      </div>
    </div>
  );
};

Demo.propTypes = {
  history: shapes.history.isRequired,
};
export default Demo;

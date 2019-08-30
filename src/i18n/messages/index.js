// Copyright (C) 2019 Alina Inc. All rights reserved.
import flatten from 'flat';

import button from './button';
import chooseGame from './chooseGame';
import clickGame from './clickGame';
import entry from './entry';
import feedback from './feedback';
import mainPage from './mainPage';
import ranking from './ranking';
import rouletteGame from './rouletteGame';
import sequenceGame from './sequenceGame';
import subwayGame from './subwayGame';
import waitingRoom from './waitingRoom';

// let subway game on the first place
// eslint-disable-next-line sort-keys
const games = { subwayGame, chooseGame, clickGame, rouletteGame, sequenceGame };

export {
  button,
  chooseGame,
  clickGame,
  entry,
  feedback,
  games,
  mainPage,
  ranking,
  rouletteGame,
  sequenceGame,
  subwayGame,
  waitingRoom,
};

export default flatten({
  button,
  chooseGame,
  clickGame,
  entry,
  feedback,
  mainPage,
  ranking,
  rouletteGame,
  sequenceGame,
  subwayGame,
  waitingRoom,
});

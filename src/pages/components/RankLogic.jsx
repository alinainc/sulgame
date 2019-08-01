// Copyright (C) 2019 Alina Inc. All rights reserved.

const RankLogic = (items) => {
  switch (items[0].start) {
    case 1:
      items.sort((a, b) => (parseFloat(b.gameData) - parseFloat(a.gameData)));
      break;
    case 2:
      items.sort((a, b) => (parseFloat(a.gameData) - parseFloat(b.gameData)));
      break;
    default:
      items.sort((a, b) => (parseFloat(b.gameData) - parseFloat(a.gameData)));
  }
};

export default RankLogic;

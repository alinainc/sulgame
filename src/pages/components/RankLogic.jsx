// Copyright (C) 2019 Alina Inc. All rights reserved.

const RankLogic = (items) => {
  items.forEach((item) => {
    if (item.gametype) {
      switch (item.gametype) {
        case 'choose':
          items.sort((a, b) => (a.gameData > b.gameData ? 1 : -1));
          break;
        case 'click':
          items.sort((a, b) => (parseFloat(b.gameData) - parseFloat(a.gameData)));
          break;
        case 'sequence':
          items.sort((a, b) => (parseFloat(a.gameData) - parseFloat(b.gameData)));
          break;
        default:
          items.sort((a, b) => (parseFloat(b.gameData) - parseFloat(a.gameData)));
          break;
      }
    }
  });
};

export default RankLogic;

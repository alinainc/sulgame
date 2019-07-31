// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button } from 'reactstrap';

import shapes from '../shapes';
import mainPage from '../messages/mainPage';

const MainPage = (history) => {
  const onClickButton = () => {
    console.log(mainPage.button);
  };
  return (
    <div>
      <h2>{mainPage.title}</h2>
      <Button type="button" onClick={onClickButton}>
        {mainPage.button}
      </Button>
    </div>
  );
};

MainPage.propTypes = {
  history: shapes.history.isRequired,
};

export default MainPage;
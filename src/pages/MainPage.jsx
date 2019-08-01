// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button } from 'reactstrap';
import shapes from 'shapes';

import { mainPage } from 'messages';

const MainPage = ({ history }) => {
  const onClickButton = () => {
    history.push('/platform/entry');
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

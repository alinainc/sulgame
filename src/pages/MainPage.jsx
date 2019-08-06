// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';

import mainPage from '../messages/mainPage';
import shapes from '../shapes';

const MainPage = ({ history }) => {
  const onClickButton = () => {
    history.push('/platform/entry');
  };
  return (
    <div className="mainpage">
      <div>
        <div className="moon" />
        <h1>{mainPage.title}</h1>
      </div>
      <div className="bottom center">
        <div>
          <div>{mainPage.button}</div>
        </div>
        <button type="button" onClick={onClickButton}>
          <span>+</span>
        </button>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  history: shapes.history.isRequired,
};

export default MainPage;

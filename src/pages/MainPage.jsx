// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';

import mainPage from '../messages/mainPage';
import shapes from '../shapes';

const MainPage = ({ history }) => {
  const onClickButton = () => {
    history.push('/platform/entry');
  };

  const onFeedbackClick = () => {
    history.push('/platform/rating');
  };

  return (
    <div className="mainpage">
      <div>
        <div className="moon" />
        <h1>{mainPage.title}</h1>
      </div>
      <div className="bottom center">
        <div>
          <div className="msg">{mainPage.button}</div>
        </div>
        <button type="button" onClick={onClickButton}>
          <span>+</span>
        </button>
      </div>
      <div>
        <footer className="footer">
          <button type="button" className="feedback" onClick={onFeedbackClick}>
            <span role="img" aria-label="feedback">✉️</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  history: shapes.history.isRequired,
};

export default MainPage;

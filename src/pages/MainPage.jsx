// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';

import mainPage from '../i18n/messages/mainPage';
import shapes from '../shapes';

const MainPage = ({ history, localeCallback }) => {
  const onClickButton = () => {
    history.push('/platform/entry');
  };

  const onFeedbackClick = () => {
    history.push('/platform/rating');
  };

  const onEnglishClick = () => {
    localeCallback('en');
  };

  const onKoreanClick = () => {
    localeCallback('ko');
  };

  return (
    <div className="mainpage">
      <div>
        <div className="moon" />
        <h1 className="title">{mainPage.title}</h1>
      </div>
      <div>
        <div>
          <div className="msg">{mainPage.button}</div>
        </div>
        <button type="button" onClick={onClickButton} id="add-button">
          <span>+</span>
        </button>
      </div>
      <div>
        <button type="button" onClick={onFeedbackClick} className="feedback-button">
          <span role="img" aria-label="feedback">✉️</span>
        </button>
      </div>
      <div>
        <button type="button" onClick={onEnglishClick}>
          English
        </button>
        <button type="button" onClick={onKoreanClick}>
          Korean
        </button>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  history: shapes.history.isRequired,
  localeCallback: PropTypes.func.isRequired,
};

export default MainPage;

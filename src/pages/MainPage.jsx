// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { messages, t } from '../i18n';
import shapes from '../shapes';

const MainPage = ({ history, localeCallback }) => {
  const intl = useIntl();
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
        <h1 className="title">{t(intl, messages.mainPage.title)}</h1>
      </div>
      <div>
        <div>
          <div className="msg">{t(intl, messages.mainPage.button)}</div>
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
          {t(intl, messages.button.english)}
        </button>
        <button type="button" onClick={onKoreanClick}>
          {t(intl, messages.button.korean)}
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

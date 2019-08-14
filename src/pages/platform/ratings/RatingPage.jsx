// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

import { messages, t } from '@frontend/i18n';
import Footer from 'components/Footer';
import Rating from 'components/Rating';

const RatingPage = ({ history }) => {
  const intl = useIntl();
  return (
    <div className="rating">
      <div>
        <button className="close" onClick={() => history.goBack()} type="button">×</button>
      </div>
      <div id="description">
        <p>{t(intl, messages.feedback.title)}</p>
        <p>{t(intl, messages.feedback.contents1)}</p>
        <p>{t(intl, messages.feedback.contents2)}</p>
        <p>{t(intl, messages.feedback.contents3)}</p>
        <p>{t(intl, messages.feedback.end)}</p>
      </div>
      <div>
        <Rating history={history} />
      </div>
      <Footer />
    </div>
  );
};

RatingPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default RatingPage;

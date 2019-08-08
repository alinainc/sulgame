// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React from 'react';

import messages from '../../../messages';
import Footer from '../../components/Footer';
import Rating from '../../components/Rating';

const RatingPage = ({ history }) => (
  <div className="rating">
    <div id="description">
      <p>{messages.feedback.title}</p>
      <p>{messages.feedback.contents1}</p>
      <p>{messages.feedback.contents2}</p>
      <p>{messages.feedback.contents3}</p>
      <p>{messages.feedback.end}</p>
    </div>
    <div>
      <Rating history={history} />
    </div>
    <Footer />
  </div>
);

RatingPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default RatingPage;

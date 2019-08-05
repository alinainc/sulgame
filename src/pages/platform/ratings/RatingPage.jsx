// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button } from 'reactstrap';

import messages from '../../../messages';
import Rating from '../../components/Rating';

const RatingPage = () => (
  <div className="container">
    <div className="outer">
      <div className="inner">
        <div className="centered">
          <div className="gap">
            <div className="feedback description">
              <p>{messages.feedback.title}</p>
              <p>{messages.feedback.contents1}</p>
              <p>{messages.feedback.contents2}</p>
              <p>{messages.feedback.contents3}</p>
              <p>{messages.feedback.end}</p>
            </div>
            <Rating />
            <div>
              <Button type="button" className="btn rating">submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


RatingPage.propTypes = {
};

export default RatingPage;

// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useRef } from 'react';
import Ratings from 'react-ratings-declarative';
import { Input } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import messages from '../../messages';
import shapes from '../../shapes';

const Rating = ({ history }) => {
  const inputRating = useRef(0);
  const inputRef = useRef(null);
  const emailRef = useRef(null);
  const options = {
    widgetDimension: '30px',
    widgetHoverColor: '#f3d076',
    widgetRatedColor: '#f3d076',
  };
  const SubmitButton = (
    <FirebaseDatabaseMutation path="/feedback" type="push">
      {({ runMutation }) => (
        <button
          type="button"
          className="rating"
          onClick={
            () => {
              history.goBack();
              runMutation({
                contents: inputRef.current.value,
                email: emailRef.current.value,
                star: inputRating.current,
              });
              return null;
            }
          }
        >
          {messages.button.submit}
        </button>
      )}
    </FirebaseDatabaseMutation>
  );
  return (
    <div>
      <Input className="textarea" innerRef={inputRef} type="textarea" />
      <Input className="emailarea" innerRef={emailRef} placeholder={messages.feedback.email} type="textarea" />
      <Ratings
        rating={inputRating.current}
        widgetRatedColors="blue"
        changeRating={(value) => { inputRating.current = value; }}
      >
        <Ratings.Widget {...options} />
        <Ratings.Widget {...options} />
        <Ratings.Widget {...options} />
        <Ratings.Widget {...options} />
        <Ratings.Widget {...options} />
      </Ratings>
      {SubmitButton}
    </div>
  );
};

Rating.propTypes = {
  history: shapes.history.isRequired,
};

export default Rating;

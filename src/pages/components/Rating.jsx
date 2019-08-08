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
          id="submit-btn"
        >
          {messages.button.submit}
        </button>
      )}
    </FirebaseDatabaseMutation>
  );
  return (
    <>
      <textarea
        id="review"
        ref={inputRef}
        type="textarea"
      />
      <textarea
        id="email"
        ref={emailRef}
        placeholder={messages.feedback.email}
        type="textarea"
      />
      <div>
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
      </div>
      {SubmitButton}
    </>
  );
};

Rating.propTypes = {
  history: shapes.history.isRequired,
};

export default Rating;

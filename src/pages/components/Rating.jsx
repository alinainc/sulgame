// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Ratings from 'react-ratings-declarative';
import { Button, Input } from 'reactstrap';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import messages from '../../messages';

const Rating = ({ history }) => {
  const inputRating = useRef(0);
  const inputRef = useRef(null);
  const options = {
    widgetDimension: '30px',
    widgetHoverColor: '#f3d076',
    widgetRatedColor: '#f3d076',
  };
  const SubmitButton = (
    <FirebaseDatabaseMutation path="/feedback" type="push">
      {({ runMutation }) => (
        <Button
          type="button"
          className="btn rating"
          onClick={
            () => {
              history.goBack();
              runMutation({ contents: inputRef.current.value, star: inputRating.current });
              return null;
            }
          }
        >
          {messages.button.submit}
        </Button>
      )}
    </FirebaseDatabaseMutation>
  );
  return (
    <div>
      <Input className="textarea" innerRef={inputRef} type="textarea" />
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
  history: PropTypes.shape({}).isRequired,
};

export default Rating;

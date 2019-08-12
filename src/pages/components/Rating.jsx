// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import Ratings from 'react-ratings-declarative';
import { toast } from 'react-toastify';

import { FirebaseDatabaseMutation } from '@react-firebase/database';

import { messages, t } from '../../i18n';
import shapes from '../../shapes';

const Rating = ({ history }) => {
  const intl = useIntl();
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
              if (!inputRef.current.value) {
                toast.error(t(intl, messages.feedback.nocontents));
                return null;
              }
              if (inputRating.current === 0) {
                toast.error(t(intl, messages.feedback.norating));
                return null;
              }
              history.goBack();
              runMutation({
                contents: inputRef.current.value,
                email: emailRef.current.value,
                star: inputRating.current,
                time: new Date(Date.now()).toString(),
              });
              return null;
            }
          }
          id="submit-btn"
        >
          {t(intl, messages.button.submit)}
        </button>
      )}
    </FirebaseDatabaseMutation>
  );
  return (
    <>
      <textarea
        id="review"
        ref={inputRef}
        placeholder={t(intl, messages.feedback.type)}
        type="textarea"
      />
      <textarea
        id="email"
        ref={emailRef}
        placeholder={t(intl, messages.feedback.email)}
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

// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useState } from 'react';
import Ratings from 'react-ratings-declarative';

const Rating = () => {
  const [state, setState] = useState(1);
  const options = {
    widgetDimension: '30px',
    widgetHoverColor: '#f3d076',
    widgetRatedColor: '#f3d076',
  };
  return (
    <Ratings
      rating={state.rating}
      widgetRatedColors="blue"
      changeRating={e => setState({ rating: e })}
    >
      <Ratings.Widget {...options} />
      <Ratings.Widget {...options} />
      <Ratings.Widget {...options} />
      <Ratings.Widget {...options} />
      <Ratings.Widget {...options} />
    </Ratings>
  );
};

export default Rating;

// Copyright (C) 2019 Alina Inc. All rights reserved.

import React, { useState } from 'react';
import Ratings from 'react-ratings-declarative';

const Rating = () => {
  const [state, setState] = useState(1);
  return (
    <Ratings
      rating={state.rating}
      widgetRatedColors="blue"
      changeRating={e => setState({ rating: e })}
    >
      <Ratings.Widget widgetDimension="30px" widgetHoverColor="#f3d076" />
      <Ratings.Widget widgetDimension="30px" widgetHoverColor="#f3d076" />
      <Ratings.Widget widgetDimension="30px" widgetHoverColor="#f3d076" />
      <Ratings.Widget widgetDimension="30px" widgetHoverColor="#f3d076" />
      <Ratings.Widget widgetDimension="30px" widgetHoverColor="#f3d076" />
    </Ratings>
  );
};

export default Rating;

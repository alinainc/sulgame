// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';

export const location = PropTypes.shape({
  search: PropTypes.string.isRequired,
});

export const match = PropTypes.shape({
  params: PropTypes.shape({
    isHost: PropTypes.string,
    roomId: PropTypes.string,
    url: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
});

export const params = PropTypes.shape({
  isHost: PropTypes.string,
  roomId: PropTypes.string.isRequired,
  userId: PropTypes.string,
});

export const history = PropTypes.shape({
  push: PropTypes.func.isRequired,
});

export const option = PropTypes.shape({
  intro: PropTypes.bool,
});

export default {
  history,
  location,
  match,
  option,
};

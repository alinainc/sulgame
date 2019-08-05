// Copyright (C) 2019 Alina Inc. All rights reserved.

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const InitWithMount = ({ init }) => {
  useEffect(() => {
    init();
  }, []);
  return null;
};

InitWithMount.propTypes = {
  init: PropTypes.func.isRequired,
};

InitWithMount.defaultProps = {
  isHost: undefined,
};

export default InitWithMount;

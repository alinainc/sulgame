// Copyright (C) 2019 Alina Inc. All rights reserved.
import PropTypes from 'prop-types';
import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const Ready = ({ description, seconds, title }) => (
  <Modal centered isOpen>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>{seconds}</ModalBody>
    <ModalFooter>{description}</ModalFooter>
  </Modal>
);

Ready.propTypes = {
  description: PropTypes.string.isRequired,
  seconds: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default Ready;

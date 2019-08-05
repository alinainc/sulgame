// Copyright (C) 2019 Alina Inc. All rights reserved.
import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Ready = ({ description, seconds, title }) => {
  // const [seconds, setSeconds] = useState(3);
  // useEffect(() => {
  //   let interval = null;
  //   if (seconds > 1) {
  //     interval = setInterval(() => {
  //       setSeconds(n => n - 1);
  //     }, 1000);
  //   } else {
  //     clearInterval(interval);
  //     setGameStart(true);
  //   }
  //   return () => clearInterval(interval);
  // }, [seconds]);

  // // FIXME 게임제목 to real game name for each game
  // // FIXME 한줄설명to real game explanation for each game
  return (
    <Modal centered isOpen>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{seconds}</ModalBody>
      <ModalFooter>{description}</ModalFooter>
    </Modal>
  );
};

export default Ready;

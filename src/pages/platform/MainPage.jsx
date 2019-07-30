// Copyright (C) 2019 Alina Inc. All rights reserved.

import React from 'react';
import { Button } from 'reactstrap';

import mainPage from '../../messages/mainPage';

const MainPage = () => {
/* eslint-disable */
	const onClickButton = () => console.log(mainPage.button); 
	return (
		<div>
			{mainPage.title}
			<Button type="button" onClick={onClickButton}>
				{mainPage.button}
			</Button>
		</div>
	);
};

export default MainPage;
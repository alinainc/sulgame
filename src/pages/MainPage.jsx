import React from 'react';
import { Button } from 'reactstrap';

import mainPage from './../messages/mainPage';

const MainPage = () => {
    const onClickButton = () => {
        console.log(mainPage.button);
    };
    return (
        <div>
            <h2>{mainPage.title}</h2>
            <Button type="button" onClick={onClickButton}>
                {mainPage.button}
            </Button>
        </div>
    );
};

export default MainPage;
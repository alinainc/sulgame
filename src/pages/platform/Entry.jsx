import React from 'react';
import { Button, Input, Row } from 'reactstrap';

import entry from './../../messages/entry';

const Entry = () => {
    const onClickButton = () => {
        console.log(entry.button);
    };
    return (
        <div className="containers">
            <h2>{entry.title}</h2>
            <Row>
                <Input placeholder={entry.nickName} />
            </Row>
            <Row>
                <Button type="button" onClick={onClickButton}>
                    {entry.button}
                </Button>
            </Row>
        </div>
    );
}

export default Entry;
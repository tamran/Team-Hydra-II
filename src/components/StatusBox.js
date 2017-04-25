import React from 'react';
import { Panel } from 'react-bootstrap';

const StatusBox = ({ text, time, isAlive }) => (
    <div>
        <Panel>
            {`Last time was alive: ${isAlive.time}`}
        </Panel>
        <Panel>
            {`${text}: ${time}`}
        </Panel>
    </div>
)

export default StatusBox;

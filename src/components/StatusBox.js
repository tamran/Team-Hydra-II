import React from 'react';
import { Panel } from 'react-bootstrap';

const StatusBox = ({ text, time }) => (
    <Panel>
        {`${text}: ${time}`}
    </Panel>
)

export default StatusBox;

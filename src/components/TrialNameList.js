import React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

const TrialNameList = ({ name, trialNames }) => (
    <ListGroup>
        {trialNames.map((name, index)=> 
            <ListGroupItem key={index}>{`${name}`}</ListGroupItem>
        )}
    </ListGroup>
)

export default TrialNameList;

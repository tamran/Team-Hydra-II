import React from 'react';
import { Accordion, Panel, Col } from 'react-bootstrap';
import TrialNameList from './TrialNameList';

const Folder = ({ name, trialNames }) => (
    <Accordion>
        <Panel header={name} eventKey="1">
            <Col xs={10} xsOffset={1}>
                <TrialNameList 
                    name={name} 
                    trialNames={trialNames}  
                />
            </Col>
        </Panel>
    </Accordion>
)

export default Folder;

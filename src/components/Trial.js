import React from 'react';
import { Accordion, Panel, Col } from 'react-bootstrap';
import ExperimentMeasurementList from './ExperimentMeasurementList';

const Trial = ({ name, measurements }) => (
    <Accordion>
        <Panel header={name} eventKey="1">
            <Col xs={10} xsOffset={1}>
                <ExperimentMeasurementList name={name} measurements={measurements} />
            </Col>
        </Panel>
    </Accordion>
)

export default Trial;

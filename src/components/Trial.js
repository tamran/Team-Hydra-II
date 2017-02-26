import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import ExperimentMeasurementList from './ExperimentMeasurementList';

const Trial = ({ name, measurements }) => (
    <Panel header={name} >
        <Col xs={10} xsOffset={1}>
            <ExperimentMeasurementList name={name} measurements={measurements} />
        </Col>
    </Panel>
)

export default Trial;

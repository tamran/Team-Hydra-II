import React from 'react';
import { Row, Col } from 'react-bootstrap';
import VisibleExperimentMeasurementList from '../containers/VisibleExperimentMeasurementList';

const ExperimentStatusPage = () => (
        <Row>
            <Col xs={12}>
                <h1>Current Experiment Measurements</h1>
                <VisibleExperimentMeasurementList />
            </Col>
        </Row>
)

export default ExperimentStatusPage;

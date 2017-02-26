import React from 'react';
import { Row, Col, Jumbotron, FormControl, Form, Button } from 'react-bootstrap';
import VisibleStatusBox from '../containers/VisibleStatusBox';
import VisibleExperimentSubmissionForm  from '../containers/VisibleExperimentSubmissionForm';
import VisibleExperimentMeasurementList from '../containers/VisibleExperimentMeasurementList';

const WelcomePage = () => (
        <Row>
            <Col xs={12}>
                <Jumbotron>
                    <h1>Welcome to Team Hydra II!</h1>
                    <p>
                        This page is used for handling data collection and data management.
                    </p>
                </Jumbotron>
                <VisibleExperimentSubmissionForm />
                <VisibleStatusBox/>
            </Col>
        </Row>
)

export default WelcomePage;

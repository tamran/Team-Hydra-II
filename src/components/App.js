import React from 'react';

import { Grid, Row, Col, Jumbotron, FormControl, Form, Button } from 'react-bootstrap';
import NavbarInstance from './Navbar';
import VisibleExperimentSubmissionForm  from '../containers/VisibleExperimentSubmissionForm';

const App = ({ params }) => (
    <div>
        <NavbarInstance />
        <Grid>
            <Row>
                <Col xs={12}>
                    <Jumbotron>
                        <h1>Welcome to Team Hydra II!</h1>
                        <p>
                            This page is used for handling data collection and data management.
                        </p>
                    </Jumbotron>
                    <VisibleExperimentSubmissionForm />
                </Col>
            </Row>
        </Grid>
    </div>
);

export default App;

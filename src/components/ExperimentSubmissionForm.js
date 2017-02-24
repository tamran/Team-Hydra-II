import React, { PropTypes } from 'react';
import { Form, FormGroup, Col, Row, Button } from 'react-bootstrap';
import TextInputField from './TextInputField';

const ExperimentSubmissionForm = ({ dataFields, onChangeText, onSubmit }) => (
    <div>
        <Form horizontal onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
            <Row>
                <Col xs={10}>
                        {Object.keys(dataFields.byId).map((key, index) => 
                            <TextInputField key={index} label={dataFields.byId[key].label} fieldText={dataFields.byId[key].text} onChange={onChangeText} />
                        )}
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Button type="submit">Run Experiment</Button>
                </Col>
            </Row>
        </Form>
    </div>
);

export default ExperimentSubmissionForm;

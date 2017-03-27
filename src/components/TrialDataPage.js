import React from 'react';
import { Row, Col } from 'react-bootstrap';
import VisibleTrialDataList from '../containers/VisibleTrialDataList';
import VisibleSearchBar from '../containers/VisibleSearchBar';

const TrialDataPage = () => (
        <Row>
            <Col xs={12}>
                <h1>Trial Browser</h1>
                <VisibleSearchBar label="Filter" />
                <VisibleTrialDataList />
            </Col>
        </Row>
)

export default TrialDataPage;

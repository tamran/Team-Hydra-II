import React from 'react';
import { Row, Col } from 'react-bootstrap';
import VisibleSearchBar from '../containers/VisibleSearchBar';
import VisibleFolderList from '../containers/VisibleFolderList';

const FolderPage = () => (
        <Row>
            <Col xs={12}>
                <h1>Folder Browser</h1>
                <VisibleSearchBar label="Filter" searchFor="folders" />
                <VisibleFolderList />
            </Col>
        </Row>
)

export default FolderPage;

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import VisibleSearchBar from '../containers/VisibleSearchBar';
import VisibleFolderList from '../containers/VisibleFolderList';
import VisibleFolderCreationForm from '../containers/VisibleFolderCreationForm';
import VisibleFolderUpdateForm from '../containers/VisibleFolderUpdateForm';

const FolderPage = () => (
        <Row>
            <Col xs={12}>
                <h1>Create New Folder</h1>
                <VisibleFolderCreationForm buttonText="Create Folder"/>
                <h1>Add Trial To Folder</h1>
                <VisibleFolderUpdateForm buttonText="Update Folder"/>
                <h1>Folder Browser</h1>
                <VisibleSearchBar label="Filter" searchFor="folders" />
                <VisibleFolderList />
            </Col>
        </Row>
)

export default FolderPage;

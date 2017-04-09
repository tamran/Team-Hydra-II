import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Folder from './Folder';

const FolderList = ({ folderInfo }) => (
    <ListGroup>
        {Object.keys(folderInfo).map((folderName, index) => 
            <Folder 
                key={index} 
                name={folderName} 
                trialNames={folderInfo[folderName].trials}
            />
        )}
    </ListGroup>
)

export default FolderList;

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Trial from './Trial';

const TrialDataList = ({ allExperimentInfo }) => (
    <ListGroup>
        {Object.keys(allExperimentInfo).map((trialName, index) => 
            <Trial 
                key={index} 
                name={trialName} 
                measurements={allExperimentInfo[trialName].measurements} />
        )}
    </ListGroup>
)

export default TrialDataList;

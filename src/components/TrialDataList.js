import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Trial from './Trial';

const TrialDataList = ({ allExperimentInfo }) => (
    <ListGroup>
        {Object.keys(allExperimentInfo).map((trialName, index) => 
            <Trial 
                key={index} 
                name={trialName} 
                colorMeasurements={allExperimentInfo[trialName].measurements.color} 
                turbidityMeasurements={allExperimentInfo[trialName].measurements.turbidity} 
                electrochemicalMeasurements={allExperimentInfo[trialName].measurements.electrochemical} 
            />
        )}
    </ListGroup>
)

export default TrialDataList;

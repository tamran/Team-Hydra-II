import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ExperimentMeasurementItem from './ExperimentMeasurementItem'

const ExperimentMeasurementList = ({ measurements }) => (
    <ListGroup>
        {measurements.map((measurement, index)=> 
            <ExperimentMeasurementItem 
                key={index}
                name={measurement.trialName}
                time={measurement.currentTime}
                R={measurement.R}
                G={measurement.G}
                B={measurement.B}
                ColorTemp={measurement.ColorTemp}
                lux={measurement.lux}
            />
        )}
    </ListGroup>
)

export default ExperimentMeasurementList;

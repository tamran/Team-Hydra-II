import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ExperimentMeasurementItem from './ExperimentMeasurementItem'

const ExperimentMeasurementList = ({ name, measurements }) => (
    <ListGroup>
        {measurements.map((measurement, index)=> 
            <ExperimentMeasurementItem 
                key={index}
                name={name || measurement.name}
                time={measurement.time}
                R={measurement.R}
                G={measurement.G}
                B={measurement.B}
                C={measurement.C}
                ColorTemp={measurement.ColorTemp}
                lux={measurement.lux}
            />
        )}
    </ListGroup>
)

export default ExperimentMeasurementList;

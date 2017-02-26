import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const ExperimentMeasurementItem = ({ name, time, R, G, B, ColorTemp, lux }) => (
    <ListGroupItem>
    {
        `Experiment: ${name}, Time: ${time}, R: ${R}, G: ${G}, B: ${B}, ColorTemp: ${ColorTemp}, lux: ${lux}`
    }
    </ListGroupItem>
)

export default ExperimentMeasurementItem;

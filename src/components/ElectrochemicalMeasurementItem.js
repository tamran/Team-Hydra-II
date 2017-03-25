import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

const ElectrochemicalMeasurementItem = ({ name, time, Aluminum, StainlessSteel, Titanium }) => (
    <ListGroupItem>
    {
        `Experiment: ${name}, Time: ${time}, Aluminum: ${Aluminum}, StainlessSteel: ${StainlessSteel}, Titanium: ${Titanium}`
    }
    </ListGroupItem>
)

export default ElectrochemicalMeasurementItem;

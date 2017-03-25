import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import ColorMeasurementItem from './ColorMeasurementItem'
import ElectrochemicalMeasurementItem from './ElectrochemicalMeasurementItem'

const ExperimentMeasurementList = ({ name, colorMeasurements, turbidityMeasurements, electrochemicalMeasurements }) => (
    <Row>
    <Col xs={4}>
    <h3>Color</h3>
    <ListGroup>
        {colorMeasurements.map((measurement, index)=> 
                <ColorMeasurementItem 
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
    </Col>
    <Col xs={4}>
    <h3>Turbidity</h3>
    <ListGroup>
        {turbidityMeasurements.map((measurement, index)=> 
                <ColorMeasurementItem 
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
    </ Col>
    <Col xs={4}>
    <h3>Electrochemical</h3>
    <ListGroup>
        {electrochemicalMeasurements.map((measurement, index)=> 
                <ElectrochemicalMeasurementItem 
                    key={index}
                    name={name || measurement.name}
                    time={measurement.time}
                    Aluminum={measurement.Aluminum}
                    StainlessSteel={measurement.StainlessSteel}
                    Titanium={measurement.Titanium}
                />
        )}
    </ListGroup>
    </Col>
    </Row>
)

export default ExperimentMeasurementList;

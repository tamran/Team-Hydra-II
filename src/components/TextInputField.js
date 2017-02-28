import React from 'react';
import { Row, Col, ControlLabel, FormControl } from 'react-bootstrap';

const TextInputField = ({ label, fieldText, onChange }) => {
    return (
        <div>
            <Col xs={3}>
                <ControlLabel>{label}</ControlLabel>
            </Col>
            <Col xs={8} xsOffset={1}>
                <FormControl type="text" value={fieldText} onChange={(e) => onChange(label,e.target.value)} />
            </Col>
        </div>
    );
}

export default TextInputField;

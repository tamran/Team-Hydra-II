import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const SearchBar = ({label, text, onChangeFilter}) => (
    <Form inline onSubmit={e => e.preventDefault()}>
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            { ' ' }
            <FormControl value={text} onChange={e => onChangeFilter(e.target.value)} />
        </FormGroup>
    </Form>
)

export default SearchBar;

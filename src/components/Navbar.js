import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import NavItemInstance from './NavItemInstance';

const NavbarInstance = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to='/'>Team Hydra II</Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavItemInstance to={{ pathname: 'experiment' }} text="Experiment Status" />
            <NavItemInstance to={{ pathname: 'data' }} text="Collected Data" />
        </Nav>
    </Navbar>
)

export default NavbarInstance;

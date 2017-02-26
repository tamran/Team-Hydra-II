import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import WelcomePage from './WecomePage';
import NavbarInstance from './Navbar';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavbarInstance />
                <Grid>
                    <Row>
                        <Col xs={12}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default App;

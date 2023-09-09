import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './YFM.css'

function YFMNavbar() {
    return (
        <>
            <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">Yu-Gi-Oh - FM Tools</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="yugioh-fm-tools/duel-calculator">Duel Points Calculator</Nav.Link>
                            <Nav.Link as={Link} to="yugioh-fm-tools/duel-common-strats">Duel Common Strats</Nav.Link>
                            <Nav.Link as={Link} to="yugioh-fm-tools/guardian-star">Guardian Star Chart</Nav.Link>
                            {/* TODO: This won't work on gh-pages since it requires a server, so comment this out before deploying the app! */}
                            <NavDropdown title="Database">
                                <NavDropdown.Item as={Link} to="yugioh-fm-tools/database/card-list">Card List</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="yugioh-fm-tools/database/card-drops">Card Drops</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
        </>
    );
}


export { YFMNavbar };
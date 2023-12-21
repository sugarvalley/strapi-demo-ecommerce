import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


function MainNavbar() {
    const state = useSelector((state) => state.handleCart)
    return (
        <>
            {['sm'].map((expand) => (
                <Navbar sticky="top" key={expand} bg="dark" expand={expand} className="mb-3" variant="dark">
                    <Container fluid>
                        <Navbar.Brand href="/">blvckstuff</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link><Link to="/">home</Link></Nav.Link>
                                    <Nav.Link><Link to="/about">about us</Link></Nav.Link>
                                    <NavDropdown
                                        title="products"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item><Link to="/hoodies">hoodies</Link></NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item>
                                            <Link to="/shirts">shirts</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item>
                                            <Link to="/accessories">accessories</Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/products">
                                            <Link to="/products">all</Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link><Link to="/cart">cart ({state.length})</Link></Nav.Link>
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default MainNavbar;
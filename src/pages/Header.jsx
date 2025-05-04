import React from 'react'
import '../index.css'
import './header.css'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';



import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import favicon from '../assets/fav-icon.png'


function Header() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [smShow, setSmShow] = useState(false);


   
    return (
        <>

            <Navbar
                expand="lg"
                className="fixed-top border rounded-5 mt-3 me-3 ms-3"
                style={{ backgroundColor: "rgba(24, 12, 50, 0.63)" }}
            >
                <Container>
                    <Navbar.Brand href="#">
                        <img
                            className="w-100"
                            src={favicon}
                            alt="no image"
                            style={{ height: "80px" }}
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                            <Nav.Link href="/" className="text-white" id='nav-link'>
                                Home Page
                            </Nav.Link>
                            <Nav.Link href="trendingStories" className="text-white" id='nav-link'>
                                Explore Stories
                            </Nav.Link>
                           
                            <NavDropdown
                                title={<span className="text-white">More options</span>}
                                id="navbarScrollingDropdown"
                            >

                                <NavDropdown.Item href="/about" className="text-dark">
                                    About Us
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/contact" className="text-dark">
                                    Contact Us
                                </NavDropdown.Item>
                                
                            </NavDropdown>
                        </Nav>

                        <div className="d-flex align-items-center ms-auto gap-3">

                            


                            <div className="d-flex gap-2">
                                <Link >
                                    <Button onClick={() => setSmShow(true)} className="me-2" id="join-btn" variant="outline-light">
                                        Join
                                    </Button>
                                </Link>
                                <Link>
                                    <Button onClick={handleShow} id="search-btn" variant="outline-warning">
                                        Start
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body className='text-center'>Register by, Click Below !!!!!!</Modal.Body>
                <Modal.Footer>
                    <Link to={'/register'}>
                        <Button variant="secondary" onClick={handleClose}>
                           Register
                        </Button>
                    </Link>
                   
                </Modal.Footer>
            </Modal>

            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Login by, Click Bellow !!!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid d-flex gap-3">
                    <Link to={'/login'}>
                    <Button variant="secondary">Login</Button>
                    </Link>
                    
                    </div>
                </Modal.Body>
            </Modal>


        </>
    )
}

export default Header
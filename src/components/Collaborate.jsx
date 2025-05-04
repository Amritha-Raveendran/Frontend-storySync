import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


function Collaborate() {
    return (
        <>
            <Container >

                <Row >
                    <Col xs={6} className='mt-5 justify-content-center'>

                        <Container className="mt-5 junstiefy-cocntent-center">

                            <Row>
                                <Col>
                                    <h1 className="fw-bold text-start mb-4">Experience Real-Time Storytelling Together</h1>
                                    <p className="text-muted text-start">
                                        With <span style={{color:"skyblue"}}>Story
                                            <span style={{color:"orange"}}>S</span>
                                            ync
                                            </span>, writers can join forces in real-time, crafting narratives that come to life
                                        through collaborative creativity. Our platform enhances storytelling by allowing seamless
                                        contributions and instant feedback.
                                    </p>
                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col md={6} className="border-end text-start">
                                    <h3 className="fw-bold border-bottom pb-2 d-inline-block">Engage</h3>
                                    <p className="text-muted">Write together, edit instantly, and share your vision.</p>
                                </Col>
                                <Col md={6} className='text-start'>
                                    <h3 className="fw-bold">Create</h3>
                                    <p className="text-muted">Join fellow writers and unleash your imagination.</p>
                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col>
                                    <Link to={'/pleaselog'}>
                                    <Button 
                                    className='me-4 rounded-0'
                                    variant="outline-dark">Sign In</Button>
                                    </Link>

                                    <a href="/login" className="text-dark fw-bold" style={{textDecoration:"none"}}>Sign Up <FontAwesomeIcon icon={faArrowRight} style={{color: "#a6a6a6",}} /></a>
                                </Col>
                            </Row>
                        </Container>

                    </Col>
                    <Col xs={6}>
                        <div className="container d-none d-md-block mt-5">
                            <img src="https://img.freepik.com/premium-vector/vector-writer-illustration-book-art-author-person-pen-paper-write-work-literature-man-c_1013341-125328.jpg" alt="no image" className="img-fluid h-100 w-100 rounded-end-4"
                                    style={{ objectFit: "cover" }} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Collaborate
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function JoinOurTeam() {
    return (
        <>
            <Container fluid className="mt-4 d-flex justify-content-center align-items-center">
                <Row className="w-100 d-flex justify-content-center align-items-center">


                <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
                        <img src="https://img.freepik.com/premium-vector/team-young-people-holds-poster-with-inscription-join-our-team-vector-illustration_143808-298.jpg" alt="no image" className='w-100' />
                    </Col>
                    
                    <Col xs={12} md={6} className="text-center d-flex flex-column justify-content-center align-items-center">
                        <div>
                            <h1>Join Our Creative Community</h1>
                            <p>Connect with fellow writers and unleash your storytelling potential today!</p>
                        </div>
                        
                        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                            <Link to={'/register'}>
                            <Button className="rounded-0" variant="outline-dark">Sign Up</Button>
                            </Link>
                            <Link to={'/login'}>
                            <Button className='rounded-0' variant="outline-dark">Sign In</Button>
                            </Link>
                        </div>
                    </Col>

                    
                    
                </Row>
            </Container>


        </>
    )
}

export default JoinOurTeam
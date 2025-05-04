import React from 'react'

import { Container, Row, Col, Button, Image } from "react-bootstrap";

import '../pages/footer.css'

import favIcon from "../assets/fav-icon.png";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <>
      <footer className="footer mt-5 text-dark py-4 ">
        <Container>
          <Row className="align-items-start">

            <Col md={4}>
              <div className="mb-2">
                <Image src={favIcon} roundedCircle style={{ height: "50px", width: "50px" }} />
              </div>

              <div className="d-flex flex-wrap gap-3 mt-4 ">
                <a href="/about" className="text-white" style={{ textDecoration: "none" }}>About Us</a>
                <a href="/contact" className="text-white" style={{ textDecoration: "none" }}>Contact Us</a>
                <a href="/helpcenter" className="text-white" style={{ textDecoration: "none" }}>Help Center</a>
                
                
              </div>
            </Col>

            <Col md={4} className="d-flex flex-column align-items-center mt-5">
              <h6 className="fw-bold text-center text-warning">Join</h6>
              <form className="d-flex gap-2">
                <input type="email" className="p-2 text-dark border rounded" placeholder="Enter your email" />
                <Link to={'/register'}>
                <Button variant="dark" className='rounded-0'>Join</Button>
                </Link>
              </form>
            </Col>


            <Col md={4} className="text-end mt-5">
              <small className=" text-white">
                By subscribing you agree to our <a href="/privacy" className="text-info">Privacy Policy</a>.
              </small>
              <br />
              <small className="text-white">© 2025 StorySync. All rights reserved.</small>
            </Col>

          </Row>



        </Container>
      </footer>


    </>
  )
}

export default Footer
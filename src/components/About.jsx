import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";

function About() {
  return (
    <>
     <Container fluid className="py-5 bg-light mt-4 ">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h2 className="fw-bold text-primary">Welcome to  "Story<span style={{color:"orange"}}>S</span>ync" - Where Creativity Connects!</h2>
          <p className="text-muted">
            Write, collaborate, and bring stories to life with writers worldwide. Whether you're an aspiring author, a poet, or just love storytelling, StorySync is your creative space to co-write and shape amazing stories together.
          </p>
        </Col>
      </Row>

     
      <Row className="mt-5 text-center">
        <Col md={4}>
          <h4 className="fw-bold">📖 Collaborative Writing</h4>
          <p className="text-muted">Co-write stories with others in real time and unleash your creativity.</p>
        </Col>
        <Col md={4}>
          <h4 className="fw-bold">📝 Story Contributions</h4>
          <p className="text-muted">Add your own chapters to existing stories or start a brand-new one.</p>
        </Col>
        <Col md={4}>
          <h4 className="fw-bold">🛡️ Admin Moderation</h4>
          <p className="text-muted">A safe and positive space with active content management.</p>
        </Col>
      </Row>

      <Row className="mt-4 text-center">
        <Col md={4}>
          <h4 className="fw-bold">🌍 Interactive Community</h4>
          <p className="text-muted">Engage with writers worldwide through likes, comments, and discussions.</p>
        </Col>
        <Col md={4}>
          <h4 className="fw-bold">📚 Explore Genres</h4>
          <p className="text-muted">Find and write stories across multiple genres like sci-fi, romance, and horror.</p>
        </Col>
        <Col md={4}>
          <h4 className="fw-bold">🚀 Publish & Share</h4>
          <p className="text-muted">Publish your stories and share them with the world effortlessly.</p>
        </Col>
      </Row>

    
      <Row className="mt-5 text-center">
        <Col>
          <h3 className="fw-bold text-primary">Join StorySync and Start Writing Today!</h3>
          <Button variant="primary" className="mt-3 px-4 py-2" href="/pleaselog">
            Get Started
          </Button>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default About
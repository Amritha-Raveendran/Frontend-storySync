import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBell, FaPen,FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Table, Button, Badge} from "react-bootstrap";

function AdminDashboard() {
  const articles = [
    { id: 73, views: "20", comments: 10 },
    { id: 72, views: "12", comments: 0 },
    { id: 71, views: "10", comments: 1 },
    { id: 70, views: "50", comments: 40 },
   
  ];
  return (
    <>

      <div className="container">
        {[false].map((expand) => (
          <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 mt-3 rounded-5 p-3">
            <Container fluid>
              <Navbar.Brand className='d-flex gap-4'>
                <Link to={'/admin-dashboard'} style={{ textDecoration: "none" }}>
                  Pages
                </Link>
                <Link to={'/admin-dashboard'} style={{ textDecoration: "none" }}>
                  Dashboard
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Admin Control Panel
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/admin-dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/usermanagement">User Management</Nav.Link>
                    <Nav.Link href="/allStories">Story Management</Nav.Link>
                    
                    <Nav.Link href="/*">Reported Content</Nav.Link>
                    <Nav.Link href="/admin-login">Start</Nav.Link>
                    <Button>Log Out</Button>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}

        <div className="p-5 w-100 vh-100 rounded-5" style={{ backgroundColor: "#2F3D56",  }}>
          <Row className="g-4">

            <Col xs={12} sm={6} md={6} lg={3}>
              <Card className="shadow-sm border-0 rounded-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">New Users</h6>
                    <h4 className="fw-bold">300</h4>
                    {/* <p className="text-success mb-0" style={{ fontSize: "14px" }}>
                      +3% since last week
                    </p> */}
                  </div>
                  <div className="bg-danger text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                    <FaUsers />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={6} lg={3}>
              <Card className="shadow-sm border-0 rounded-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">New Stories</h6>
                    <h4 className="fw-bold">462</h4>

                  </div>
                  <div className="bg-success text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                    <FaPen />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={6} lg={3}>
              <Card className="shadow-sm border-0 rounded-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">Notification</h6>
                    <h4 className="fw-bold">430</h4>

                  </div>
                  <div className="bg-warning text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                    <FaBell />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Card className="shadow-sm border-0 rounded-3 p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">Comments</h6>
                    <h4 className="fw-bold">462</h4>

                  </div>
                  <div className="bg-success text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                    /icon
                  </div>
                </div>
              </Card>
            </Col>
          </Row>



           {/* user Progress */}
        <Container className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-primary">Recent Articles</h4>
            <Link to={'/allStories'}>
            <Button variant="primary" size="sm">View All</Button>
            </Link>
          </div>
          <hr />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Storires</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>Stories {article.id}</td>
                  <td>{article.views}</td>
                  <td>{article.comments}</td>
                  <td>
                    <Badge bg="success">Published</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        </div>

       

      </div>

    </>
  )
}

export default AdminDashboard
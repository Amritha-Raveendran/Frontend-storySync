import React, { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Footer from '../pages/Footer';
import { displayHomeStoriesApi } from '../services/allApi';
import { useEffect } from 'react';


function TrendingStories() {

  const [trendingHomeStories, setTrendingHomeStories] = useState([])

  const getTrendingHomeStories = async () => {
    const result = await displayHomeStoriesApi()
    setTrendingHomeStories(result.data)

  }
  console.log(trendingHomeStories);

  useEffect(() => {
    getTrendingHomeStories()
  }, [])
  return (
    <>
      
      <Container className="mt-5 vh-100 d-flex justify-content-center align-items-center">
        <Row className="justify-content-center d-flex mb-5">
          {
            trendingHomeStories?.map((item) => (<Col xs={12} sm={12} md={6} lg={4} className="d-flex justify-content-center mb-4">

              <Card className="p-3 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-2 gap-2">
                    <Image
                      src={item.userProfile || "https://thumbs.dreamstime.com/b/female-user-icon-long-shadow-white-background-235751029.jpg"}

                      alt="Profile"
                      className="rounded-circle img-fluid"
                      style={{ height: "30px" }}
                    />
                    <span className="fw-bold">{item.username || item.user?.username}</span>
                    <span className="text-muted ms-2"> {new Date(item.createdAt).toLocaleDateString('en-GB')}</span>
                  </div>
                  <Card.Title className="fw-bold">{item.storyTitle}</Card.Title>
                  <Card.Text className="text-muted">
                  {item.storyContent.length > 100 ? `${item.storyContent.slice(0, 100)}...` : item.storyContent}
                  </Card.Text>


                  
                </Card.Body>
                <div className="container">
                  <Link className='ms-2' to={'/pleaselog'}>
                    <Button variant="link" className="p-0 text-dark" style={{ textDecoration: "none" }}>
                      Read more <FontAwesomeIcon icon={faArrowRight} fade style={{ color: "#000000" }} />
                    </Button>
                  </Link>
                </div>

              </Card>


            </Col>))
          }

        </Row>
      </Container>



      <Footer />

    </>
  )
}

export default TrendingStories
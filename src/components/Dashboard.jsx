import React, { useContext, useEffect, useState } from 'react'
import UserNavbar from '../pages/UserNavbar'
import { Container } from 'react-bootstrap';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Badge, Button, Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFire } from '@fortawesome/free-solid-svg-icons';
import Footer from '../pages/Footer';
import { getAllStoriesApi, getAllUsersApi } from '../services/allApi';
import { Link } from 'react-router-dom';



function Dashboard() {
  const [token, setToken] = useState("")
  const [homeStories, setGetHomeStories] = useState([])
  const [allUsers, setAllUsers] = useState([])



  // display all stories in user dashboard
  const getHomeStories = async () => {

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      try {
        const result = await getAllStoriesApi(reqHeader)
        console.log(result);
        setGetHomeStories(result.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    }

  }
  const getAllUsers = async (req, res) => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      //  api call
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getAllUsersApi(reqHeader)
        console.log(result);
        setAllUsers(result.data)

      } catch (error) {
        console.error("Error fetching users:", error);
      }


    }
  }
  useEffect(()=>{
    getHomeStories()
  },[])


  useEffect(() => {

    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
    
    getAllUsers()
  }, [])

  return (


    <>
      <UserNavbar />
      <Container>
        <Row style={{backgroundColor:"rgb(59, 91, 117)"}}>
          <Col sm={12} className= 'shadow border p-4'>

            <div className="container-fluid mt-2">
              <Container className="mt-5 d-flex justify-content-center align-items-center">
                <Row className="justify-content-center d-flex">
                  {token ? (
                    homeStories?.map((items, index) => {
                      const user = allUsers.find(u => u._id == items.userId) // find user by userId

                      return (
                        <Col xs={12} sm={12} md={6} lg={4} className="d-flex justify-content-center mb-4" key={index}>
                          <Card className="p-3 shadow-sm">
                            <Card.Body>
                              <div className="d-flex align-items-center mb-2 gap-2">
                                <Image
                                  src={user?.userProfile || "https://thumbs.dreamstime.com/b/female-user-icon-long-shadow-white-background-235751029.jpg"}
                                  alt="Profile"
                                  className="rounded-circle img-fluid"
                                  style={{ height: "30px" }}
                                />
                                <span className="fw-bold">{user?.username  || "Unknown"}</span>
                                <span className="text-muted ms-2">{new Date(items.createdAt).toLocaleDateString('en-GB')}</span>
                              </div>
                              <Card.Title className="fw-bold">{items.storyTitle}</Card.Title>
                              <Card.Text className="text-muted">
                                {items.storyContent.length > 100 ? `${items.storyContent.slice(0, 100)}...` : items.storyContent}
                              </Card.Text>
                              <div className="d-flex align-items-center">
                                <Badge bg="light" text="dark" className="me-2">
                                  {items.storyCategory}
                                </Badge>
                              </div>
                            </Card.Body>
                            <div className="container">
                              <Link to={`/viewstory/${items._id}`} className="p-0 text-dark" style={{ textDecoration: "none" }}>
                                Read more <FontAwesomeIcon icon={faArrowRight} fade style={{ color: "#000000" }} />
                              </Link>

                              {/* /viewUserStory */}
                            </div>
                          </Card>
                        </Col>
                      );
                    })
                  ) : (
                    <h5 className='text-center text-danger'>No Stories available</h5>
                  )}
                  

                </Row>

              </Container>

            </div>

          </Col>
          
        </Row>


      </Container>

      <Footer />

    </>
  )
}

export default Dashboard
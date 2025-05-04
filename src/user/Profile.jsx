import React, { useContext, useEffect } from 'react'

import Card from 'react-bootstrap/Card';
import Footer from "../pages/Footer"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TextField } from '@mui/material';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Bounce, toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { deleteUserStoryApi, getUserAPI, getUserStoriesApi, updateUserProfileApi, updateUserStoriesApi } from '../services/allApi';
import { googleAuthUserResponse } from '../context/ContextShare';
import { Link } from 'react-router-dom';


function Profile({ story }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { googleAuthUserDetails } = useContext(googleAuthUserResponse)
  console.log(googleAuthUserDetails)

  const [userStories, setUserStories] = useState([])

  const [userProfile, setUserProfile] = useState(null)
  const [token, setToken] = useState("")

  const [allUsers, setAllUsers] = useState([])
  const [initialStory, setInitialStory] = useState({})

  const [preview, setPreview] = useState("")
  const [existingImg, setExistingImg] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  const [key, setKey] = useState(1)


  const [userDetails, setUserDetails] = useState({
    userId: "",
    username: "",
    email: "",
    bio: "",
    userProfile: "",
    socialLink: ""
  })



  const [editableStory, setEditableStory] = useState({
    storyTitle: "",
    storyContent: "",
    storyCategory: "",
    _id: ""
  })



  // get all stries posted by a single user
  const getAllStories = async () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))


    if (!user || !user._id) {
      console.error("User is not valid or userId is missing");

    }
    const token = sessionStorage.getItem("token")

    try {

      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const result = await getUserStoriesApi(user._id, reqHeader, { createdAt: "desc" })
      console.log(result.data)

      if (result.status == 200) {
        setUserStories(result.data);
      }
    } catch (err) {
      console.log("Error fetching stories:", err);
    }
  }

  // get user details
  const getUser = async () => {
    if (sessionStorage.getItem("token")) {

      const user = JSON.parse(sessionStorage.getItem("existingUser"))

      console.log(sessionStorage.getItem("existingUser"))


      if (!user || !user._id) {
        console.error("User is not valid or userId is missing");
      }

      const token = sessionStorage.getItem("token")
      //  api call
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getUserAPI(user._id, reqHeader)
        console.log(result)

        const data = result.data

        const userDetail = {
          ...data,
          userProfile: data.userProfile || user.imageUrl || "",
          username: data.username || user.username,
          email: data.email || user.email
        }
        console.log(userDetail)


        setAllUsers(userDetail)
        setUserProfile(userDetail)

        // Update userDetails state with the fetched data
        setUserDetails({
          userId: user._id,
          username: userDetail.username,
          email: userDetail.email,
          bio: userDetail.bio || "",
          userProfile: userDetail.userProfile,
          socialLink: userDetail.socialLink || ""
        })

      } catch (error) {
        console.error("Error fetching users:", error)
      }

    }
  }

  const handleDelete = async (storyId) => {

    const user = JSON.parse(sessionStorage.getItem("existingUser"));


    if (!user || !user._id) {
      console.error("User is not valid or userId is missing");
    }
    const token = sessionStorage.getItem("token")

    console.log("Story ID:", storyId);
    try {
      const reqHeader = {

        Authorization: `Bearer ${token}`
      }

      // Assuming you have a function to call the DELETE API endpoint
      const result = await deleteUserStoryApi(storyId, reqHeader)

      console.log(result)

      if (result.status === 200) {
        // Remove the deleted story from the local state (if it's in the state)
        setUserStories((prevStories) =>
          prevStories.filter((story) => story._id !== storyId)
        )
        // alert("Story deleted successfully");
        toast.success("Story deleted successfully")
      }

    } catch (error) {
      console.error("Error deleting the story:", error);
      toast.warning("Failed to delete the story");
    }
  }

  const handleEdit = async () => {

    const { storyTitle, storyContent, storyCategory, _id } = editableStory

    // Check if required fields are present
    if (!storyTitle || !storyContent || !storyCategory) {
      toast.warning("Please fill the form completely");
      return;
    }

    // Prepare the request body
    const reqBody = {
      storyTitle,
      storyCategory,
      storyContent,
      _id,
    };

    // Get token from sessionStorage
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      try {
        // Pass the correct story._id (editableStory._id) to updateUserStoriesApi
        const result = await updateUserStoriesApi(_id, reqBody, reqHeader)
        console.log(result) // Log the result for debugging

        if (result.status == 200) {
          toast.success("Story Edited Successfully")
          handleClose()
        }

      } catch (error) {
        console.error('Error updating story:', error)
        toast.error('Failed to update story')
      }
    } else {
      console.error('Error: No token found in sessionStorage');
      toast.error('User is not authenticated');
    }
  }

  const handleEditCancel = () => {
    // Reset the editable story to its initial state
    setEditableStory(initialStory)

    // Close the modal
    handleClose()

  }

  const handleProfileUpdate = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("existingUser"));

    if (!token || !user?._id) {

      toast.error("Authentication required")
      return
    }

    // Validate that all required fields are filled
    if (!userDetails.bio || !userDetails.socialLink) {
      toast.warning("Please fill all the fields")
      return
    }

    try {
      const reqBody = new FormData()
      reqBody.append("username", userDetails.username)
      reqBody.append("bio", userDetails.bio)
      reqBody.append("socialLink", userDetails.socialLink)
      if (preview) {
        reqBody.append("userProfile", preview)
      }
      const reqHeader = {

        "Authorization": `Bearer ${token}`
      }

      const result = await updateUserProfileApi(user._id, reqBody, reqHeader)
      console.log(result);


      if (result.status == 200) {
        toast.success("Profile updated successfully")



        getUser()
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  }


  const handleProfileImage = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file) // to display
      setPreview(previewUrl) 
      setSelectedFile(file)  // for saving
    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }

    getAllStories()
    getUser()
    setExistingImg(userDetails.userProfile)
  }, [])




  return (
    <>

      <Container >
        <div className="container-fluid">
          <p className='m-4 d-fex'>
            <Link to={"/dashboard"}>
              <FontAwesomeIcon icon={faHouseUser} size="lg" style={{ color: "#22a091", }} />
            </Link>
          </p>
        </div>
        <Row >

          <Col sm={8} md={6} className='mt-5'>

            <h5 className='text-center text-danger mb-3'>Stories Posted</h5>
            <div className="container d-flex justify-content-center align-items-center">
              {userStories && userStories.length > 0 ? (
                <Table striped bordered hover className='shadow'>
                  <thead>
                    <tr className='text-center'>
                      <th>SlNo</th>
                      <th>Title</th>
                      <th>Published</th>
                      <th></th>
                      <th></th>

                    </tr>
                  </thead>
                  <tbody>
                    {userStories.map((items, index) => (
                      <tr key={items._id} className='text-center'>
                        <td>{index + 1}</td>
                        <td>{items.storyTitle}</td>
                        <td>{new Date(items.createdAt).toLocaleDateString("en-GB")}</td>
                        <td><FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#00ff2a", }} onClick={() => {
                          setEditableStory({
                            storyTitle: items.storyTitle,
                            storyContent: items.storyContent,
                            storyCategory: items.storyCategory,
                            _id: items._id
                          });
                          handleShow();
                        }}

                        /></td>
                        <td><FontAwesomeIcon onClick={() => handleDelete(items._id)} icon={faTrash} size="lg" style={{ color: "#ff0000", }} /></td>
                      </tr>))}


                  </tbody>
                </Table>
              ) : (<p className='text-center text-danger'>No stories available</p>)}

            </div>
          </Col>
          <Col sm={4} md={6}>
            <div className="container vh-100 d-flex justify-content-center align-items-center">
              <Card style={{ maxWidth: '30rem', width: '100%' }} className='text-center shadow p-3'>
                <div className='d-flex justify-content-center'>
                  <label htmlFor="profileImage">
                    <input key={key} type="file" id='profileImage' className='d-none' onChange={(e) => handleProfileImage(e)} />
                    <Card.Img
                      variant="top"
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        borderRadius: "50%"
                      }}
                      src={preview ? preview : "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg?semt=ais_hybrid&w=740"} alt='no image'
                    />
                  </label>
                </div>
                <Card.Body>
                  <Card.Title>{userDetails.username}</Card.Title>
                  <p>{userDetails.email}</p>

                  <TextField
                    label="Social Link"
                    variant="outlined"
                    fullWidth
                    value={userDetails.socialLink}
                    onChange={(e) => setUserDetails({ ...userDetails, socialLink: e.target.value })}
                    className='mb-3'
                  />
                  <TextField
                    label="Bio"
                    variant="outlined"
                    fullWidth
                    value={userDetails.bio}
                    onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                    className='mb-3'
                  />
                  <Button variant="primary" onClick={handleProfileUpdate}>Update Profile</Button>
                </Card.Body>

              </Card>
            </div></Col>

        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-danger'>Edit Stories</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Card className=" p-4 border-0">
            <Card.Body>
              <h4 className="text-primary text-center mb-3">Edit Your Story</h4>
              <Form >
                {/* Story Title */}
                <Form.Group className="mb-3">
                  <Form.Label
                  >Story Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your story title..."
                    name="title"
                    required

                    value={editableStory.storyTitle}
                    onChange={(e) => setEditableStory({ ...editableStory, storyTitle: e.target.value })}

                  />
                </Form.Group>

                {/* Story Category */}
                <Form.Group className="mb-3">
                  <Form.Label
                  >Category</Form.Label>
                  <Form.Select value={editableStory.storyCategory}
                    onChange={(e) => setEditableStory({ ...editableStory, storyCategory: e.target.value })}
                    name="category" required >
                    <option value="">Select Category</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Romance">Romance</option>
                    <option value="Thriller">Thriller</option>
                  </Form.Select>
                </Form.Group>

                {/* Story Content */}
                <Form.Group className="mb-3">
                  <Form.Label
                  >Story Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Write your story here..."
                    name="content"

                    required

                    value={editableStory.storyContent}
                    onChange={(e) => setEditableStory({ ...editableStory, storyContent: e.target.value })}

                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditCancel} >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        transition={Bounce}
      />
    </>
  )
}

export default Profile
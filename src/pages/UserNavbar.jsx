
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Bounce, toast, ToastContainer } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import AddStory from '../user/AddStory';
import { googleAuthUserResponse, userStoriesRsponse } from '../context/ContextShare';
import { addStoriesApi, getUserProfileApi } from '../services/allApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';




function UserNavbar() {

    const { storyDetails, setStoryDetails } = useContext(userStoriesRsponse)


    const [profileImage, setProfileImage] = useState("")

    const { googleAuthUserDetails } = useContext(googleAuthUserResponse)

    const [user, setUser] = useState({
        username: "",
        email: ""
    })



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [token, setToken] = useState("")
    console.log(storyDetails);



    const handleLogout = async () => {

        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem('token');
        toast.success("Logout successfully")
        setTimeout(() => {
            window.location.href = '/login'
        }, 1500)
    }




    const handleUpload = async () => {
        const { storyTitle, storyContent, storyCategory } = storyDetails;

        if (!storyTitle || !storyContent || !storyCategory) {
            toast.warning("Please fill the form completely");
            return;
        }
      

        // Get fresh token in case it changed
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.warning("Please login again");
            return;
        }

        // api call
        const reqBody = {
            storyTitle,
            storyContent,
            storyCategory,
            username: user.username,
            userId: user._id
        };

        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await addStoriesApi(reqBody, reqHeader);
            console.log(result);

            if (result.status === 200) {
                toast.success("Story Added successfully");
                setTimeout(() => {
                    handleCancel();
                    handleClose();
                }, 2000);
            } else if (result.status === 406) {
                toast.warning(result.response.data);
            } else {
                toast.error("Something went wrong, Server error");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload story");
        }
    }

    const handleCancel = () => {
        setStoryDetails({
            storyTitle: "",
            storyContent: "",
            storyCategory: ""
        });
        // console.log(storyDetails);

    }
    //get user profile pic
    const fetchUserProfile = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {

                const result = await getUserProfileApi(reqHeader)
                console.log(result);

                setProfileImage(result.profileImage)

            } catch (error) {
                console.log("Error in fetching profile image", error);
            }
        }
    }


    useEffect(() => {
        fetchUserProfile()
    }, [])


    return (
        <>
            <Navbar className=" p-4 m-5 rounded-5" style={{ backgroundColor: "#1a1a2e" }}>
                <Container className=''>
                    <Navbar.Brand href="/">
                        <span style={{ color: "rgb(28, 123, 200)", fontSize: "25px" }}>
                            story<span className='text-warning'>S</span>ync  <FontAwesomeIcon icon={faFeather} fade style={{ "--fa-secondary-color": "#07cac7", }} />
                        </span>
                    </Navbar.Brand>



                </Container>

                <div className="container">
                    <Form className="d-flex w-100">
                        
                    </Form>
                </div>
                <Container>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <div className="d-flex justify-content-center align-items-center ">

                            <Col xs={6} md={4}>
                                <div className="container  text-center d-flex gap-2 justify-content-center lg">
                                    <Dropdown as={ButtonGroup} >
                                        <Navbar.Text className='me-1 text-white d-flex gap-2 justify-content-center mt-3'>
                                            

                                            <img
                                                className="border rounded-5"
                                                src={googleAuthUserDetails?.userProfile || profileImage || "https://www.gravatar.com/avatar/default?s=200&d=mp"}
                                                alt="no image"
                                                style={{ height: "30px", width: "30px" }}

                                            />




                                        </Navbar.Text>
                                        <Dropdown.Toggle variant="none" id="dropdown" className='border-0 ' style={{ color: "white" }} />

                                        <Dropdown.Menu className="bg-light ">
                                            <Dropdown.ItemText className='text-black' style={{ fontSize: "15px" }}>{googleAuthUserDetails ? googleAuthUserDetails.username : "Guest"}</Dropdown.ItemText>
                                            <Dropdown.ItemText className='text-dark' style={{ fontSize: "15px", backgroundColor: "gray" }}>{googleAuthUserDetails ? googleAuthUserDetails.email : "email"}</Dropdown.ItemText>


                                            <Dropdown.Item as={Link} to="/userProfile" state={storyDetails}>
                                                Profile 
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={handleShow}>Upload</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>

                                </div>
                            </Col>


                        </div>
                    </Navbar.Collapse>
                </Container>

                <Modal show={show} onHide={handleClose} lg>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <AddStory />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpload}>
                            Upload
                        </Button>
                    </Modal.Footer>
                </Modal>



            </Navbar>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme="colored"
                transition={Bounce}
            />
        </>
    )
}

export default UserNavbar
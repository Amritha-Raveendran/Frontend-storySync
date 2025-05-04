import { faArrowLeft, faHeart, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Image, ListGroup } from 'react-bootstrap';
import Footer from '../pages/Footer';
import { Link, useParams } from 'react-router-dom';
import { addCommentApi, deleteCommentApi, getCommentsApi, getLikeCountApi, getSingleStoryApi, getSingleUser, likeApi } from '../services/allApi';
import { Bounce, toast, ToastContainer } from 'react-toastify';


function ViewStoryOfUser() {


  const [token, setToken] = useState("")
  const [selectedStory, setSelectedStory] = useState("")
  const [storyUser, setStoryUser] = useState("")
  const [commentText, setCommentText] = useState("")
  const { id } = useParams()
  const [comments, setComments] = useState([])

  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)


  const getStory = async () => {


    const token = sessionStorage.getItem("token")
    if (!id) {
      console.error("Story ID is missing in URL");
      return
    }

    try {

      const reqHeader = {
        Authorization: `Bearer ${token}`
      }
      const result = await getSingleStoryApi(id, reqHeader)
      console.log(result.data)

      if (result.status == 200 && result.status < 300) {
        setSelectedStory(result.data)

        //fetch user who wrote the story
        if (result.data.userId) {
          getUser(result.data.userId)
        }
      }
    } catch (error) {
      console.log("Error fetching stories:", error);
    }
  }

  const getUser = async (userId) => {

    const token = sessionStorage.getItem("token");



    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`

    };

    try {
      const result = await getSingleUser(userId, reqHeader); // API call
      if (result.status == 200) {
        setStoryUser(result.data)
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }


  }

  const handleComment = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token")
    const userId = sessionStorage.getItem("userId")


    if (!commentText) {
      toast.warning("Please leave a comment")
      return
    }


    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }

      const reqBody = {
        storyId: selectedStory._id,
        userId,
        commentText,
      }

      const result = await addCommentApi(
        selectedStory._id,
        userId,
        reqBody,
        reqHeader
      )

      console.log(result);
      if (result.status === 200) {
        toast.success("Comment added successfully")
        setCommentText("")
        getAllComments()
      } else {
        toast.warning("Failed to add comment")
      }
    } catch (error) {
      console.error("Error in adding comment:", error)
    }
  }


  const getAllComments = async (storyId) => {
    try {
      const token = sessionStorage.getItem("token")


      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }

      // Assuming your API endpoint returns comments for a story
      const result = await getCommentsApi(storyId, reqHeader)
      console.log(result);

      // Handle both possible response formats:
      const commentsData = result.data.comments || result.data
      setComments(Array.isArray(commentsData) ? commentsData : [])
    } catch (error) {
      console.error("Error fetching comments:", error)
    }

  }

  const getStories = async () => {
    const token = sessionStorage.getItem("token")
    if (!id) {
      console.error("Story ID is missing in URL");
      return
    }

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      const result = await getSingleStoryApi(id, reqHeader)
      console.log(result);

      if (result.status == 200) {
        setSelectedStory(result.data)



        if (result.data.userId) {
          getUser(result.data.userId)
        }

        getAllComments(result.data._id)
      }
    } catch (error) {
      console.log("Error fetching stories:", error);
    }
  }

  const handleCommentDelete = async (commentId) => {

    const token = sessionStorage.getItem("token")
    try {

      const reqHeader = {

        Authorization: `Bearer ${token}`

      }


      const result = await deleteCommentApi(commentId, reqHeader)
      console.log(result);
      if (result.status == 200) {
        toast.success("Comment deleted successfully")
        getAllComments(selectedStory._id)
      } else {
        toast.warning("Failed to delete comment")
      }


    } catch (error) {
      toast.error("Deleting comment is failed")
    }
  }


  const handleLike = async (storyId) => {

    const token = sessionStorage.getItem("token")

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await likeApi(storyId, reqHeader)
    console.log(result);

    if (result.message == "Liked" || result.message == "Unliked") {

      setIsLiked(result.message == "Liked")

      if (result.message == "Liked") {
        setLikesCount(likesCount + 1)
      } else {
        setLikesCount(likesCount - 1)
      }
    }

    // Ensure the updated like count is reflected from the server
    getLikeCount(storyId)

  }


  const getLikeCount = async (storyId) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await getLikeCountApi(storyId, reqHeader)
    console.log(result);

    if (result.status == 200) {
      setLikesCount(result.data.likeCount)
    }

  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }


    getStories()

    getLikeCount(id)



  }, [])

  return (
    <>


      <div className='m-4'>
        <Link to={'/dashboard'}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{ color: "#000000", }} /></Link>
      </div>
      <Container className="my-4">

        {selectedStory ? (<Card className="mb-4 shadow">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={2}>
                <Image
                  src={storyUser ? storyUser.userProfile : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBzonyjRvvQCm9jE6TecAKQfZwrE_jwM5CBAdBSyDnMKvOmensFicUbM2ODILK5q1oVsU&usqp=CAU"}
                  roundedCircle
                  fluid
                />
              </Col>
              <Col>
                <h5 className="mb-1">{storyUser ? storyUser.username : "Username"}</h5>
                <p className='text-warning'>{selectedStory.storyCategory || "Category"}</p>
                <small className="text-muted">Created on : {new Date(selectedStory.createdAt).toLocaleDateString('en-GB')}</small>
              </Col>
            </Row>
            <hr />

            <Card.Title className="mt-3">{selectedStory.storyTitle || "Story Title Here"}</Card.Title>
            <Card.Text>
              {selectedStory.storyContent || "Story content"}
            </Card.Text>
            <Button variant="none"><FontAwesomeIcon icon={faThumbsUp} style={{ color: isLiked ? "#05a308" : "#6c757d" }} size='lg' onClick={() => handleLike(selectedStory._id)} />
            </Button>
            <span className="badge bg-secondary ms-2">{likesCount}</span>
          </Card.Body>
        </Card>) : <h5 className='text-info text-center'> Loading story...</h5>}

        <Card className="shadow">
          <Card.Header as="h5">Comments</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Add a Comment</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Write your comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
              </Form.Group>
              <Button variant="success" type="submit" onClick={handleComment}>
                Submit
              </Button>
            </Form>
          </Card.Body>
          <ListGroup>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <ListGroup.Item key={comment._id} className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                       {comment.userId?.username || "Anonymous"}
                    </div>
                    {comment.commentText}
                    <div>
                      <small className="text-muted">
                        {new Date(comment.createdAt).toLocaleDateString('en-GB')}
                      </small>
                    </div>
                  </div>
                  {comment.userId?._id == sessionStorage.getItem("userId") && (
                    <Button variant="link" className="text-danger p-0">
                      <FontAwesomeIcon icon={faTrash} size="sm" onClick={() => handleCommentDelete(comment._id)} />
                    </Button>
                  )}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center text-muted py-4">
                No comments yet. Be the first to comment!
              </ListGroup.Item>
            )}

          </ListGroup>

        </Card>
      </Container>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        transition={Bounce}
      />
      <Footer />



    </>
  )
}

export default ViewStoryOfUser
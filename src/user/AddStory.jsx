import React, { useContext } from "react";
import { Container, Form, Card } from "react-bootstrap";
import { userStoriesRsponse } from "../context/ContextShare";


function AddStory() {

  
  const { storyDetails, setStoryDetails } = useContext(userStoriesRsponse)


  return (
    <>
      <Container className="mt-4">
        <Card className=" p-4 border-0">
          <Card.Body>
            <h4 className="text-primary text-center mb-3">Post Your Story</h4>
            <Form >
              {/* Story Title */}
              <Form.Group className="mb-3">
                <Form.Label>Story Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your story title..."
                  name="title" value={storyDetails.storyTitle}
                  onChange={(e)=>setStoryDetails({...storyDetails,storyTitle:e.target.value})}
                  required
                />
              </Form.Group>

              {/* Story Category */}
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" required onChange={(e)=>setStoryDetails({...storyDetails,storyCategory:e.target.value})}>
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
                <Form.Label>Story Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your story here..."
                  name="content"
                  value={storyDetails.storyContent}
                  onChange={(e)=>setStoryDetails({...storyDetails,storyContent:e.target.value})}
                  required
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

      </Container>
    </>
  )
}

export default AddStory
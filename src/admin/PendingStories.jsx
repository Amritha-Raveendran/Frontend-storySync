import { Container } from 'react-bootstrap';
import React from 'react'
import { Badge, Button, Table } from 'react-bootstrap';

function PendingStories() {
  const stories = [
    { id: 1, title: "A Journey to the Stars", author: "Joe Martin", status: "Pending" },
    { id: 2, title: "The Enchanted Forest", author: "Will Smith", status: "Pending" },
    { id: 3, title: "Lost in Time", author: "Emily Johnson", status: "Pending" },
    { id: 4, title: "The Secret of the Old Castle", author: "Alvin Alex", status: "Pending" },
  ];

  
  return (


    <>
     <Container className="mt-4">
      <h4 className="text-primary">Story Approval</h4>
      <hr />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story.id}>
              <td>{story.id}</td>
              <td>{story.title}</td>
              <td>{story.author}</td>
              <td>
                <Badge bg="warning" text="dark">{story.status}</Badge>
              </td>
              <td>
                <Button variant="success" size="sm" className="me-2">Approve</Button>
                <Button variant="danger" size="sm">Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    
    </>
  )
}

export default PendingStories
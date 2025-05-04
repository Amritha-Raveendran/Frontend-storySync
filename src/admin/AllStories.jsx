import React from 'react'
import { Container, Table, Badge } from "react-bootstrap";


export default function AllStories() {
    const stories = [
        { id: 1, title: "A Journey to the Stars", author: "John Doe", status: "Approved" },
        { id: 2, title: "The Enchanted Forest", author: "Jane Smith", status: "Pending" },
        { id: 3, title: "Lost in Time", author: "Emily Johnson", status: "Rejected" },
        { id: 4, title: "The Secret of the Old Castle", author: "Michael Brown", status: "Approved" },
        { id: 5, title: "Mystery of the Hidden Cave", author: "Alice White", status: "Pending" },
      ];
    
     
      const getStatusVariant = (status) => {
        switch (status) {
          case "Approved":
            return "success";
          case "Pending":
            return "warning";
          case "Rejected":
            return "danger";
          default:
            return "secondary";
        }
      };
  return (
    <>
    <Container className="mt-4">
      <h4 className="text-primary">All Stories</h4>
      <hr />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story.id}>
              <td>{story.id}</td>
              <td>{story.title}</td>
              <td>{story.author}</td>
              <td>
                <Badge bg={getStatusVariant(story.status)}>{story.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </>
  )
}

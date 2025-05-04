import React from 'react'
import { Container, Table, Badge, Button, Card } from "react-bootstrap";

function Usermanagement() {
    const users = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Inactive" },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Active" },
        { id: 4, name: "Diana Williams", email: "diana@example.com", role: "Moderator", status: "Inactive" },
        { id: 5, name: "Ethan Miller", email: "ethan@example.com", role: "User", status: "Active" },
      ];
    const getStatusVariant = (status) => {
        return status === "Active" ? "success" : "danger";
      };
  return (
    <>
     <Container className="mt-4">
      <Card className="shadow-lg p-3 mb-4 bg-white rounded">
        <Card.Body>
          <h4 className="text-primary text-center mb-3">User Management</h4>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg="info">{user.role}</Badge>
                  </td>
                  <td>
                    <Badge bg={getStatusVariant(user.status)}>{user.status}</Badge>
                  </td>
                  <td>
                    {user.status === "Active" ? (
                      <Button variant="warning" size="sm">Deactivate</Button>
                    ) : (
                      <Button variant="success" size="sm">Activate</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
    </>
  )
}

export default Usermanagement
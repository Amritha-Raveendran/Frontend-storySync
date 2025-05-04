import React from 'react'
import { Container } from "react-bootstrap";
import { Button, Typography, Card } from "@mui/material";
import { Link } from 'react-router-dom';
function PleaseLogin() {
  return (
    <>

      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-5 text-center " >
          <img
            src="https://assets-v2.lottiefiles.com/a/790b2fc0-1171-11ee-afd8-87913996c05d/JCzKThXsSJ.gif"
            alt="Access Restricted"
            className="img-fluid mb-3"
            style={{ width: "100%", height:"400px"}}
          />
          <Typography variant="h6" fontWeight="bold">
            You must be <span style={{color:"red"}}>logged  in</span> to view this Further!
          </Typography>
          <Typography variant="body2" className="text-muted my-2">
            Please log in to your account in order to have access further !!!!!!.
          </Typography>
          <Link to={'/login'}>
            <Button variant="contained" color="warning" className="mt-3" fullWidth>
              Login
            </Button>
          </Link>
        </Card>
      </Container>

     

    </>
  )
}

export default PleaseLogin
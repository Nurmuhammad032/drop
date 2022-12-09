import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col md="12" className="text-center">
          <h1 className="mx-auto text-center mt-5 display-1">
            404 Page Not Found
          </h1>
          <Button as={Link} to="/" variant="success" className="my-5">
            Back to home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="py-3 text-center">Copyright &copy; KIKI UTE</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

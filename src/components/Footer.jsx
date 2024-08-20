import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/github-brands-solid.svg";
import navIcon3 from "../assets/img/envelope-regular.svg";
import Newsletter from "./Newsletter.jsx";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <Newsletter />
          </Col>
          <Col>
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/seandonovan-upenn/">
                <img src={navIcon1} alt="Icon" />
              </a>
              <a href="https://www.github.com/INTSEAN/">
                <img src={navIcon2} alt="Icon" />
              </a>
              <a href="mailto:donovans064@gmail.com">
                <img src={navIcon3} alt="Icon" />
              </a>
            </div>
            <p>Copyright &copy; 2024. Sean Donovan's Portfolio</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

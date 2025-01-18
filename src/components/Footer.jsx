import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Subscribe from "./Subscribe";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/github-brands-solid.svg";
import navIcon3 from "../assets/img/instagram-brands-solid.svg";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <Subscribe />
          </Col>
          <Col>
            <div className="social-icon">
              <a
                target="blank"
                href="https://www.linkedin.com/in/seandonovan-upenn/"
              >
                <img src={navIcon1} alt="Icon" />
              </a>
              <a target="blank" href="https://www.github.com/INTSEAN/">
                <img src={navIcon2} alt="Icon" />
              </a>
              <a target="blank" href="https://www.instagram.com/sensei.sean_">
                <img src={navIcon3} alt="Icon" />
              </a>
            </div>
            <p>Copyright &copy; {currentYear}. Sean Donovan's Portfolio</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

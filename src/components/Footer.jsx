import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import Subscribe from "./Subscribe";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/github-brands-solid.svg";
import navIcon3 from "../assets/img/instagram-brands-solid.svg";

function Footer({ compact = false }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={compact ? "footer footer-compact" : "footer"}>
      <Container>
        <Row className="align-items-center text-center">
          {!compact && (
            <Col>
              <Subscribe />
            </Col>
          )}
          <Col className={compact ? "footer-compact-content" : undefined}>
            {compact && <p>© {currentYear} Sean Donovan</p>}
            <div className="social-icon">
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sean Donovan on LinkedIn"
                href="https://www.linkedin.com/in/seandonovan-upenn/"
              >
                <img src={navIcon1} alt="" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sean Donovan on GitHub"
                href="https://www.github.com/INTSEAN/"
              >
                <img src={navIcon2} alt="" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sean Donovan on Instagram"
                href="https://www.instagram.com/sensei.sean_"
              >
                <img src={navIcon3} alt="" />
              </a>
            </div>
            {!compact && <p>Copyright © {currentYear}. Sean Donovan&apos;s Portfolio</p>}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  compact: PropTypes.bool,
};

export default Footer;

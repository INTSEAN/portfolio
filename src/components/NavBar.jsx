import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/logo-solid.svg";
import linkedin from "../assets/img/linkedin-brands-solid.svg";
import github from "../assets/img/github-brands-solid.svg";

export default function NavBar({ immersive = false }) {
  const [active, setActive] = useState(window.location.hash.slice(1) || "home");
  const [scrolled, setScrolled] = useState(window.scrollY > 50);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onHash = () => { setActive(window.location.hash.slice(1) || "home"); setExpanded(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("hashchange", onHash); };
  }, []);
  return (
    <Navbar expand="lg" expanded={expanded} onToggle={setExpanded} className={`${scrolled ? "scrolled" : ""} ${immersive ? "gallery-page-nav" : ""}`} aria-label="Main navigation">
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand" aria-label="Sean Donovan home">
          <img src={logo} alt="Sean Donovan" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></Navbar.Toggle>
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {["home", "skills", "projects", "immersive"].map(item => (
              <Nav.Link key={item} href={`#${item}`} onClick={() => setExpanded(false)} aria-current={active === item ? "page" : undefined} className={`navbar-link ${active === item ? "active" : ""} ${item === "immersive" ? "immersive-link" : ""}`}>
                {item === "immersive" && <span aria-hidden="true">✳ </span>}{item[0].toUpperCase() + item.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
          <span className="navbar-text">
              <div className="social-icon">
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/seandonovan-upenn/" aria-label="LinkedIn"><img src={linkedin} alt="" /></a>
                <a target="_blank" rel="noreferrer" href="https://github.com/INTSEAN/" aria-label="GitHub"><img src={github} alt="" /></a>
              </div>
              <a className="classic-connect" href="#contact">Let’s connect ↗</a>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
NavBar.propTypes = { immersive: PropTypes.bool };

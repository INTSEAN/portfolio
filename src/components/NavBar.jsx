import Container from "react-bootstrap/Container";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/house-solid.svg";
import { useState, useEffect } from "react";
import mail from "../assets/img/envelope-regular.svg";
import linkedin from "../assets/img/linkedin-brands-solid.svg";
import github from "../assets/img/github-brands-solid.svg";

function NavBar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  function handleEmail() {
    window.location.href = "mailto:donovans064@gmail.com";
  }

  return (
    <Navbar expand="lg" className={scroll ? "Scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand">
          <a>
            <img src={logo} alt="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <i className="fa-solid fa-bars" style={{ color: "#FFD43B" }}></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ color: "white" }}>
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#skills"
              className={
                activeLink === "skills" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("skills")}
            >
              Skills
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={
                activeLink === "projects" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("projects")}
            >
              Projects
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/seandonovan-upenn/">
                <img src={linkedin} alt="" />
              </a>
              <a href="https://www.github.com/INTSEAN/">
                <img src={github} alt="" />
              </a>
              <a href="mailto:donovans064@gmail.com">
                <img onClick={handleEmail} src={mail} alt="" />
              </a>
            </div>
            <button className="#footer" onClick={() => console.log("connect")}>
              Let's connect
            </button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

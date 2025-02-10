import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import "animate.css";
import TrackVisibility from "react-on-screen";
import colorSharpTwo from "../assets/img/color-sharp2.png";
import wordLingo from "../assets/img/wordlingo.png";
import pennGpt from "../assets/img/penngpt.png";
import gymJam from "../assets/img/gymjam.png";
import hackmate from "../assets/img/hackmate.png";
import bridged from "../assets/img/bridged.png";
import dALGOna from "../assets/img/dalgona.png";
import yaqin from "../assets/img/yaqin.jpg";
import aitutor from "../assets/img/aitutor.jpg";
import africaai from "../assets/img/landing-africa.png";

import ShinyText from "./ShinyText";
import BlobCursor from "./BlobCursor";

function Projects() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      title: "Africa AI",
      description: "Multimodal AI platform",
      imgUrl: africaai,
      link: "https://intsean.github.io/hugo-mock-landing-page/",
      category: "web",
      technologies: ["Golang", "Node.js", "Hugo", "SaSS", "Bootstrap"],
      date: "2025",
    },
    {
      title: "Yaqin",
      description: "International Agricultural Export 🌍",
      imgUrl: yaqin,
      link: "https://yaqvent.netlify.app/",
      category: "web",
      technologies: ["Typescript", "React", "Node.js"],
      date: "2024",
    },
    {
      title: "Bridged Consultants",
      description: "Medical Consulting Startup 🏥",
      imgUrl: bridged,
      link: "https://bridgedconsultants.com",
      category: "web",
      technologies: ["React", "Node.js"],
      date: "2024",
    },
    {
      title: "Gym Jam",
      description: "Fitness + Music👟",
      imgUrl: gymJam,
      link: "https://gymjam.netlify.app/",
      category: "web",
      technologies: ["React", "Node.js"],
      date: "2024",
    },
    {
      title: "Word Lingo",
      description: "Machine Learning + Linguistics 💻",
      imgUrl: wordLingo,
      link: "https://wordlingo.netlify.app/",
      category: "ai",
      technologies: ["React", "Node.js"],
      date: "2024",
    },
    {
      title: "dALGOna",
      description: "SquidGame Inspired Coding Prep 🧠",
      imgUrl: dALGOna,
      link: "https://dalgorithm.netlify.app/",
      category: "web",
      technologies: ["React", "Node.js", "Tailwind"],
      date: "2025",
    },
    {
      title: "Hack Mate",
      description: "Social Media + Hackathons",
      imgUrl: hackmate,
      link: "https://github.com/Namit2111/hackMate",
      category: "web",
      technologies: ["React", "Node.js"],
      date: "2024",
    },
    {
      title: "AI Tutor",
      description: "AI for Education 🤖",
      imgUrl: aitutor,
      link: "https://tutorize.netlify.app/",
      category: "ai",
      technologies: ["React", "Node.js"],
      date: "2024",
    },
    {
      title: "Penn GPT",
      description: "AI for Education 🤖",
      imgUrl: pennGpt,
      link: "https://penngpt.netlify.app/",
      category: "ai",
      technologies: ["React", "Node.js"],
      date: "2024",
    },
  ];

  return (
    <>
      <section className="project" id="projects">
        <Container>
          {isDesktop && <BlobCursor />}
          <Row>
            <Col>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <h2>Projects</h2>

                    <p>
                      <ShinyText
                        text="Explore my latest work in medical consulting, education technology, and web development 🚀"
                        disabled={false}
                        speed={3}
                        className="custom-class"
                      />
                    </p>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                      <Nav
                        variant="pills"
                        className="nav-pills mb-5 justify-content-center align-items-center"
                      >
                        <Nav.Item>
                          <Nav.Link eventKey="first">All</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">Web Dev</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">AI & ML</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <Row className="justify-content-center">
                            {projects.map((project, index) => (
                              <ProjectCard
                                key={index}
                                {...project}
                                onMouseEnter={() => setHoveredProject(index)}
                                onMouseLeave={() => setHoveredProject(null)}
                                isHovered={hoveredProject === index}
                              />
                            ))}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <Row>
                            {projects
                              .filter((project) => project.category === "web")
                              .map((project, index) => (
                                <ProjectCard key={index} {...project} />
                              ))}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <Row>
                            {projects
                              .filter((project) => project.category === "ai")
                              .map((project, index) => (
                                <ProjectCard key={index} {...project} />
                              ))}
                          </Row>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
          <img
            src={colorSharpTwo}
            className="background-image-left"
            alt="Gradient Image"
          />
        </Container>
      </section>
    </>
  );
}

export default Projects;

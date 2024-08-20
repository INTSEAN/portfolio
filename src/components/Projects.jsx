import React from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import "animate.css";
import TrackVisibility from "react-on-screen";
import colorSharpTwo from "../assets/img/color-sharp2.png";
import wordLingo from "../assets/img/wordlingo.png";
import pennGpt from "../assets/img/penngpt.png";
import gymJam from "../assets/img/gymjam.png";
import hackmate from "../assets/img/hackmate.png";

function Projects() {
  const projects = [
    {
      title: "Hack Mate",
      description: "Social Media + Hackathons",
      imgUrl: hackmate,
      link: "https://www.google.com",
    },
    {
      title: "Gym Jam",
      description: "Fitness + Music👟",
      imgUrl: gymJam,
      link: "https://gymjam.netlify.app/",
    },
    {
      title: "Penn GPT",
      description: "AI for Education 🤖",
      imgUrl: pennGpt,
      link: "https://penngpt.netlify.app/",
    },
    {
      title: "Word Lingo",
      description: "Machine Learning + Linguistics 💻",
      imgUrl: wordLingo,
      link: "https://wordlingo.netlify.app/",
    },
  ];
  return (
    <>
      <section className="project" id="projects">
        <Container>
          <Row>
            <Col>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={isVisible ? "" : ""}>
                    <h2>Projects</h2>
                    <p>Welcome to my Project Section 📊 </p>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                      <Nav
                        variant="pills"
                        className="nav-pills mb-5 justify-content-center align-items-center"
                        id="pills-tab"
                      >
                        <Nav.Item>
                          <Nav.Link eventKey="first">
                            Some of my recent projects
                          </Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                          <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">Tab 3</Nav.Link>
                        </Nav.Item> */}
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <Row>
                            {projects.map((project, index) => {
                              return <ProjectCard key={index} {...project} />;
                            })}
                          </Row>
                        </Tab.Pane>
                        {/* <Tab.Pane eventKey="second">Hbuydeu</Tab.Pane>
                        <Tab.Pane eventKey="third">ferfrefre</Tab.Pane> */}
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

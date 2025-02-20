import React from "react";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import Waves from "./Waves";

function Banner() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const toRotate = [
    "FullStack Web Developer",
    "Mobile Developer",
    "Artificial Intelligence Engineer",
  ];
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        className="banner"
        id="home"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <span className="tagline"> Welcome to my portfolio</span>
                    <h1>
                      {`I am Sean Donovan`}{" "}
                      <span className="wrap" style={{ color: "purple" }}>
                        {text}
                      </span>{" "}
                    </h1>
                    <p>
                      Hello, I'm Sean Donovan, a first-generation college
                      student at the University of Pennsylvania, where I'm
                      harnessing my passion for computer science to solve
                      real-world problems. From troubleshooting tech issues for
                      my family to leading projects in student organizations
                      like GDSC@Penn and AIBC@Penn, I've cultivated a deep love
                      for algorithmic thinking and full-stack development. I'm
                      seeking a full-time role as a Software Engineer where I
                      can contribute to building impactful software solutions
                      that improve lives. Let's connect and explore how we can
                      make a positive difference together!
                    </p>
                    <button onClick={scrollToContact}>
                      Let's connect
                      <i
                        className="fa-solid fa-circle-arrow-right"
                        style={{
                          color: "#6f4cd6",
                          paddingLeft: "10px",
                          fontSize: "25px",
                        }}
                      ></i>
                    </button>
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <img src={headerImg} alt="Header Image" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Banner;

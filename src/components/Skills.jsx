import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import meterOne from "../assets/img/meter1.svg";
import meterTwo from "../assets/img/meter2.svg";
import meterThree from "../assets/img/meter3.svg";
import colorSharp from "../assets/img/color-sharp.png";

function Skills() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <section className="skill" id="skills">
        <Container>
          <Row>
            <Col>
              <div className="skills-bx">
                <h2>Skills</h2>
                <p> What can I do? Look at the section below </p>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="skill-slider"
                >
                  <div className="item">
                    <img src={meterThree} alt="Image" />
                    <h5>Machine Learning Development</h5>
                  </div>
                  <div className="item">
                    <img src={meterOne} alt="Image" />
                    <h5>Blockchain Development</h5>
                  </div>
                  <div className="item">
                    <img src={meterOne} alt="Image" />
                    <h5>Web Development</h5>
                  </div>
                  <div className="item">
                    <img src={meterOne} alt="Image" />
                    <h5>Artificial Intelligence Development</h5>
                  </div>
                </Carousel>
              </div>
            </Col>
          </Row>
        </Container>
        <img className="background-image-left" src={colorSharp} alt="" />
      </section>
    </>
  );
}

export default Skills;

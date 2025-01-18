import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import langOne from "../assets/img/lang1.svg";
import langTwo from "../assets/img/lang2.svg";
import langThree from "../assets/img/lang3.svg";
import langFour from "../assets/img/lang4.svg";
import langFive from "../assets/img/lang5.svg";
import langSeven from "../assets/img/lang7.svg";
import langEight from "../assets/img/lang8.svg";
import langNine from "../assets/img/lang9.svg";
import langEleven from "../assets/img/lang11.svg";
import colorSharp from "../assets/img/color-sharp.png";
import RollingGallery from './RollingGallery';

function Skills() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsive = {
    superLargeDesktop: {
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

  const skillImages = [
    langOne,
    langTwo,
    langThree,
    langFour,
    langFive,
    langSeven,
    langEight,
    langNine,
    langEleven,
  ];

  return (
    <>
      <section className="skill" id="skills" style={{ position: 'relative' }}>
        <div className="magnet-lines-background">
        </div>
        <Container>
          <Row>
            <Col>
              <div className="skills-bx">
                <h2>Programming Languages + Frameworks</h2>
                <p> I speak fluent... </p>
                {isDesktop ? (
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    className="skill-slider"
                  >
                    {skillImages.map((img, index) => (
                      <div className="item" key={index}>
                        <img src={img} alt={`Skill ${index + 1}`} />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <RollingGallery autoPlay={true} pauseOnHover={true} images={skillImages} />
                )}
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

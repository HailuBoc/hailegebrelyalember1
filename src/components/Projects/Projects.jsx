import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

const projects = [
  {
    title: "Blue Nile Booking",
    description:
      "Blue Nile Booking is a fast and reliable platform for booking hotels, events, car rentals and travel across Ethiopia.",
    link: "https://bluenileplc.vercel.app/",
    ghLink: "https://github.com/HailuBoc/bluenile",
    imgPath: "/image.png",
  },
  {
    title: "Hulu School Tutoring App",
    description:
      "Hulu School is a smart tutoring app that connects students with qualified tutors for personalized learning and academic support anytime, anywhere.",
    link: "https://huluschooltutor.vercel.app/",
    ghLink: "https://github.com/HailuBoc/huluschooltutorapp",
    imgPath: "/image copy.png",
  },
  {
    title: "Bruh Lifelog App",
    description:
      "A modern content and life-tracking platform featuring user authentication, personalized dashboards, and a clean, responsive UI built with Next.js.",
    link: "https://lifelog-beta.vercel.app/",
    ghLink: "https://github.com/HailuBoc/lifelog",
    imgPath: "/lifelog.jpg",
  },

  {
    title: "Farmers Marketplace",
    description:
      "A full-stack platform where farmers can sell products, manage inventory, handle orders, and connect with buyers through a modern and secure marketplace.",
    link: "https://your-live-link-here.com", // add your deployed link if available
    ghLink: "https://github.com/HailuBoc/farmer_marketplace",
    imgPath: "/farmers_marketplace.png", // change to your actual image file
  },
];

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((project, idx) => (
            <Col md={4} className="project-card" key={project.title}>
              <ProjectCard
                title={project.title}
                description={project.description}
                demoLink={project.link}
                ghLink={project.ghLink}
                imgPath={project.imgPath}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;

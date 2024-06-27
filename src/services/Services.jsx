import React from "react";
import { motion } from "framer-motion";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/service.css";
import serviceData from "../assets/data/serviceData";


const Services = () => {
  return (
    <section className="services">
      <Container>
        <Row>
          {
            serviceData.map((item, index) => (
              <Col xl="3" lg='4' md='6' key={index}>
                <motion.div className="service__item" whileHover={{ scale: 1.1 }} style={{ background: item.bg }}>
                  <span>
                    <i className={item.icon}></i>
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </motion.div>
              </Col>
            ))
          }
        </Row>
      </Container>
    </section>
  )
}

export default Services;
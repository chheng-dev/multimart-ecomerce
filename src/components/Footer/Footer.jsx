import React from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import logo from "../../assets/images/eco-logo.png";
import { Link } from "react-router-dom";

import "../../styles/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col lg='4'>
            <div className="logo">
              <div>
                <h1 className="text-white">Multimart</h1>
              </div>
            </div>
            <p className="footer__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique doloremque provident fuga ipsum nisi animi fugit consectetur obcaecati? Laudantium sunt dolor repellat necessitatibus, illum maiores sed odio! Eaque, amet libero!</p>
          </Col>

          <Col lg='3'>
            <div className="footer__quick_links">
              <h4 className="quick__link_title">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to='#'>Mobile Phone</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to='#'>Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to='#'>Air Chair</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to='#'>Smart Watches </Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='2'>
            <div className="footer__quick_links">
              <h4 className="quick__link_title">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to='/login'>Login</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                  <Link to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='3'>
            <div className="footer__quick_links">
              <h4 className="quick__link_title">Contact</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p className="mb-0">123 Chroy Chhava, Phnom Penh, Cambodia</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p className="mb-0">+85583292833</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p className="mb-0">dev@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg='12'>
            <p className="footer__copy_right text-center">
              Copyright {year} developed by Oeung Chungchheng. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;
import React, { useEffect, useState } from "react";

import Helmet from "../components/Helmet/Helmet";
import Services from "../services/Services";
import ProductList from "../UI/ProductList";
import products from "../assets/data/products";

import { Col, Container, Row } from "react-bootstrap";

import heroImg from "../assets/images/hero-img.png";
import counterImg from "../assets/images/counter-timer-img.png";

import "../styles/home.css";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Clock from "../UI/Clock";

const Home = () => {
  const year = new Date().getFullYear();
  const [trandingProducts, setTrandingProduct] = useState([]);
  const [bestProducts, setBestProduct] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);


  useEffect(()=>{
    const filteredTrandingProducts = products.filter((item) => item.category === 'chair');
    setTrandingProduct(filteredTrandingProducts);

    const filteredBestProducts = products.filter((item) => item.category === 'sofa');
    setBestProduct(filteredBestProducts);

    const filteredMobileProducts = products.filter((item) => item.category === 'mobile');
    setMobileProducts(filteredMobileProducts);

    const filteredWirelessProducts = products.filter((item) => item.category === 'wireless');
    setWirelessProducts(filteredWirelessProducts);

    const filteredPopularProducts = products.filter((item) => item.category === 'watch');
    setPopularProducts(filteredPopularProducts);
  },[]);

  return (
      <>
      <Helmet title={'Home'} />
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6' className="m-auto">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h3>Make Your Interior More Minimalistic & Modern</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} className="shop__btn">
                  <Link to='/shop'>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="tranding__products">
        <Container>
          <Row>
            <Col lg='12' className="text-center">
              <h2 className="section__title">Tranding Products</h2>
            </Col>
            <ProductList data={trandingProducts} />
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg='12' className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            <ProductList data={bestProducts} />
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg='6' md='12' className="count__down_col">
              <div className="clock__top_content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />

              <motion.button whileHover={{ scale: 1.2 }} className="shop__btn store__btn">
                <Link to='/shop'>Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg='6' md='12' className="text-end counter__img">
              <img src={counterImg} alt="counter-image" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg='12' className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            <ProductList data={mobileProducts} />
            <ProductList data={wirelessProducts} />
          </Row>
        </Container>
      </section>

      <section className="popular__category">
        <Container>
          <Row>
            <Col lg='12' className="text-center mb-5">
              <h2 className="section__title">Popular in Category</h2>
            </Col>
            <ProductList data={popularProducts} />
          </Row>
        </Container>
      </section>

    </>
  )
}

export default Home;
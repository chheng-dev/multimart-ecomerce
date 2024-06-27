import React, { useEffect, useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommoSection from "../UI/CommoSection";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import { motion } from "framer-motion";
import ProductList from "../UI/ProductList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

import "../styles/product-details.css";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } =  useParams();
  const product = products.find(item => item.id === id);
  const [tab, setTab] = useState('desc');
  const [rating, setRating] = useState(null); 

  const reviewUser = useRef(''); 
  const reviewMsg = useRef('');
  const dispatch = useDispatch();

  const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product;

  const relatedProducts = products.filter(item => item.category === category);

  const submitHandler = (e) => {
     e.preventDefault();

     const reviewUserName = reviewUser.current.value;
     const reviewUserMsg = reviewMsg.current.value;

     const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating: rating
     }
     console.log(reviewObj);
     toast.success('Review Submitted');
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      imgUrl: imgUrl,
      productName,
      price
    }));

    toast.success('Product added successfully.')
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);


  return (
    <Helmet title={productName}>
      <CommoSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg=  '6'>
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg='6'>
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p className="mb-0">(<span>{avgRating}</span> ratings)</p>
                </div>

                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button whileHover={{ scale: 1.2 }} className="shop__btn" onClick={addToCart}>Add to Cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={()=>setTab('desc')}>Decription</h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={()=>setTab('rev')}>Reviews ({reviews.length})</h6>
              </div>

              {
                tab === 'desc' ? (
                  <div className="tab__content mt-4">
                    <p>{description}</p>
                </div>
                ) : (
                  <div className="product__reivew mt-4">
                    <div className="review__wrapper">
                      <ul>
                        {
                          reviews?.map((item, index) => (
                            <li key={index} className="mb-4">
                              <h6>Jhon Doe</h6>
                              <span>{item.rating} ( rating)</span>
                              <p>{item.text}</p>
                            </li>
                          ))
                        }
                      </ul>

                      <div className="review__form">
                        <h4>Leave your experience</h4>
                        <form onSubmit={submitHandler}>
                          <div className="form__group">
                            <input type="text" placeholder="Enter name" ref={reviewUser} required />
                          </div>
                          
                          <div className="form__group d-flex align-items-center gap-5">
                            <motion.span whileHover={{ scale: 1.2 }} onClick={() => setRating(1)}>1 <i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileHover={{ scale: 1.2 }} onClick={() => setRating(2)}>2 <i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileHover={{ scale: 1.2 }} onClick={() => setRating(3)}>3 <i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileHover={{ scale: 1.2 }} onClick={() => setRating(4)}>4 <i className="ri-star-s-fill"></i></motion.span>
                            <motion.span whileHover={{ scale: 1.2 }} onClick={() => setRating(5)}>5 <i className="ri-star-s-fill"></i></motion.span>
                          </div>

                          <div className="form__group">
                            <textarea rows={4} type="text" placeholder="Review Message...." ref={reviewMsg} required />
                          </div>

                          <button type="submit" className="shop__btn">Submit</button>
                        </form>
                      </div>
                    </div>
                  </div>
                )
              }
            </Col>

            <Col lg='12' className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>

            <ProductList data={relatedProducts}/>
          </Row>
        </Container>
      </section>
    </Helmet>
    )
}

export default ProductDetails;
import React from "react";
import proImg from "../assets/images/arm-chair-01.jpg";
import { motion } from "framer-motion";

import "../styles/product-card.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { cartActions } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';


const ProductCard = ({item}) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(cartActions.addItem({
      id: item.id,
      productName: item.productName,
      price: item.price,
      imgUrl: item.imgUrl
    }))
    toast.success('product added to the cart');
  };

  return (
    <Col lg='3' md='4' sm="6" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="pro-image" />
        </div>
        <div className="product__info p-2">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>{item.category}</span>
        </div>
        <div className="product__card_button d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span whileHover={{ scale: 1.2 }} onClick={addToCart}>
            <i className="ri-add-line"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  )
}

export default ProductCard;
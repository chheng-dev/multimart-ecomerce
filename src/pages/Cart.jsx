import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommoSection from "../UI/CommoSection";
import { Col, Container, Row } from "react-bootstrap";

import "../styles/cart.css";
import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const Tr = ({ item }) => {
    const dispatch = useDispatch();
    const deleteProduct = () => {
      dispatch(cartActions.deleteItem(item.id));
      toast.success('product has been removed.');
    }
    return (
      <tr>
        <td>
        <img src={item.imgUrl} alt="" />
        </td>
        <td>
          { item.productName }
        </td>
        <td>
          ${item.price}
        </td>
        <td>
          {item.qty}
        </td>
        <td>
          <motion.i whileHover={{ scale: 1.2 }} className="ri-delete-bin-line" onClick={deleteProduct}></motion.i>
        </td>
      </tr>
    )
  }

  return (
    <Helmet title='Cart'>
      <CommoSection title='Cart' />
      <section>
        <Container >
          <Row>
            <Col lg='9'>
              {
                cartItems.length === 0 ? (
                  <h2 className="fs-4 text-center">No item added to the cart</h2>
                ) : (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map((item, index) => (
                          <Tr item={item} key={index}/>
                        ))
                      }
                    </tbody>
                  </table>
                )
              }
            </Col>
            <Col lg='3'>
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">taxes and shipping will calculate in checkout</p>
              <div>
                <button className="shop__btn w-100 mb-3">
                  <Link to='/checkout'>
                    Checkout
                  </Link>
                </button>
                <button className="shop__btn w-100">
                  <Link to="/shop">
                    Continue Shopping
                  </Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Cart;
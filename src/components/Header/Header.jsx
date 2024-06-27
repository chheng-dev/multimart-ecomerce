import React, { useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "../../styles/header.css";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__link = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  }
]

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const profileActionRef = useRef(null);

  const totalQuantity = useSelector(state => state.cart.totalQty);

  const navigateToCart = () => {
    navigate("/cart");
  }

  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Logged out');
      navigate('/home');
    }).catch(err => {
      toast.error(err.message);
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu');

  const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profile_actions');

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu"> 
                {
                  nav__link.map((item, index)=>(
                    <li className="nav__item" key={index}>
                      <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                <span className="badege">1</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badege">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} src={currentUser ? currentUser.photoURL : userIcon} alt="user-icon" onClick={toggleProfileActions} />
                <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {
                    currentUser ? (
                      <span onClick={logout}>Logout</span>
                    ) : 
                    (
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <Link to='/signup'>Signup</Link>
                        <Link to='/login' onClick={logout}>Login</Link>
                        <Link to='/dashboard'>Dashboard</Link>
                      </div>
                    )
                  }
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header;
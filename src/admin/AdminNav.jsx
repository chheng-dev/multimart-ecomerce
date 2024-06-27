import React from "react";
import { Container, Row  } from "react-bootstrap";
import useAuth from "../custom-hooks/useAuth";
import {NavLink} from "react-router-dom"

import "../styles/admin-nav.css";

const admin__nav = [
  {
    display: 'Dashboard',
    path: '/dashboard'
  },
  {
    display: 'All-Products',
    path: '/dashboard/all-products'
  },
  {
    display: 'Orders',
    path: '/dashboard/orders'
  },
  {
    display: 'Users',
    path: '/dashboard/users'
  },
];

const AdminNav =  () => {
  const { currentUser } = useAuth();
  
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav_top">
          <Container>
            <div className="admin___nav__wrapper_top">
              <div className="logo">
                <h2>Multimart</h2>
              </div>

              <div className="search__box">
                <input type="text" placeholder="Search...." />
                <span><i className="ri-search-line"> </i></span>
              </div>
              <div className="admin___nav__top_right d-flex align-items-center gap-3">
                <span><i className="ri-notification-3-line"></i></span>
                <span><i className="ri-settings-2-line"></i></span>
                <img src={currentUser.photoURL} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu_list">
                {
                  admin__nav.map((item, index) => (
                    <li className="admin__menu_item" key={index}>
                      <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__admin_menu' : ''}>
                        {item.display}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default AdminNav;
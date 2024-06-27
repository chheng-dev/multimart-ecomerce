import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommoSection from "../UI/CommoSection";
import { Col, Container, Row } from "react-bootstrap";
import Select from 'react-select';


import "../styles/shop.css";

import products from "../assets/data/products";
import ProductList from "../UI/ProductList";


const Shop = () => {
  const [productsData, setProductsData] = useState(products);
  
  const categoryOptions = [
    { value: '', label: 'All' },
    { value: 'sofa', label: 'Sofa' },
    { value: 'mobile', label: 'Moblie' },
    { value: 'chair', label: 'Chair' },
    { value: 'watch', label: 'Watch' },
    { value: 'wireless', label: 'Wireless' }
  ];

  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);

  const handleFilter = (selectedOption) => {
    setSelectedCategoryOption(selectedOption);

    const filterValue = selectedOption.value;
    
    if(filterValue) {
      const filteredProducts = products.filter(item => item.category === filterValue);
      setProductsData(filteredProducts);
    } else {
      setProductsData(products);

    }
  }

  const handleSearch = e => {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    setProductsData(searchedProducts);
  }

  return (
    <Helmet title='Shop'>
      <CommoSection title='Products' />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                <Select
                  value={selectedCategoryOption}
                  onChange={handleFilter}
                  options={categoryOptions}
                  placeholder="Filter By Category"
                />
              </div>
            </Col>
            <Col lg='3' md='6' className="text-end">
              <div className="filter__widget">
                <select name="" id="">
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input type="text" placeholder="Search...." onChange={handleSearch} />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {
              productsData.length === 0  ? (
                <h1>No products are found!</h1>
              ) 
              : (
                <ProductList data={productsData} />
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop;
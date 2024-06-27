import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import useGetData from "../custom-hooks/useGetData";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

const AllProducts =  () => {
  const { data, loading, error } = useGetData('products');
  const deleteProduct = async id => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('product has been deleted!');
  }

  return (
    <section>
      <Container >
        <Row>
          <Col lg='12'>
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
                {
                  loading ? <h5 className="py-5">Loading.....</h5>
                  : 
                  <>
                  <tbody>
                    {
                      data.map(item => (
                        <tr key={item.id}>
                          <td>
                            <img src={item.imgUrl} alt="" className="tr__img" />
                          </td>
                          <td>{item.title}</td>
                          <td>
                            <span className="badge">{item.category.label}</span>
                          </td>
                          <td>${item.price}</td>
                          <td>
                            <button className="btn btn-sm btn-danger" onClick={()=>{deleteProduct(item.id)}}>Delete</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                  </>
                }
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProducts;
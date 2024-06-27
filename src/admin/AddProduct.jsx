import React, {useState} from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import Select from 'react-select';
import { toast } from "react-toastify";
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProduct =  () => {
  const categoryOptions = [
    { value: 'sofa', label: 'Sofa' },
    { value: 'mobile', label: 'Moblie' },
    { value: 'chair', label: 'Chair' },
    { value: 'watch', label: 'Watch' },
    { value: 'wireless', label: 'Wireless' }
  ];

  const [selectedCategoryOption, setSelectedCategoryOption] = useState(null);

  const [enterTitle, setTitle] = useState('');
  const [enterShortDesc, setShortDesc] = useState('');
  const [enterDesc, setDesc] = useState('');
  const [enterPrice, setPrice] = useState(0);
  const [enterProImg, setProImg] = useState(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFilter = (selectedOption) => {
    setSelectedCategoryOption(selectedOption);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const newProduct = {
  //   //   title: enterTitle,
  //   //   shortDesc: enterDesc,
  //   //   description: enterDesc,
  //   //   price: enterPrice,
  //   //   category: selectedCategoryOption,
  //   //   imgUrl: enterProImg
  //   // }

  //   try {
  //     const docRef = await collection(db, 'products');
  //     const storageRef = ref(storage, `productImages/${Date.now() + enterProImg.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, enterProImg);

  //     uploadTask.on(() => {
  //       toast.error('images not uploaded!');
  //     }, () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //         await addDoc(docRef, {
  //           title: enterTitle,
  //           shortDesc: enterDesc,
  //           description: enterDesc,
  //           price: enterPrice,
  //           category: selectedCategoryOption,
  //           imgUrl: downloadURL
  //         });
  //       });
  //       toast.success('Product successfully added!');
  //     });
  //   } catch (error) {

  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = collection(db, 'products');
      const storageRef = ref(storage, `productImages/${Date.now()}_${enterProImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProImg);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
        },
        (error) => {
          setLoading(false);
          toast.error('Image upload failed!');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(docRef, {
            title: enterTitle,
            shortDesc: enterDesc,
            description: enterDesc,
            price: enterPrice,
            category: selectedCategoryOption,
            imgUrl: downloadURL
          });
          setLoading(false);
          toast.success('Product successfully added!');
          navigate('/dashboard/all-products')
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error('Error adding product: ' + error.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className="text-center">
            {
              loading ? <h4 className="py-5">Loading....</h4>
              : 
              <>
              <h4>Add Product</h4> 
              <Form onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <span>Product title</span>
                  <input type="text" placeholder="Doble sofa" value={enterTitle} onChange={e => setTitle(e.target.value)} required />
                </FormGroup>
                
                <FormGroup className="form__group">
                  <span>Short Desc</span>
                  <input type="text" placeholder="lorem......" value={enterShortDesc} onChange={e => setShortDesc(e.target.value)} required />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Description</span>
                  <input type="text" placeholder="Description......" value={enterDesc} onChange={e => setDesc(e.target.value)} required />
                </FormGroup>

                <div className="d-flex align-items-center justify-content-between gap-3">
                  <FormGroup className="form__group w-50">
                    <span>Price</span>
                    <input type="number" placeholder="$1" value={enterPrice} onChange={e => setPrice(e.target.value)} required />
                  </FormGroup>

                  <FormGroup className="form__group w-50">
                    <span>Category</span>
                    <Select
                      value={selectedCategoryOption}
                      onChange={handleFilter}
                      options={categoryOptions}
                      placeholder="Filter By Category"
                    />
                  </FormGroup>
                </div>

                <FormGroup className="form__group">
                  <span>Product Image</span>
                  <input type="file" onChange={e => setProImg(e.target.files[0])} required />
                </FormGroup>

                <button type="submit" className="shop__btn">Add Product</button>
              </Form>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProduct;
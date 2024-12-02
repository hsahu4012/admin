import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const WishlistAdd = () => {
  const [userIds , setUserIds] = useState([])
  const [productIds, setProductIds] = useState([]);
  const [modalShow,setModalShow] = useState(false)
  const [wishlistformValue ,setWishlistFormValue] = useState([{}]);

  const navigate = useNavigate();
  const FormValues = {
    userid: '',
    productid: '',
    wishlist_date: '',
  };

  const submitWishlist =  values => {
    setWishlistFormValue(values);
    setModalShow(true);
  };

const confirmAddWishlist = async()=>{
  try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}wishlist/addToWishlist`,
        wishlistformValue
      );
      setModalShow(false)
      navigate('/wishlist');
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
   const fetchUserIds = async()=>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}users/allusers`)
      const allUserIds = response.data.map(user => user.userid);
      setUserIds(allUserIds);
   }catch(error){
    console.log(error)
   }
  }

  const fetchProductIds = async()=>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}products/allProducts`)
        const allProductIds = response.data.map(product => product.productid);
        setProductIds(allProductIds);
  }catch(error){
    console.log(error);
  }
};

   fetchUserIds();
   fetchProductIds();
  }, []);
  

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={FormValues}
        onSubmit={values => submitWishlist(values)}
      >
        <Form>
          <h3 className='text-center mb-5'>WishList Add</h3>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>UserId:-</label>
            <Field as="select" name="userid" className="col-6" required>
              <option value="">Select an User ID</option>
              {userIds.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </Field>
          </div>

          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>ProductId:-</label>
            <Field name='productid' as="select" type='text' className='col-6' required >
            <option value="">Select the Product ID</option>
              {productIds.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </Field>
          </div>
          {/* <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Wishlist_Date:-</label>
            <Field name='wishlist_date' type='text' className='col-6' />
          </div> */}
          <div className='hey'>
            <button type='submit'>Submit Now</button>
            <Link to='/wishlist' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>

      <ConfirmationModal
        show={modalShow}
        modalMessage = "you really want to Add this WishList"
        onHide={() => setModalShow(false)}
        confirmation ={confirmAddWishlist}
        operationType = "Add"
        wantToAddData = {true}
      />
    </>
  );
};

export default WishlistAdd;

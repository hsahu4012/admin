import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WishlistAdd = () => {
  const navigate = useNavigate();
  const FormValues = {
    userid: '',
    productid: '',
    wishlist_date: '',
  };

  const submitWishlist = async values => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to Add New wishlist???'
      );
      if (confirmed) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}wishlist/addToWishlist`,
          values
        );
        navigate('/wishlist');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <Field name='userid' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>ProductId:-</label>
            <Field name='productid' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Wishlist_Date:-</label>
            <Field name='wishlist_date' type='text' className='col-6' />
          </div>
          <div className='hey'>
            <button type='submit'>Submit Now</button>
            <Link to='/wishlist' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default WishlistAdd;

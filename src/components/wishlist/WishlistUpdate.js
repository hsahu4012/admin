import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const WishlistUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [FormValues, setFormValues] = useState({
    userid: '',
    productid: '',
    wishlist_date: '',
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}wishlist/usersWishlist/${id}`)
      .then(res => {
        console.log(res);
        let obj = {
          userid: res.data[0].userid,
          productid: res.data[0].productid,
          wishlist_date: res.data[0].wishlist_date,
        };
        setFormValues(obj);
        console.log(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  // const handleFieldChange = (e) => {
  //   setFormValues(e.target.value);
  // };

  const UpdateWishlist = async values => {
    try {
      // Check if form values are unchanged
      const isUnchanged = Object.keys(FormValues).every(
        key => FormValues[key] === values[key]
      );

      if (isUnchanged) {
        alert('No changes were made. Nothing to update.');
        return;
      }
      //after form values update
      const confirmed = window.confirm(
        'Are you sure you want to Update this wishlist?'
      );
      if (confirmed === true) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}wishlist/updateWishlist/${id}`,
          values
        );
        navigate('/wishlist');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('formValues', FormValues);
  }, [FormValues]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={FormValues}
        onSubmit={values => UpdateWishlist(values)}
      >
        <Form>
          <h2 className='text-center mb-5'>WishList Update</h2>
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

export default WishlistUpdate;

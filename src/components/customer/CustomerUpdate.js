import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Customer.css';

const CustomerUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    city: '',
    address: '',
    alternatecontact: '',
    pincode: '',
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}customer/customer/customerById/${id}`
      )
      .then(res => {
        console.log(res);
        let obj = {
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
          password: res.data[0].password,
          city: res.data[0].city,
          address: res.data[0].address,
          alternatecontact: res.data[0].alternatecontact,
          pincode: res.data[0].pincode,
        };
        setFormValues(obj);
        console.log(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  // const handleFieldChange = (e) => {
  //   setFormValues(e.target.value);
  // };

  const updateCustomer = async values => {
    try {
      // Check if form values are unchanged
      const isUnchanged = Object.keys(formValues).every(
        key => formValues[key] === values[key]
      );

      if (isUnchanged) {
        alert('No changes were made. Nothing to update.');
        return;
      }
      //after form values update
      const confirmed = window.confirm(
        'Are you sure you want to Update this customer?'
      );
      if (confirmed === true) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}customer/updateCustomerDetails/${id}`,
          values
        );
        navigate('/customerDetails');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('formValues', formValues);
  }, [formValues]);

  return (
    <>
      <h3 className='text-center mb-5'>Customer Update</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => updateCustomer(values)}
      >
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Name:-</label>
            <Field name='name' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Email:-</label>
            <Field name='email' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Mobile:-</label>
            <Field name='mobile' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Password:-</label>
            <Field name='password' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>City:-</label>
            <Field name='city' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Address:-</label>
            <Field name='address' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Contact:-</label>
            <Field name='alternatecontact' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Pincode:-</label>
            <Field name='pincode' type='text' className='col-6' />
          </div>
          <div className='hey'>
            <button type='submit'>Submit Now</button>
            <Link to='/customerDetails' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default CustomerUpdate;

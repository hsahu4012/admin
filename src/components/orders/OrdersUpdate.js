import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const OrdersUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    order_id: '',
    order_date: '',
    order_time: '',
    order_status: '',
    paymentamount: '',
    paymentstatus: '',
    paymentmode: '',
    addressid: '',
    delivery_status: '',
    tracking_id: '',
    delivery_partner: '',
  });

  const [showNoChnagesModal, setShowNoChnagesModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateValues, setUpdateValues] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}orders/getById/${id}`)
      .then(res => {
        console.log(res);
        let obj = {
          order_id: res.data[0].order_id,
          order_date: res.data[0].order_date,
          order_time: res.data[0].order_time,
          order_status: res.data[0].order_status,
          paymentamount: res.data[0].paymentamount,
          paymentstatus: res.data[0].paymentstatus,
          paymentmode: res.data[0].paymentmode,
          addressid: res.data[0].addressid,
          delivery_status: res.data[0].delivery_status,
          tracking_id: res.data[0].tracking_id,
          delivery_partner: res.data[0].delivery_partner,
        };
        setFormValues(obj);
        console.log(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  // const handleFieldChange = (e) => {
  //   setFormValues(e.target.value);
  // };
  const handleFormSbmit =values => {
    const isUnchanged = Object.keys(formValues).every(
      key => formValues[key] === values[key]
    );
    if (isUnchanged) {
      setShowNoChnagesModal(true);
    } else {
      setShowUpdateModal(true);
      setUpdateValues(values);
    }
  };
  
  const confirmUpdate = async() => {
    try{
      await axios.put(
        `${process.env.REACT_APP_API_URL}orders/updateOrder/${id}`,
        updateValues
      );
      setShowUpdateModal(false);
      navigate('/orders');
    }
    catch(err){
      console.log(err);
    }
  }
    

  // const updateOrder = async values => {
  //   try {
  //     // Check if form values are unchanged
  //     const isUnchanged = Object.keys(formValues).every(
  //       key => formValues[key] === values[key]
  //     );

  //     if (isUnchanged) {
  //       alert('No changes were made. Nothing to update.');
  //       return;
  //     }
  //     //after form values update
  //     const confirmed = window.confirm(
  //       'Are you sure you want to Update this order?'
  //     );
  //     if (confirmed === true) {
  //       await axios.put(
  //         `${process.env.REACT_APP_API_URL}order/updateOrder/${id}`,
  //         values
  //       );
  //       navigate('/orders');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   console.log('formValues', formValues);
  // }, [formValues]);

  return (
    <>
      <h3 className='text-center mb-5'>Order Update</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => handleFormSbmit(values)}
      >
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Order_Id:-</label>
            <Field name='order_id' type='text' className='col-6' readOnly />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Order_Date:-</label>
            <Field name='order_date' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Order_Time:-</label>
            <Field name='order_time' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Order_Status:-</label>
            <Field name='order_status' type='text' className='col-6' />
          </div>

          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>PaymentAmount:-</label>
            <Field name='paymentamount' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>PaymentStatus:-</label>
            <Field name='paymentstatus' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>PaymentMode:-</label>
            <Field name='paymentmode' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>AddressId:-</label>
            <Field name='addressid' type='text' className='col-6' readOnly />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Delivery_Status:-</label>
            <Field name='delivery_status' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Tracking_Id:-</label>
            <Field name='tracking_id' type='text' className='col-6' readOnly />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Delivery_Partner:-</label>
            <Field name='delivery_partner' type='text' className='col-6' />
          </div>
          <div className='hey'>
            <button type='submit'>Submit Now</button>
            <Link to='/orders' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>

      {showNoChnagesModal && (
        <div className='modal fade show' style={{ display: 'block',backgroundColor:'rgba(0,0,0,0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>No changes made</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={() => setShowNoChnagesModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal &&(
        <div className='modal fade show' style={{display:'block',backgroundColor:'rgba(0,0,0,0.5)'}}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className=' modal-body'>
                <p>Are you sure you want to update this order?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-dismiss='modal'
                  onClick={ confirmUpdate}
                >
                  Confirm
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={()=>setShowUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
            
      )}
    </>
  );
};

export default OrdersUpdate;

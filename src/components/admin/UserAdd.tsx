import React, { FC, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import nss_payment from '../../images/nss_payment.jpeg';

const UserAdd: FC = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  const callApiUserAdd = async (values: any) => {
    const url = process.env.REACT_APP_API_URL + 'users/adduser';
    const response = await axios.post(url, values);
    console.log(values);
    console.log(response);
    if (response.status === 201) {
      setStatus(true);
    }
    //alert('User Added Successfully');

    const token = localStorage.getItem('jwttoken');
    if (token) {
      navigate('/userslist');
    }
    return {
      error: false,
    };
  };

  return (
    <div>
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>
        Sign Up Form
      </h4>
      <Formik
        initialValues={{ name: '', email: '', mobile: '', password: '' }}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          const { error } = await callApiUserAdd(values);
          if (!error) {
            resetForm();
          }
        }}
      >
        <div className='row'>
          <Form className='examAddForm'>
            <div className='row'>
              <label htmlFor='name' className='col-4 my-2'>
                Name:
              </label>
              <Field name='name' type='text' className='col-8' required />
            </div>

            <div className='row'>
              <label htmlFor='email' className='col-4 my-2'>
                Email
              </label>
              <Field name='email' className='col-8' type='email' required />
            </div>

            <div className='row'>
              <label htmlFor='mobile' className='col-4 my-2'>
                Mobile
              </label>
              <Field name='mobile' type='text' className='col-8' required />
            </div>

            <div className='row'>
              <label htmlFor='password' className='col-4 my-2'>
                Password
              </label>
              <Field
                name='password'
                type='password'
                className='col-8'
                required
              />
            </div>

            <div className='row'>
              <div className='text-center my-4'>
                <button type='submit' className='btn btn-success'>
                  Sign Up
                </button>
              </div>
            </div>

            <br></br>
          </Form>
        </div>
      </Formik>

      {status && (
        <div className='alert alert-success' role='alert'>
          You are registered. Your account will be activated within 24 hours of
          Payment.&nbsp;
          <button
            className='btn btn-success'
            onClick={() => setPaymentModal(true)}
          >
            Click here for payment details.
          </button>
        </div>
      )}

      {paymentModal && (
        <div
          className='modal'
          style={{ display: 'block', background: 'rgba(100,100,100,0.8)' }}
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title text-center' id='exampleModalLabel'>
                  Payment Details
                </h5>
                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
              </div>
              <div className='modal-body'>
                Fee - Rs 300<br></br>
                <br></br>
                Note - Please, make payment from registered mobile number and
                send the screenshot on WhatsApp (9135707273).
                <br></br>
                <br></br>
                <img src={nss_payment} height={400} alt='Payment QR' />
              </div>
              <div className='modal-footer text-center'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setPaymentModal(false)}
                >
                  Close
                </button>
                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAdd;

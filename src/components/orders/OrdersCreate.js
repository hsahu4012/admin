import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const OrdersCreate = () => {
  const navigate = useNavigate();
  const formValues = {
    order_id: '',
    order_date: '',
    order_time: '',
    order_status: '',
    userid: '',
    isactive: '1',
    paymentamount: '',
    paymentstatus: '',
    paymentmode: '',
    addressid: '',
    delivery_status: '',
    tracking_id: '',
    delivery_partner: '',
    costamount:'0'
  };
  const [showModal, setShowModal] = useState(false);
  const [submittedValues, setSubmittedValues] = useState(null);
  const [userIds, setUserIds] = useState([]);
  const [addressIds, setAddressIds] = useState([]);

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}users/allusers`);
        setUserIds(response.data);
      } catch (error) {
        console.error('Error fetching order IDs:', error);
      }
    };
    const fetchAddressIds = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}address/allAddress`);
        setAddressIds(response.data);
      } catch (error) {
        console.error('Error fetching address IDs:', error);
      }
    }
    fetchUserIds();
    fetchAddressIds();
  }, []);

  const handleFormSubmit = (values) => {
    setShowModal(true);
    setSubmittedValues(values);
  };

  const confirmSubmission = async () => {
    try{
      await axios.post(`${process.env.REACT_APP_API_URL}orders/addOrder`, submittedValues);
      setShowModal(false);
      navigate('/orders');
    } catch (error) {
      console.log(error);
    }
  };

  // const submitOrder = async values => {
  //   try {
  //     const confirmed = window.confirm(
  //       'Are you sure you want to Add New Order???'
  //     );
  //     if (confirmed) {
  //       await axios.post(
  //         `${process.env.REACT_APP_API_URL}orders/addOrder`,
  //         values
  //       );
  //       navigate('/orders');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <h3 className='text-center mb-5'>Order Update</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => handleFormSubmit(values)}
      >
        <Form>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">User ID:</label>
            <Field as="select" name="userid" className="col-6">
              <option value="">Select an User ID</option>
              {userIds.map((user) => (
                <option key={user.userid} value={user.userid}>
                  {user.userid}
                </option>
              ))}
            </Field>
          </div>
          {/* <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Order_Date:-</label>
            <Field name='order_date' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Order_Time:-</label>
            <Field name='order_time' type='text' className='col-6' />
          </div> */}
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
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Address ID:</label>
            <Field as="select" name="addressid" className="col-6">
              <option value="">Select an Address ID</option>
              {addressIds.map((address) => (
                <option key={address.addressid} value={address.addressid}>
                  {address.addressid}
                </option>
              ))}
            </Field>
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Delivery_Status:-</label>
            <Field name='delivery_status' type='text' className='col-6' />
          </div>
          {/* <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Tracking_Id:-</label>
            <Field name='tracking_id' type='text' className='col-6' />
          </div> */}
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Delivery_Partner:-</label>
            <Field name='delivery_partner' type='text' className='col-6' />
          </div>
          <div className='hey'>
            <button type='submit' >Submit Now</button>
            <Link to='/orders' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>

      {showModal && ( 
        <div className='modal fade show' style={{ display: 'block' , backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>Are you sure you want to Add New Order?</p>
              </div>
              <div className='modal-footer'>
              <button
                  type='button'
                  className='btn btn-primary'
                  onClick={confirmSubmission}
                  
                >
                  Confirm
                </button>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => {
                  setShowModal(false);
                }}
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

export default OrdersCreate;

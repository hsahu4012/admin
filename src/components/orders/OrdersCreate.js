import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrdersCreate = () => {
  const navigate = useNavigate();
  const formValues = {
    order_id: '',
    order_date: '',
    order_time: '',
    order_status: '',
    userid: '',
    paymentamount: '',
    paymentstatus: '',
    paymentmode: '',
    addressid: '',
    delivery_status: '',
    tracking_id: '',
    delivery_partner: '',
  };

  const submitOrder = async values => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to Add New Order???'
      );
      if (confirmed) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}order/addOrder`,
          values
        );
        navigate('/orders');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className='text-center mb-5'>Order Update</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => submitOrder(values)}
      >
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Order_Id:-</label>
            <Field name='order_id' type='text' className='col-6' />
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
            <label className='col-4 my-2 text-center'>UserId:-</label>
            <Field name='userid' type='text' className='col-6' />
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
            <Field name='addressid' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Delivery_Status:-</label>
            <Field name='delivery_status' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Tracking_Id:-</label>
            <Field name='tracking_id' type='text' className='col-6' />
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
    </>
  );
};

export default OrdersCreate;

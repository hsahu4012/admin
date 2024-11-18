import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ConfirmationModal } from '../../shared/ConfirmationModal';

const AddressUpdate = () => {
  const { addressid } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    line1: '',
    line2: '',
    line3: '',
    city: '',
    state: '',
    country: '',
    pin: '',
    contact: '',
    alternatecontact: '',
    landmark: '',
  });

  const [modalShow,setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formValuesChanged ,setFormValuesChanged] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}address/addressById/${addressid}`)
      .then(res => {
        console.log(res);
        let obj = {
          name: res.data[0].name,
          line1: res.data[0].line1,
          line2: res.data[0].line2,
          line3: res.data[0].line3,
          city: res.data[0].city,
          state: res.data[0].state,
          country: res.data[0].country,
          pin: res.data[0].pin,
          contact: res.data[0].contact,
          alternatecontact: res.data[0].alternatecontact,
          landmark: res.data[0].landmark,
        };
        setFormValues(obj);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, [addressid]);

  const updateAddress =  values => {
    try {
      const isUnchanged = Object.keys(formValues).every(
        key => formValues[key] === values[key]
      );
      if (isUnchanged) {
        setModalMessage('No changes were made. Nothing to update.');
      }
      else{
        setModalMessage('You really want to Update the Address.');
        setFormValuesChanged(true)
        setFormValues(values);
      }
      setModalShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmUpdateAddress = async()=>{
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}address/updateAddress/${addressid}`,
        formValues
      );
      navigate('/addressdetails');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log('formValues', formValues);
  }, [formValues]);

  return (
    <div className='text-center mb-5'>
      <h2>Address Edit</h2>
      <br />

      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => updateAddress(values)}
      >
        <Form className='examAddForm'>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Name:-</label>
            <Field name='name' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Line1:-</label>
            <Field name='line1' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Line2:-</label>
            <Field name='line2' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Line3:-</label>
            <Field name='line3' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>City:-</label>
            <Field name='city' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>State:-</label>
            <Field name='state' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Country:-</label>
            <Field name='country' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Pincode:-</label>
            <Field name='pin' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Contact:-</label>
            <Field name='contact' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>AlternateContact:-</label>
            <Field
              name='alternatecontact'
              type='text'
              className='col-6'
              required
            />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Landmark:-</label>
            <Field name='landmark' type='text' className='col-6' required />
          </div>
          <div className='text-center my-4'>
            <button type='submit' className='py-1 '>
              Submit
            </button>
            &nbsp; &nbsp;
            <Link to='/addressdetails' className='btn btn-danger back'>
              Back
            </Link>
          </div>

          <br></br>
        </Form>
      </Formik>
      <ConfirmationModal
        show={modalShow}
        modalMessage = {modalMessage}
        onHide={() => setModalShow(false)}
        confirmation ={confirmUpdateAddress}
        operationType = "Update"
        wantToAddData = {formValuesChanged}
      />
    </div>
  );
};

export default AddressUpdate;

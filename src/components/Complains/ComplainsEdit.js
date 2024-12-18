import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { ConfirmationModal } from '../shared/ConfirmationModal';

export const ComplainsEdit = () => {
  const { complainid } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    complain_desc: '',
    resolvestatus: '',
  });

  const [modalShow,setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formValuesChanged ,setFormValuesChanged] = useState(false)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}complains/complainbyid/${complainid}`
      )
      .then(res => {
        console.log(res);
        let obj = {
          complainid: res.data[0].complainid,
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
          address: res.data[0].address,
          orderid: res.data[0].orderid,
          complain_desc: res.data[0].complain_desc,
          resolvestatus: res.data[0].resolvestatus,
        };
        setFormValues(obj);
        console.log(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [complainid]);

  const updateComplain = values => {
    try {
      const isUnchanged = Object.keys(formValues).every(
        key => formValues[key] === values[key]
      );
      setFormValuesChanged(false)
      if (isUnchanged) {
        setModalMessage("Nothing to update")
        setFormValuesChanged(false)
      }
      else{
        setFormValues(values);
        setModalMessage("You Really Want to Update this Complain");
        setFormValuesChanged(true)
      }
      setModalShow(true)
    } catch (err) {
      console.log(err);
    }
  };

  const confirmUpdateComplain = async()=>{
    try{
        await axios.put(
          `${process.env.REACT_APP_API_URL}complains/updatecomplains/${complainid}`,
          formValues
        );
        setModalShow(false);
        navigate('/complainslist');
    }catch(err){
      console.log(err)
    }
  }

  const validate = (formValues) => {
    const errors = {};

    // Validate name
    if (!formValues.name) {
      errors.name = '*Name is required';
    }

    // Validate email
    if (!formValues.email) {
      errors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = '*Email address is invalid';
    }

    // Validate mobile number
    if (!formValues.mobile) {
      errors.mobile = '*Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formValues.mobile)) {
      errors.mobile = '*Mobile number should be of 10 digits';
    }

    return errors;
  };

  useEffect(() => {
    console.log('formValues', formValues);
  }, [formValues]);

  return (
    <>
    <div className='text-center mb-5'>
      <h2>Complain Edit</h2>
      <br />

      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        validate={validate}
        onSubmit={values => updateComplain(values)}
      >
        {({errors})=>(
          <Form className='examAddForm'>
          {/* <div className="row mb-2">
                        <label className="col-4 my-2 text-center">ComplainId:-</label>
                        <Field name="complainid" type="text" className="col-6" required />
                    </div> */}
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Order ID:-</label>
            <Field name='orderid' type='text' className='col-6' readOnly="true" />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Complain ID:-</label>
            <Field name='complainid' type='text' className='col-6' readOnly="true" />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Name:-</label>
            <Field name='name' type='text' className='col-6' required />
            {errors.name && <div className="col-6 offset-4 text-danger small">{errors.name}</div>}
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Email:-</label>
            <Field name='email' type='text' className='col-6' required />
            {errors.email && <div className="col-6 offset-4 text-danger small">{errors.email}</div>}
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Mobile no.:-</label>
            <Field name='mobile' type='text' className='col-6' required />
            {errors.mobile && <div className="col-6 offset-4 text-danger small">{errors.mobile}</div>}
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Address:-</label>
            <Field name='address' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Description:-</label>
            <Field
              name='complain_desc'
              type='text'
              className='col-6'
              required
            />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Resolvestatus:-</label>
            <Field
              name='resolvestatus'
              type='text'
              className='col-6'
              required
            />
          </div>

          <div className='text-center my-4'>
            <button type='submit' className='py-1 '>
              Submit
            </button>
            <Link to='/complainslist' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
        )}
      </Formik>
    </div>

    <ConfirmationModal
        show={modalShow}
        modalMessage = {modalMessage}
        onHide={() => setModalShow(false)}
        confirmation ={confirmUpdateComplain}
        operationType = "Update"
        wantToAddData = {formValuesChanged}
      />
    </>
  );
};

export default ComplainsEdit;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';

export const ComplainsEdit = () => {
  const { complainid } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    subject: '',
    complain_desc: '',
    resolvestatus: '',
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}complains/complainbyid/${complainid}`
      )
      .then(res => {
        // console.log(res);
        let obj = {
          complainid: res.data[0].complainid,
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
          address: res.data[0].address,
          orderid: res.data[0].orderid,
          subject: res.data[0].subject,
          complain_desc: res.data[0].complain_desc,
          resolvestatus: res.data[0].resolvestatus,
        };
        setFormValues(obj);
        // console.log(res.data[0]);
      })
      // .catch(err => console.log(err));
  }, [complainid]);

  const updateComplain = async values => {
    try {
      const isUnchanged = Object.keys(formValues).every(
        key => formValues[key] === values[key]
      );

      if (isUnchanged) {
        alert('No changes were made. Nothing to update.');
        return;
      }
      //after form values update
      const confirmed = window.confirm(
        'Are you sure you want to Update this complain?'
      );
      if (confirmed === true) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}complains/updatecomplains/${complainid}`,
          values
        );
        navigate('/complainslist');
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    // console.log('formValues', formValues);
  }, [formValues]);

  return (
    <div className='text-center mb-5'>
      <h2>Complain Edit</h2>
      <br />

      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => updateComplain(values)}
      >
        <Form className='examAddForm'>
          {/* <div className="row mb-2">
                        <label className="col-4 my-2 text-center">ComplainId:-</label>
                        <Field name="complainid" type="text" className="col-6" required />
                    </div> */}

          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Name:-</label>
            <Field name='name' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Email:-</label>
            <Field name='email' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Mobile no.:-</label>
            <Field name='mobile' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Address:-</label>
            <Field name='address' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>OrderId:-</label>
            <Field name='orderid' type='text' className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Subject:-</label>
            <Field name='subject' type='text' className='col-6' required />
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
            <button type='submit' className='py-1' >
              Submit
            </button>
            <Link to='/complainslist' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ComplainsEdit;

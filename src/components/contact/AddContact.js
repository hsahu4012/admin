import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const AddContact = () => {
  const navigate = useNavigate();
  const [submitConfirmModal, setSubmitConfirmModal] = useState(false);
  const [formSubmittedValues, setFormSubmittedValues] = useState(null);

  const formValues = {
    // setting_id: "",
    name: '',
    email: '',
    mobile: '',
    address: '',
    subject: '',
    message: '',
    // resolvestatus: "",

  };

  const validate = (values) => {
    const errors = {};
    
    // Validate name
    if (!values.name) {
      errors.name = '*Name is required';
    }

    // Validate email
    if (!values.email) {
      errors.email = '*Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = '*Email address is invalid';
    }

    // Validate mobile number
    if (!values.mobile) {
      errors.mobile = '*Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(values.mobile)) {
      errors.mobile = '*Mobile number should be of 10 digits';
    }

    return errors;
  };

  const submitForm = async (values, { setSubmitting }) => {
    setFormSubmittedValues(values);
    setSubmitConfirmModal(true);  
    setSubmitting(false);
  };

  const handleConfirmSubmit = async () => {
    try {
      // Send the contact data to the API
      await axios.post(
        `${process.env.REACT_APP_API_URL}contact/addContact`,
        formSubmittedValues
      );
      navigate('/ContactList');  // Navigate back to the Contact List page
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitConfirmModal(false);  // Close confirmation modal
    }
  };

  return (
    <>
      <h3 className='text-center mb-5'>Contact Create</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        validate={validate}
        onSubmit={submitForm}
      >
         {({ isSubmitting, errors }) => (
            <Form>
              <div className='row mb-2'>
                <label className='col-4 my-2 text-center'> Name:-</label>
                <Field name='name' type='text' className="col-6"/>
                {errors.name && <div className="col-6 offset-4 text-danger small">{errors.name}</div>}
              </div>
              <div className='row mb-2'>
                <label className='col-4 my-2 text-center'>Email:-</label>
                <Field name='email' type='text' className='col-6' />
                {errors.email && <div className="col-6 offset-4 text-danger small">{errors.email}</div>}
              </div>
              <div className='row mb-2'>
                <label className='col-4 my-2 text-center'>Mobile No:-</label>
                <Field name='mobile' type='text' className='col-6' />
                {errors.mobile && <div className="col-6 offset-4 text-danger small">{errors.mobile}</div>}
              </div>
              <div className='row mb-2'>
                <label className='col-4 my-2 text-center'>Address:-</label>
                <Field name='address' type='text' className='col-6' />
              </div>
              <div className='row mb-2'>
                <label className='col-4 my-2 text-center'>Subject:-</label>
                <Field name='subject' type='text' className='col-6' />
              </div>
              <div className='row mb-2'>
                <label className='col-4 my-2 text-center'>Message:-</label>
                <Field name='message' type='text' className='col-6' />
              </div>
              

              <div className='hey'>
                <button type='submit' disabled={isSubmitting}>Submit</button>
                <Link to='/ContactList' className='btn btn-danger back'>
                  Back
                </Link>
              </div>
            </Form>
          )}
      </Formik>

      {/* Confirmation Modal */}
      {submitConfirmModal && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <p>Are you sure you want to add this contact?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSubmitConfirmModal(false)} // Close modal on cancel
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmSubmit} // Confirm and submit
                >
                  Confirm Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddContact;

import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    subject: '',
    message: '',
    resolvestatus: '',
  });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isNoChangeModalOpen, setIsNoChangeModalOpen] = useState(false);
  const [formSubmittedValues, setFormSubmittedValues] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}contact/getById/${id}`)
      .then(res => {
        let obj = {
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
          address: res.data[0].address,
          subject: res.data[0].subject,
          message: res.data[0].message,
          resolvestatus: res.data[0].resolvestatus,
        };
        setFormValues(obj);
      })
      .catch(err => console.log(err));
  }, [id]);

  const contactUpdate = async (values) => {
    try {
      // Call API to update the contact
      await axios.put(
        `${process.env.REACT_APP_API_URL}contact/updateContact/${id}`,
        values
      );
      navigate('/ContactList');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = (values) => {
    const isUnchanged = Object.keys(formValues).every(
      (key) => formValues[key] === values[key]
    );

    if (isUnchanged) {
      setIsNoChangeModalOpen(true);
      return;
    }
    setFormSubmittedValues(values);
    setIsConfirmationModalOpen(true);
  };

  const confirmUpdate = async () => {
    if (formSubmittedValues) {
      await contactUpdate(formSubmittedValues);
      setIsConfirmationModalOpen(false);
    }
  };

  const closeModals = () => {
    setIsConfirmationModalOpen(false);
    setIsNoChangeModalOpen(false);
  };

  return (
    <>
      <h3 className='text-center mb-5'>Contact Update</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'> Name:-</label>
            <Field name='name' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Email:-</label>
            <Field name='email' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Mobile No:-</label>
            <Field name='mobile' type='text' className='col-6' />
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
          
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Resolve Status:-</label>
            <Field name='resolvestatus' type='text' className='col-6' />
          </div>

          <div className='hey'>
            <button type='submit'>Submit</button>
            <Link to='/ContactList' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>

      {/* No Changes Modal */}
      {isNoChangeModalOpen && (
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
                <p>No changes were made. Nothing to update.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModals} // Close the modal
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
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
                <p>Are you sure you want to update this contact?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModals} // Close modal on cancel
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmUpdate} // Confirm and proceed with update
                >
                  Confirm Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateContact;

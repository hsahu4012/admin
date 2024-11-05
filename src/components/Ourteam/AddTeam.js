import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const AddTeam = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const formValues = {
    name: '',
    designation: '',
    department: '',
    image: '',
    description: '',
    sequence: '',
  };

  const openModal = (values) => {
    setFormData(values);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitTeam = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('image', image);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('sequence', formData.sequence);

      await axios.post(
        `${process.env.REACT_APP_API_URL}ourTeam/addourTeam`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      closeModal();
      navigate('/teamList');
    } catch (error) {
      console.log(error);
      closeModal();
    }
  };

  return (
    <>
      <h3 className='text-center mb-5'>Add Team Member</h3>
      <Formik
        initialValues={formValues}
        onSubmit={values => openModal(values)}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Name:</label>
              <Field name='name' type='text' className='col-6' />
            </div>
            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Designation:</label>
              <Field name='designation' type='text' className='col-6' />
            </div>
            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Department:</label>
              <Field name='department' type='text' className='col-6' />
            </div>
            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Image:</label>
              <input
                name='image'
                type='file'
                className='col-6'
                onChange={event => {
                  setImage(event.target.files[0]);
                }}
              />
            </div>
            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Description:</label>
              <Field name='description' type='text' className='col-6' />
            </div>
            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Sequence:</label>
              <Field name='sequence' type='number' className='col-6' />
            </div>

            <div className='text-center'>
              <button type='submit' className='btn btn-primary mx-2'>
                Submit Now
              </button>
              <Link to='/teamList' className='btn btn-danger'>
                Back
              </Link>
            </div>
          </Form>
        )}
      </Formik>

      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered"> 
            <div className="modal-content">
              <div className="modal-body">
                <p className="text-dark">Are you sure you want to add a new team member?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitTeam}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default AddTeam;

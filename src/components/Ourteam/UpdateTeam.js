import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const UpdateTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    designation: '',
    department: '',
    image: '',
    description: '',
    sequence: '',
  });

  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoChangesModalOpen, setIsNoChangesModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}ourteam/ourteambyid/${id}`)
      .then(res => {
        const data = res.data[0];
        setFormValues({
          name: data.name,
          designation: data.designation, 
          department: data.department,
          image: data.image,
          description: data.description,
          sequence: data.sequence,
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleFileChange = event => {
    setImage(event.target.files[0]);
  };

  const openModal = values => {
    setFormData(values);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeNoChangesModal = () => {
    setIsNoChangesModalOpen(false);
  };

  const submitUpdate = async () => {
    try {
      const isUnchanged = Object.keys(formValues).every(
        key => formValues[key] === formData[key]
      );

      if (isUnchanged && !image) {
        setIsNoChangesModalOpen(true);
        closeModal();
        return;
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (image) {
        formDataToSend.append('image', image);
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}ourteam/updateourteam/${id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      closeModal();
      navigate('/teamlist');
    } catch (err) {
      console.log(err);
      closeModal();
    }
  };

  return (
    <>
      <h3 className='text-center mb-5'>Update Team</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => openModal(values)}
      >
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
            <label className='col-4 my-2 text-center'>Current Image:</label>
            <img
              src={`${process.env.REACT_APP_API_URL}${formValues.image}`}
              alt={formValues.name}
              className='img-fluid'
              style={{ height: '200px', width: '200px' }}
            />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>New Image:</label>
            <input
              name='image'
              type='file'
              className='col-6'
              onChange={handleFileChange}
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
              Submit
            </button>
            <Link to='/teamlist' className='btn btn-danger'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>

      <ConfirmationModal
        show={isModalOpen}
        onHide={closeModal}
        modalMessage="Are you sure you want to update this team member?"
        confirmation={submitUpdate}
        wantToAddData={true}
        operationType="Confirm"
      />

      {/* No Changes Modal */}
      <ConfirmationModal
        show={isNoChangesModalOpen}
        onHide={closeNoChangesModal}
        modalMessage="No changes were made. Nothing to update."
        wantToAddData={false}
      />
    </>
  );
};

export default UpdateTeam;

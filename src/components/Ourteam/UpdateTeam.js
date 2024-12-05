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
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formValuesChanged, setFormValuesChanged] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState(null);

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

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const openConfirmationModal = (values) => {
    const isUnchanged = Object.keys(formValues).every(
      (key) => formValues[key] === values[key]
    ) && !image;

    if (isUnchanged) {
      setModalMessage('No changes were made. Nothing to update.');
    } else {
      setModalMessage('You really want to update this team member?');
      setFormValuesChanged(true);
      setUpdatedFormData(values);
    }
    setModalShow(true);
  };

  const closeModal = () => setModalShow(false);

  const submitUpdate = async () => {
    if (!formValuesChanged) {
      navigate('/teamlist'); // Redirect to TeamList if no changes were made
    } else {
      try {
        const formDataToSend = new FormData();
        Object.keys(updatedFormData).forEach((key) => {
          formDataToSend.append(key, updatedFormData[key]);
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
        navigate('/teamlist');
      } catch (err) {
        console.log(err);
      } finally {
        closeModal();
      }
    }
  };

  return (
    <>
      <h3 className='text-center mb-5'>Update Team</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => openConfirmationModal(values)}
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
        show={modalShow}
        onHide={closeModal}
        modalMessage={modalMessage}
        confirmation={submitUpdate}
        wantToAddData={true}  // Always show "Confirm" & "Cancel"
        operationType="OK"
      />
    </>
  );
};

export default UpdateTeam;

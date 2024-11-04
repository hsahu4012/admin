import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const AddTeam = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');

  const formValues = {
    name: '',
    designation: '',
    department: '',
    image: '',
    description: '',
    sequence: '',
  };

  const submitTeam = async values => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to add a new team member?'
      );
      if (confirmed) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('designation', values.designation);
        formData.append('department', values.department);
        formData.append('image', image);  
        formData.append('description', values.description);
        formData.append('sequence', values.sequence);
  
        await axios.post(
          `${process.env.REACT_APP_API_URL}ourTeam/addourTeam`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        navigate('/teamList');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <h3 className='text-center mb-5'>Add Team Member</h3>
      <Formik
        initialValues={formValues}
        onSubmit={values => submitTeam(values)}
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
    </>
  );
};

export default AddTeam;

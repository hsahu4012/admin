import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContact = () => {
  const navigate = useNavigate();
  const formValues = {
    // setting_id: "",
    name: '',
    email: '',
    mobile: '',
    address: '',
    subject: '',
    message: '',
    // resolvestatus: "",
    userid: '',
  };

  const submitTeam = async values => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to Add New contact???'
      );
      if (confirmed) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}contact/addContact`,
          values
        );
        navigate('/ContactList');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h3 className='text-center mb-5'>Contact Create</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => submitTeam(values)}
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
            <label className='col-4 my-2 text-center'>User Id:-</label>
            <Field name='userid' type='text' className='col-6' />
          </div>

          <div className='hey'>
            <button type='submit'>Submit</button>
            <Link to='/ContactList' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AddContact;

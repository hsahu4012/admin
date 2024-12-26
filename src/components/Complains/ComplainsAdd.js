import React,{useState} from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ConfirmationModal } from '../shared/ConfirmationModal';


export const ComplainsAdd = () => {
  const navigate = useNavigate();
  const initialFormValues = {
    orderid: '',
    name: '',
    email: '',
    mobile: '',
    address: '',
    orderid: '',
    subject:'',
    complain_desc: '',
    //resolvestatus: "",
  };

  const [modalShow,setModalShow] = useState(false);
  const [formValue ,setFormValue] = useState([{}]);
  
  const addNewComplain =  values => {
    setFormValue(values);
    setModalShow(true);
  };

const confirmAddComplain = async()=>{
  setModalShow(false)
  try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}complains/addcomplain`,
        formValue
      );
      navigate('/complainslist');
  } catch (error) {
    console.log(error);
  }
}

  return (
    <>
    <div>
      <h2>Complain Add</h2>

      <Formik
        initialValues={initialFormValues}
        onSubmit={values => addNewComplain(values)}
      >
        <div className='row mb-2'>
          <Form className='examAddForm'>
            {/* o */}
            <div className='row mb-2'>
              <label htmlFor='name' className='col-4 my-2'>
                Order id:
              </label>
              <Field name='orderid' type='text' className='col-8' required />
            </div>
            <div className='row mb-2'>
              <label htmlFor='name' className='col-4 my-2'>
                Name:
              </label>
              <Field name='name' type='text' className='col-8' required />
            </div>

            <div className='row mb-2'>
              <label htmlFor='email' className='col-4 my-2'>
                Email
              </label>
              <Field name='email' className='col-8' type='email' required />
            </div>

            <div className='row mb-2'>
              <label htmlFor='mobile' className='col-4 my-2'>
                Mobile
              </label>
              <Field name='mobile' type='text' className='col-8' required />
            </div>

            <div className='row mb-2'>
              <label className='col-4 my-2'>Address:-</label>
              <Field name='address' type='text' className='col-8' required />
            </div>

            <div className='row mb-2'>
              <label htmlFor='subject' className='col-4 my-2'>Subject</label>
              <Field name='subject' type='text' className='col-8' required/>
            </div>

            <div className='row mb-2'>
              <label htmlFor='password' className='col-4 my-2'>
                Description
              </label>
              <Field
                name='complain_desc'
                type='text'
                className='col-8'
                required
              />
            </div>

           

            <div className='text-center my-4'>
                        <button type='submit' className='btn btn-success'>
                          Add Complain
                        </button>
                        <Link to='/complainslist' className='btn btn-primary back'>
                          Back to Complain List
                        </Link>
                      </div>
          </Form>
        </div>
      </Formik>

      
    </div>

    <ConfirmationModal
        show={modalShow}
        modalMessage = "you really want to Add this Complain"
        onHide={() => setModalShow(false)}
        confirmation ={confirmAddComplain}
        operationType = "Add"
        wantToAddData = {true}
      />
    </>
  );
};

export default ComplainsAdd;

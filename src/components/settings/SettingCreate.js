import { Formik, Field, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'jodit/esm/core/helpers';
import { useState } from 'react';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const SettingCreate = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const formValues = {
    // setting_id: "",
    setting_name: '',
    setting_value: '',
  };
  const handleFormSubmit = (values) => {
    setFormData(values);
    setShowModal(true);
    
  }
  // const submitOrder = async values => {
  //   try {
  //     const confirmed = window.confirm(
  //       'Are you sure you want to Add New setting???'
  //     );
  //     if (confirmed) {
  //       await axios.post(
  //         `${process.env.REACT_APP_API_URL}settings/addsetting`,
  //         values
  //       );
  //       navigate('/settingslist');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleConfirmSubmit = async() => {
    try{
      await axios.post(
        `${process.env.REACT_APP_API_URL}settings/addsetting`,
        formData
      );
      setShowModal(false);
      navigate('/settingslist');
    }catch(error){
      console.log(error);
    }
  }
    
  return (
    <>
      <h3 className='text-center mb-5'>Setting Create</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => handleFormSubmit(values)}
      >
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Setting Name:-</label>
            <Field name='setting_name' type='text' className='col-6' />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Setting Value:-</label>
            <Field name='setting_value' type='text' className='col-6' />
          </div>

          <div className='hey'>
            <button type='submit'>Submit</button>
            <Link to='/settingslist' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>

      {/* {showModal && (
        <div className='modal fade show' style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
               <p>Are you sure you want to add this setting?</p>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>Cancel</button>
                <button type='button' className='btn btn-primary' onClick={handleConfirmSubmit}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <ConfirmationModal
      show = {showModal}
      onHide={() => setShowModal(false)}
      modalMessage = "Are you sure you want to add this setting?"
      confirmation = {handleConfirmSubmit}
      wantToAddData = {true}
      operationType = "Yes"
      />
    </>
  );
};

export default SettingCreate;

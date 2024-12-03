import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { set } from 'jodit/esm/core/helpers';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const SettingUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    // setting_id: "",
    setting_name: '',
    setting_value: '',
  });

  const [showNoChangesModal, setShowNoChangesModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateValues, setUpdateValues] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}settings/settingbyid/${id}`)
      .then(res => {
        console.log(res);

        let obj = {
          // setting_id: res.data[0].setting_id,
          setting_name: res.data[0].setting_name,
          setting_value: res.data[0].setting_value,
        };
        setFormValues(obj);
        console.log(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  // const settingUpdate = async values => {
  //   try {
  //     // Check if form values are unchanged
  //     const isUnchanged = Object.keys(formValues).every(
  //       key => formValues[key] === values[key]
  //     );

  //     if (isUnchanged) {
  //      setShowNoChangesModal(true);
  //     }
  //     //after form values update
  //     const confirmed = window.confirm(
  //       'Are you sure you want to Update this setting?'
  //     );
  //     if (confirmed === true) {
  //       await axios.put(
  //         `${process.env.REACT_APP_API_URL}settings/updatesetting/${id}`,
  //         values
  //       );
  //       navigate('/settingslist');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleFormSubmit =  values => {
    const isUnchanged = Object.keys(formValues).every(
      key => formValues[key] === values[key]
    );
    if (isUnchanged) {
      setShowNoChangesModal(true);
    } else {  
      setShowUpdateModal(true);
      setUpdateValues(values);
    }
  };

  const confirmUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}settings/updatesetting/${id}`,
        updateValues
      );
      setShowUpdateModal(false);
      navigate('/settingslist');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('formValues', formValues);
  }, [formValues]);

  return (
    <>
      <h3 className='text-center mb-5'>Setting Update</h3>
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

      {/* {showNoChangesModal && (
        <div className='modal fade show' style={{ display: 'block',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>No changes were made to the form values.</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowNoChangesModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* {showUpdateModal && (
        <div className='modal fade show' style={{ display: 'block',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>Are you sure you want to update this setting?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => confirmUpdate()}
                >
                  Confirm
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <ConfirmationModal
        show={showNoChangesModal}
        onHide={() => setShowNoChangesModal(false)}
        modalMessage="No changes were made to the form values."
        wantToAddData={false}
      />

      <ConfirmationModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        modalMessage="Are you sure you want to update this setting?"
        confirmation={confirmUpdate}
        wantToAddData={true}
        operationType="Confirm"
      />
    </>
  );
};

export default SettingUpdate;

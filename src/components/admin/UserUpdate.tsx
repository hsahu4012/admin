import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const _ = require('lodash');

const UserUpdate: FC = () => {
  const { id } = useParams();
  //console.log('user id - ', id)
  const userDataIntialState = {
    userid: id,
    name: '',
    mobile: '',
    password: '',
  };
  const [updateData, SetUpdateData] = useState(userDataIntialState);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isNoChangesModalOpen, setIsNoChangesModalOpen] = useState(false);
  const [formValues, setFormValues] = useState <any>(null);
  const navigate = useNavigate();

  const callUserUpdateApi = async (data: any) => {
    //console.log('data-----------', data)
    const url = process.env.REACT_APP_API_URL + 'users/updateusers';
    const response = await axios.put(url, data);
    //console.log(response);
  };

  const getUserbyIdApi = async (id: any) => {
    // Needs to be changed
    const url = process.env.REACT_APP_API_URL + 'users/searchuser/' + id;
    const response = await axios.get(url);
    // console.log(response);
    return response.data;
  };

  useEffect(() => {
    (async () => {
      // To be used when api provided
      let data = await getUserbyIdApi(id);
      SetUpdateData(data[0]);
      //console.log(data);
    })();
  }, []);

  const handleFormSubmit = (values: any) => {
    if(_.isEqual(values, updateData)){
      setIsNoChangesModalOpen(true);
      return;
    }
    setFormValues(values);
    setIsConfirmationModalOpen(true);
  };

  const confirmUpdate = async () => {
    if(formValues){
      try{
        await callUserUpdateApi(formValues);
        setIsConfirmationModalOpen(false);       
        toast.success('User updated successfully')
          setTimeout(() => {
          navigate('/userslist');
        }, 2000);
      }catch(error){
        // console.error("Update failed", error);
        toast.error('Error updating user');  
      }
    }
  };

  const closeModals = () => {
    setIsConfirmationModalOpen(false);
    setIsNoChangesModalOpen(false);
  };



  return (
    <div>
      <ToastContainer />
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>
        Update User Details
      </h4>
      <Formik
        enableReinitialize={true}
        initialValues={updateData}
        // onSubmit={async values => {
        //   //console.log('values', values);
        //   if (_.isEqual(values, updateData)) {
        //     alert('No Updates made');
        //   } else {
        //     // eslint-disable-next-line no-restricted-globals
        //     var val = confirm('Sure you want to update data?');
        //     if (val === true) {
        //       await callUserUpdateApi(values);
        //       alert('Updated successfully');
        //       navigate('/userslist');
        //     } else {
        //       alert('Stopped Updating');
        //     }
        //   }
        // }}
        onSubmit={handleFormSubmit}
      >
    
          <Form >
            <div className='row mb-2'>
            <Field hidden type='number' name='userid' className='col-6'></Field>
            </div>

            <div className='row mb-2 align-items-center'>
              <label htmlFor='name' className='col-4 my-2 text-end '>Name :</label>
              <div className='col-6'>
              <Field name='name' type='text' className='form-control' />
            </div>
            </div>

            <div className='row mb-2 align-items-center'>
              <label htmlFor='mobile' className='col-4 my-2 text-end'>Mobile :</label>
              <div className='col-6'>
              <Field name='mobile' type='text' className='form-control' />
            </div>
            </div>

            <div className='row mb-2 align-items-center'>
              <label htmlFor='password' className='col-4 my-2 text-end'>Password :</label>
              <div className='col-6'>
              <Field name='password' type='password' className='form-control' />
            </div>
            </div>

            <div className='row mb-2 align-items-center'>
              <button type='submit' className='btn btn-primary col-auto px-5 mx-auto '>
                Update User
              </button>
            </div>
          </Form>   
      </Formik>
      {isConfirmationModalOpen && (
        <div className='modal fade show' style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>Are you sure you want to update this user details?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModals}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={confirmUpdate}
                >
                  Confirm Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isNoChangesModalOpen && (
        <div className='modal fade show' style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>No changes have been made to the user details</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModals}
                >
                  Close 
                </button>
              </div>
            </div>
          </div>
        </div>
      )}       
    </div>
  );
};

export default UserUpdate;

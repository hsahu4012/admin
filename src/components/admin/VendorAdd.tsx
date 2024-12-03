import React, { FC, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import nss_payment from '../../images/nss_payment.jpeg';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const VendorAdd: FC = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [formValue, setFormValue] = useState([{}]);

  const submitVendor = (values: any) => {
    setFormValue(values);
    setModalShow(true);
  };

  const confirmSubmittedVendor = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}vendor/addVendor`,
        formValue
      );
      navigate('/vendordetails');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="text-center mb-5">Vendor Create</h3>
      <Formik
        initialValues={{ vendor_name: '', vendor_description: '' }}
        onSubmit={(values) => submitVendor(values)}
      >
          <Form>
            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>
                Vendor Name:
              </label>
              <Field
                name='vendor_name'
                type='text'
                className='col-6'
                required
              />
            </div>

            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>
                Vendor Description{' '}
              </label>
              <Field
                name='vendor_description'
                className='col-6'
                type='text'
                required
              />
            </div>

            <br />

              <div className='text-center my-4'>
                <button type='submit' className='btn btn-success'>
                  Submit
                </button>
                &nbsp; &nbsp;
                <Link to="/vendordetails" className="btn btn-danger back">
                  Back
                </Link>
              </div>
          </Form>
      </Formik>

      <ConfirmationModal
        show={modalShow}
        modalMessage="You Want to Add the New Vendor"
        onHide={() => setModalShow(false)}
        confirmation={confirmSubmittedVendor}
        operationType="Add"
        wantToAddData={true}
      />
    </>
      
  );
};

export default VendorAdd;

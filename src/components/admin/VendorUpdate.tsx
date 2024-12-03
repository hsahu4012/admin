import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { FaAudioDescription } from 'react-icons/fa';

const _ = require('lodash');

const VendorUpdate: FC = () => {
  const { vendorid } = useParams();
  const [formValues, setFormValues] = useState({
    vendor_id: vendorid,
    vendor_name: '',
    vendor_description: ''
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formValuesChanged, setFormValuesChanged] = useState(false); 
  const navigate = useNavigate();

  const callVendorUpdateApi = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}vendor/updatevendor/${vendorid}`, formValues);
      setModalShow(false);
      navigate('/vendorDetails');
    } catch (error) {
      console.log(error);
    }
  };

  const getVendorbyIdApi = async (vendorid: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}vendor/vendorbyid/${vendorid}`);
      const data = response.data[0];
      setFormValues({
        vendor_id: data.vendor_id,
        vendor_name: data.vendor_name,
        vendor_description: data.vendor_description,
      });
    } catch (error) {
      console.error('Error fetching vendor details:', error);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     // To be used when api provided
  //     let data = await getVendorbyIdApi(id);
  //     // SetUpdateData(data[0]);
  //     // console.log(data[0]);

  //     for (let i = 0; i < data.length; i++) {
  //       let tempId: number = Number(data[i].vendor_id);
  //       if (tempId == Number(id)) {
  //         // console.log("Vendor name : "+data[i].vendor_name);
  //         SetUpdateData(data[i]);
  //         break;
  //       }
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    if (vendorid) {
      getVendorbyIdApi(vendorid);
    }
  }, [vendorid]);

  const updateVendor = (values: any) => {
    const isUnchanged = _.isEqual(values, formValues); // Check if the form values have changed

    if (isUnchanged) {
      setModalMessage('No changes were made. Nothing to update.');
    } else {
      setModalMessage('You really want to update the vendor?');
      setFormValuesChanged(true); // Set that form values have changed
      setFormValues(values); // Update the state with the new form values
    }

    setModalShow(true); // Show the confirmation modal
  };

  return (
    <div className='text-center mb-5'>
       <h2>Update Vendor Details</h2>
       <br />
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={(values) => updateVendor(values)}
      >
        <Form className='examAddForm'>
            {/* <Field hidden type='number' name='venderid'></Field> */}
            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Vendor ID :</label>
              <Field name='vendor_id' type='text' className='col-6' readOnly/>
            </div>

            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Vendor Name :</label>
              <Field name='vendor_name' type='text' className='col-6'/>
            </div>

            <div className='row mb-2'>
              <label className='col-4 my-2 text-center'>Vendor Description :</label>
              <Field name='vendor_description' type='text' className='col-6'/>
            </div>

            <div className='text-center my-4'>
              <button type='submit' className='btn btn-primary'>
                Update Vendor
              </button>
              &nbsp; &nbsp;
              <Link to='/vendorDetails' className='btn btn-danger'>
                Back
              </Link>
            </div>
          </Form>
      </Formik>

       {/* Confirmation Modal to confirm vendor update */}
       <ConfirmationModal
        show={modalShow}
        modalMessage={modalMessage}
        onHide={() => setModalShow(false)} // Close modal when hidden
        confirmation={callVendorUpdateApi} // Call API to update vendor
        operationType='Update'
        wantToAddData={formValuesChanged} // Indicate if there were changes
      />
    </div>
  );
};

export default VendorUpdate;

import React, { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';

const BrandCreate = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const [modalShow,setModalShow] = useState(false)
  const [formValue ,setFormValue] = useState({});
  const [vendorIds , setVendorIds] = useState([]);

  const initialFormValues = {
    brand_name: '',
    brand_image: '',
    vendor_id: '',
  };

  const handleSubmit =  values => {
    setFormValue(values)
  setModalShow(true);
  };

  const confirmSubmittedBrand = async()=>{
    setLoading(true); // Show loader
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}brand/addbrand`,formValue );
      setModalShow(false)
      navigate('/brandlist'); // Navigate to BrandList page
      toast.success("Brand Added Successfully")
    } catch (error) {
      console.error('Error adding brand:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  }

  useEffect(() => {
    const fetchVendorIds = async()=>{
      try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}vendor/allvendors`)
        const allVendorIds = response.data.map(vendor => vendor.vendor_id);
        setVendorIds(allVendorIds);
     }catch(error){
      console.log(error)
     }
    }

    fetchVendorIds();
    console.log(vendorIds);
  }, [])
  
  return (
    <>
    <div>
      <ToastContainer/>
      <h2 className='text-center mb-5'>Add New Brand</h2>
      <Formik
       enableReinitialize={true}
       initialValues={initialFormValues}
      onSubmit={(values) => handleSubmit(values)}
      >
      <Form>
        <div className='row mb-2'>
          <label className='col-4 my-2 text-center'>Brand Name:</label>
          <Field
          className='col-6'
            type='text'
            name="brand_name"
            required
          />
        </div>
        <div className='row mb-2'>
          <label className='col-4 my-2 text-center'>Brand Image URL:</label>
          <Field
          name="brand_image"
          className='col-6'
            type='file'
          />
        </div>
        <div className='row mb-2'>
          <label className='col-4 my-2 text-center'>Vendor ID:</label>
          <Field as="select" name="vendor_id" className="col-6" required>
              <option value="">Select an User ID</option>
              {vendorIds.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </Field>
        </div>
        <div className='text-center my-4'>
            <button 
            type='submit'
            disabled={loading}
           className='py-1'
            >
            {loading ? 'Adding Brand...' : 'Add Brand'}
            </button>
            &nbsp; &nbsp;
            <Link to='/brandlist' className='btn btn-danger back'>
              Back
            </Link>
          </div>
      </Form>
      </Formik>
    </div>
    
    <ConfirmationModal
        show={modalShow}
        modalMessage = "You Want to Add the New Brand"
        onHide={() => setModalShow(false)}
        confirmation ={confirmSubmittedBrand}
        operationType="Add"
        wantToAddData = {true}
      />
    </>
  );
};

export default BrandCreate;

import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';

const BrandCreate = () => {
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const [modalShow,setModalShow] = useState(false)
  const [formValue ,setFormValue] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    setFormValue({
      brand_name: brandName,
      brand_image: brandImage,
      vendor_id: vendorId,
  })
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

  return (
    <>
    <div>
      <ToastContainer/>
      <h2 className='text-center mb-5'>Add New Brand</h2>
      <form onSubmit={handleSubmit}>
        <div className='row mb-2'>
          <label className='col-4 my-2 text-center'>Brand Name:</label>
          <input
          className='col-6'
            type='text'
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            required
          />
        </div>
        <div className='row mb-2'>
          <label className='col-4 my-2 text-center'>Brand Image URL:</label>
          <input
          className='col-6'
            type='file'
            value={brandImage}
            onChange={e => setBrandImage(e.target.files[0])} // Handle file input
          />
        </div>
        <div className='row mb-2'>
          <label className='col-4 my-2 text-center'>Vendor ID:</label>
          <input
          className='col-6'
            type='text'
            value={vendorId}
            onChange={e => setVendorId(e.target.value)}
            required
          />
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
      </form>
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

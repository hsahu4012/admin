import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BrandCreate = () => {
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}brand/addbrand`, {
        headers: {
          brand_name: brandName,
          brand_image: brandImage,
          vendor_id: vendorId,
        },
      });
      navigate('/brandlist'); // Navigate to BrandList page
    } catch (error) {
      console.error('Error adding brand:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div>
      <h2>Add New Brand</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand Name:</label>
          <input
            type='text'
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Brand Image URL:</label>
          <input
            type='file'
            value={brandImage}
            onChange={e => setBrandImage(e.target.files[0])} // Handle file input
          />
        </div>
        <div>
          <label>Vendor ID:</label>
          <input
            type='text'
            value={vendorId}
            onChange={e => setVendorId(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          style={{
            backgroundColor: loading ? 'grey' : '#0088aa', // Change to your preferred color
            color: 'white',
            border: 'none',
            marginTop: 10,
            marginLeft: 100,
            paddingTop: 10,
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          {loading ? 'Adding Brand...' : 'Add Brand'}
        </button>
      </form>
    </div>
  );
};

export default BrandCreate;

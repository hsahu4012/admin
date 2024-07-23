import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BrandCreate = () => {
    const [brandName, setBrandName] = useState('');
    const [brandImage, setBrandImage] = useState('');
    const [vendorId, setVendorId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}brand/addbrand`, {
                brand_name: brandName,
                brand_image: brandImage,
                vendor_id: vendorId
            });
            navigate('/brandlist'); // Navigate to BrandList page
        } catch (error) {
            console.error('Error adding brand:', error);
        }
    };

    return (
        <div>
            <h2>Add New Brand</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Brand Name:</label>
                    <input
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Brand Image URL:</label>
                    <input
                        type="file"
                        value={brandImage}
                        onChange={(e) => setBrandImage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Vendor ID:</label>
                    <input
                        type="text"
                        value={vendorId}
                        onChange={(e) => setVendorId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Brand</button>
            </form>
        </div>
    );
};

export default BrandCreate;

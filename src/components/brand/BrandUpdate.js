import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BrandUpdate = () => {
    const { id } = useParams(); // Get the brand ID from the URL
    const [brandName, setBrandName] = useState('');
    const navigate = useNavigate();

    // Fetch existing brand data when the component mounts
    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/brand/brandbyid/${id}`);
                if (response.data.length > 0) {
                    const brand = response.data[0]; // Assuming the response is an array with one object
                    setBrandName(brand.brand_name);
                } else {
                    console.error('Brand not found');
                }
            } catch (error) {
                console.error('Error fetching brand data:', error);
            }
        };

        fetchBrandData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:4000/brand/updatebrand/${id}`, {
                brand_name: brandName // Send the brand_name only
            });

            console.log('Update Response:', response.data);

            // Check if any rows were affected
            if (response.data.affectedRows > 0) {
                navigate('/brandlist'); // Navigate to BrandList page
            } else {
                console.error('Update failed. No rows affected. Check if the record exists and the ID is correct.');
            }
        } catch (error) {
            console.error('Error updating brand:', error);
        }
    };

    return (
        <div>
            <h2>Update Brand</h2>
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
                <button type="submit">Update Brand</button>
            </form>
        </div>
    );
};

export default BrandUpdate;

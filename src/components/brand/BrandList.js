import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}brand/allbrands`)
      .then(response => setBrands(response.data))
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  const removeBrand = (id) => {
    axios.put(`${process.env.REACT_APP_API_URL}brand/removebrand/${id}`)
      .then(response => setBrands(brands.filter(brand => brand.brand_id !== id)))
      .catch(error => console.error('Error removing brand:', error));
  };

  return (
    <div>
      <h1>Brand List</h1>
      <Link to='/brandcreate' className='btn btn-primary'>Add new Brand</Link>
      <table className='table table-responsive'>
        <thead>
          <tr>
            <th>Brand ID</th>
            <th>Brand Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map(brand => (
            <tr key={brand.brand_id}>
              <td>{brand.brand_id}</td>
              <td>{brand.brand_name}</td>
              <td>
                <button onClick={() => removeBrand(brand.brand_id)}>Remove</button>
                <Link to={`/brandupdate/${brand.brand_id}`} className='btn btn-warning'>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default BrandList;

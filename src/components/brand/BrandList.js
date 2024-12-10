import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { toast,ToastContainer } from 'react-toastify';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [deletedId,setDeletedId] = useState(null);


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}brand/allbrands`)
      .then(response => setBrands(response.data))
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  const removeBrand = id => {
    setDeletedId(id);
    setModalShow(true);
  };

  const confirmDeleteBrand = async()=>{
    axios
      .put(`${process.env.REACT_APP_API_URL}brand/removebrand/${deletedId}`)
      .then(response =>
        setBrands(brands.filter(brand => brand.brand_id !== deletedId))
      )
      .catch(error => console.error('Error removing brand:', error));
      toast.success("Brand Deleted Successfully");
      setModalShow(false);
  }

  return (
    <>
    <ToastContainer/>
    <div>
      <h1>Brand List</h1>
      <Link to='/brandcreate' className='btn btn-primary'>
        Add new Brand
      </Link>
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
              <Link
                  to={`/brandupdate/${brand.brand_id}`}
                  className='btn btn-warning'
                >
                  Edit
                </Link>
                <button onClick={() => removeBrand(brand.brand_id)}
                className='btn btn-danger mx-2'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <ConfirmationModal
        show={modalShow}
        modalMessage = "you really want to Remove this Brand"
        onHide={() => setModalShow(false)}
        confirmation ={confirmDeleteBrand}
        operationType = "Delete"
        wantToAddData = {true}
      />
    </>
  );
};

export default BrandList;

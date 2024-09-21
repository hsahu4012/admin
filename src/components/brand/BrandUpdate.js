import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';

const BrandUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    brand_name: '',
  });

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}brand/brandbyid/${id}`
        );
        const brand =
          response.data && response.data.length > 0 ? response.data[0] : null;
        if (brand) {
          setFormValues({
            brand_name: brand.brand_name,
          });
        } else {
          setFormValues({ brand_name: '' }); // Set default values if no brand found
        }
      } catch (err) {
        console.error(err);
        setFormValues({ brand_name: '' }); // Set default values in case of error
      }
    };

    fetchBrandDetails();
  }, [id]);

  const updateBrand = async values => {
    try {
      const isUnchanged = Object.keys(formValues).every(
        key => formValues[key] === values[key]
      );

      if (isUnchanged) {
        alert('No changes were made. Nothing to update.');
        return;
      }
      const confirmed = window.confirm(
        'Are you sure you want to update this brand?'
      );
      if (confirmed) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}brand/updatebrand/${id}`,
          values
        );
        navigate('/BrandList');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='text-center mb-5'>
      <h2>Update Brand</h2>
      <br />

      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={values => updateBrand(values)}
      >
        <Form className='brandUpdateForm'>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Brand Name:</label>
            <Field name='brand_name' type='text' className='col-6' required />
          </div>

          <div className='text-center my-4'>
            <button type='submit' className='py-1'>
              Submit
            </button>
            <Link to='/BrandList' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default BrandUpdate;

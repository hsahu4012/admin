import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { ConfirmationModal } from '../shared/ConfirmationModal';
import { toast } from 'react-toastify';

const BrandUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    brand_name: '',
    brand_id:'',
  });

  const [modalShow,setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formValuesChanged ,setFormValuesChanged] = useState(false)

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
            brand_id: brand.brand_id,
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

  const updateBrand =  values => {
    try {
      const isUnchanged = Object.keys(formValues).every(
        key => formValues[key] === values[key]
      );

      if (isUnchanged) {
        setModalMessage('No changes were made. Nothing to update.');
      }
      else{
        setModalMessage('You really want to Update this Brand.');
        setFormValuesChanged(true)
        setFormValues(values);
      }
    } catch (err) {
      console.error(err);
    }finally{
      setModalShow(true);
    }
  };

  const confirmUpdateBrand = async()=>{
    try {
       await axios.put(
          `${process.env.REACT_APP_API_URL}brand/updatebrand/${id}`,
          formValues
        );
        setModalShow(false);
        toast.success("Brand Updated Successfully")
        navigate('/BrandList');
    } catch (error) {
      console.log(error)
    }
  }
  return (
   <>
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
            <Field name='brand_id' type='text' className='col-6' readOnly />
          </div>
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

    <ConfirmationModal
        show={modalShow}
        modalMessage = {modalMessage}
        onHide={() => setModalShow(false)}
        confirmation ={confirmUpdateBrand}
        operationType = "Update"
        wantToAddData = {formValuesChanged}
      />
   </>
  );
};

export default BrandUpdate;

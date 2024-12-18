import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const WishlistUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [FormValues, setFormValues] = useState({
    userid: '',
    productid: '',
    wishlist_date: '',
  });

  const [productIds, setProductIds] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formValuesChanged ,setFormValuesChanged] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}wishlist/usersWishlist/${id}`)
      .then(res => {
        console.log(res);
        let obj = {
          userid: id,
          productid: res.data[0].productid,
          wishlist_date: res.data[0].wishlist_date,
        };
        setFormValues(obj);
        // console.log(FormValues)
        console.log(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  // const handleFieldChange = (e) => {
  //   setFormValues(e.target.value);
  // };

  const UpdateWishlist = values => {
    try {
      // Check if form values are unchanged
      const isUnchanged = Object.keys(FormValues).every(
        key => FormValues[key] === values[key]
      );
      setFormValuesChanged(false)
      if (isUnchanged) {
        setModalMessage("Nothing to update")
        setFormValuesChanged(false)
      }
      else{
        setFormValues(values);
        setModalMessage("You Really Want to Update this Wishlist");
        setFormValuesChanged(true)
      }
      setModalShow(true)
    } catch (err) {
      console.log(err);
    }
  };

const confirmUpdateWishlist = async()=>{
  try {
    // Check if form values are unchanged
      await axios.put(
        `${process.env.REACT_APP_API_URL}wishlist/updateWishlist/${id}`,
        FormValues
      );
      setModalShow(false)
      navigate('/wishlist');
  } catch (err) {
    console.log(err);
  }
}

  useEffect(() => {
    console.log('formValues', FormValues);
  }, [FormValues]);

  useEffect(() => {
    const fetchProductIds = async()=>{
     try{
       const response = await axios.get(`${process.env.REACT_APP_API_URL}products/allProducts`)
         const allProductIds = response.data.map(product => product.productid);
         setProductIds(allProductIds);
   }catch(error){
     console.log(error);
   }
 };
 
    fetchProductIds();
   }, []);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={FormValues}
        onSubmit={values => UpdateWishlist(values)}
      >
        <Form>
          <h2 className='text-center mb-5'>WishList Update</h2>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>UserId:-</label>
            <Field name='userid' type='text' className='col-6' readOnly />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>ProductId:-</label>
            <Field name='productid' as="select" className='col-6' >
            <option value="">{FormValues.productid}</option>
              {productIds.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </Field>
          </div>
          {/* <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Wishlist_Date:-</label>
            <Field name='wishlist_date' type='text' className='col-6' />
          </div> */}
          <div className='hey'>
            <button type='submit'>Submit Now</button>
            <Link to='/wishlist' className='btn btn-danger back'>
              Back
            </Link>
          </div>
        </Form>
      </Formik>

      <ConfirmationModal
        show={modalShow}
        modalMessage = {modalMessage}
        onHide={() => setModalShow(false)}
        confirmation ={confirmUpdateWishlist}
        operationType = "Update"
        wantToAddData = {formValuesChanged}
      />
    </>
  );
};

export default WishlistUpdate;

import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Addressadd = () => {
  const navigate = useNavigate();
  const formValues = {
    userid:"",
    name:"",
    line1:"",
    line2:"",
    line3:"",
    city: "",
    state:"",
    country:"",
    pin:"",
    contact:"",
    alternatecontact: "",
    landmark:"",
    
    
  }

  const submitAddress = async (values) => {
   try{
    const confirmed = window.confirm("Are you sure you want to Add New Address???");
    if(confirmed){
    await axios.post(`${process.env.REACT_APP_API_URL}address/addAddress`, values)
    navigate('/addressdetails')
    }
   }catch(error){
     console.log(error)
   }
  }
  return (
    <>
      <h3 className='text-center mb-5'>Address Create</h3>
      <Formik initialValues={formValues} onSubmit={(values => submitAddress(values))}>
        <Form>
        <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Userid:-</label>
            <Field name="userid" type="text" className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Name:-</label>
            <Field name="name" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Line1:-</label>
            <Field name="line1" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Line2:-</label>
            <Field name="line2" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Line3:-</label>
            <Field name="line3" type="text" className='col-6' required />
          </div>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>City:-</label>
            <Field name="city" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>State:-</label>
            <Field name="state" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Country:-</label>
            <Field name="country" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Pincode:-</label>
            <Field name="pin" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Contact:-</label>
            <Field name="contact" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>AlternateContact:-</label>
            <Field name="alternatecontact" type="text" className='col-6' required />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Landmark:-</label>
            <Field name="landmark" type="text" className='col-6' required />
          </div>
         <br />
          <div className='text-center my-4'>
            <button type='submit' className='py-1 '>Submit</button> 
            &nbsp; &nbsp;
            <Link to='/addressdetails' className='btn btn-danger back'>Back</Link>
          </div>


        </Form>
      </Formik>
    </>
  )
}

export default Addressadd;
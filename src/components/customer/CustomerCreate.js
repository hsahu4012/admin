import React from 'react'
import {Formik,Field,Form} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import './Customer.css'
import axios from 'axios'

const CustomerCreate = () => {
  const navigate = useNavigate();
    const formValues={
        city:"",
        address:"",
        alternatecontact:"",
        pincode:"",
        profile_photo:"",
    }

    const submitCustomer=async (values)=>{
    await axios.post('http://localhost:5000/customer/addCustomer',values)
      navigate('/customerDetails')

    }
  return (
    <>
    <h3 className='text-center mb-5'>Customer Create</h3>
      <Formik initialValues={formValues} onSubmit={(values=>submitCustomer(values))}>
      <Form>
      <div className='row mb-2'>
      <label className='col-4 my-2 text-center'>City:-</label>
      <Field name="city" type="text" className='col-6' required/>
      </div>
      <div className="row mb-2">
      <label className='col-4 my-2 text-center'>Address:-</label>
      <Field name="address" type="text" className='col-6' required/>
      </div>
      <div className="row mb-2">
      <label className='col-4 my-2 text-center'>Contact:-</label>
      <Field name="alternatecontact" type="text" className='col-6' required/>
      </div>
      <div className="row mb-2">
      <label className='col-4 my-2 text-center'>Pincode:-</label>
      <Field name="pincode" type="text" className='col-6' required/>
      </div>
      <div className="row mb-2">
      <label className='col-4 my-2 text-center'>Profile:-</label>
      <Field name="profile_photo" type="file" accept="image/*" className='col-6'/>
      </div>
      <div className='hey'>
      <button type='submit'>Submit</button>
      <Link to='/customerDetails' className='btn btn-danger back'>Back</Link>
      </div>
     
      
      </Form>
      </Formik>
      </>
  )
}

export default CustomerCreate
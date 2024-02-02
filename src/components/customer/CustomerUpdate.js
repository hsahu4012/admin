import React, { useState,useEffect } from 'react'
import {Formik,Field,Form} from 'formik'
import { Link,useNavigate, useParams} from 'react-router-dom'
import './Customer.css'
import axios from 'axios'

const CustomerUpdate = () => {
  
  const {id} = useParams();
  const navigate = useNavigate();
    const [formValues,setFormValues]=useState({
        city:"",
        address:"",
        alternatecontact:"",
        pincode:"",
        profile_photo:"",
    })
   

     
    useEffect(() => {
      axios.get(`http://localhost:5000/customer/customerById/${id}`)
      .then(res => {
          console.log(res)
          let obj={
            city:res.data[0].city,
            address:res.data[0].address,
            alternatecontact:res.data[0].alternatecontact,
            pincode:res.data[0].pincode
          }
          setData(obj)
          setFormValues(obj);
          console.log(res.data[0])
      })
      .catch(err => console.log(err))
  }, [id]);

  const handleFieldChange = (e) => {
   setFormValues(e.target.value);
  };
   
    const updateCustomer=async (values)=>{
    await axios.put(`http://localhost:5000/customer/updateCustomer/${id}`,values)
      navigate('/customerDetails')
    }
  return (
    <>
    <h3 className='text-center mb-5'>Customer Update</h3>
      <Formik initialValues={formValues} onSubmit={(values=>updateCustomer(values))}>
      <Form>
      <div className='row mb-2'>
      <label className='col-4 my-2 text-center'>City:-</label>
      <Field name="city" type="text" className='col-6'  onChange={handleFieldChange}/>
      </div>
      <div className="row mb-2">
      <label className='col-4 my-2 text-center'>Address:-</label>
      <Field name="address" type="text" className='col-6'  onChange={handleFieldChange}/>
      </div>
      <div className="row mb-2">
      <label className='col-4 my-2 text-center'>Contact:-</label>
      <Field name="alternatecontact" type="text" className='col-6'  onChange={handleFieldChange}/>
      </div>
      <div className="row mb-2">
      <label className='col-4 my-2 text-center'>Pincode:-</label>
      <Field name="pincode" type="text" className='col-6'  onChange={handleFieldChange}/>
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

export default CustomerUpdate
import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Customer.css'
import axios from 'axios'

const CustomerUpdate = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    city: "",
    address: "",
    alternatecontact: "",
    pincode: "",
  })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}customer/customerById/${id}`)
      .then(res => {
        console.log(res)
        let obj = {
          city: res.data[0].city,
          address: res.data[0].address,
          alternatecontact: res.data[0].alternatecontact,
          pincode: res.data[0].pincode
        }
        setFormValues(obj);
        console.log(res.data[0])
      })
      .catch(err => console.log(err))
  }, [id]);

  // const handleFieldChange = (e) => {
  //   setFormValues(e.target.value);
  // };

  const updateCustomer = async (values) => {
    await axios.put(`${process.env.REACT_APP_API_URL}customer/updateCustomer/${id}`, values)
    navigate('/customerDetails')
  }

  useEffect(() => {
    console.log('formValues', formValues)
  }, [formValues])

  return (
    <>
      <h3 className='text-center mb-5'>Customer Update</h3>
      <Formik enableReinitialize = {true} initialValues={formValues} onSubmit={(values => updateCustomer(values))}>
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>City:-</label>
            <Field name="city" type="text" className='col-6'  />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Address:-</label>
            <Field name="address" type="text" className='col-6' />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Contact:-</label>
            <Field name="alternatecontact" type="text" className='col-6'  />
          </div>
          <div className="row mb-2">
            <label className='col-4 my-2 text-center'>Pincode:-</label>
            <Field name="pincode" type="text" className='col-6' />
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
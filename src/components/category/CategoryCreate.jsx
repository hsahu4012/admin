import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import './Category.css'
import axios from 'axios'

const CategoryCreate = () => {
  const navigate = useNavigate();
  const formValues = {
    categoryname: "" // Ensure this matches the name used in Field
  }

  const submitCategory = async (values) => {
    await axios.post(`${process.env.REACT_APP_API_URL}category/addCategory`, values)
    console.log(values);
    navigate('/categoryDetails')
  }
  
  return (
    <>
      <h3 className='text-center mb-5'>Category Create</h3>
      <Formik initialValues={formValues} onSubmit={submitCategory}>
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Category Name:-</label>
            <Field name="categoryname" type="text" className='col-6' required />
          </div>
        
          <div className='hey'>
            <button type='submit' className='btn btn-success'>Submit</button>
            <Link to='/categoryDetails' className='btn btn-danger back'>Back</Link>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default CategoryCreate

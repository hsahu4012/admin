import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryUpdate = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    categoryname: ""
  })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}category/getById/${id}`)
      .then(res => {
        console.log(res)
        let obj = {
          categoryname: res.data[0].categoryname,
          
        }
        setFormValues(obj);
        console.log(res.data[0])
      })
      .catch(err => console.log(err))
  }, [id]);

  // const handleFieldChange = (e) => {
  //   setFormValues(e.target.value);
  // };

  const updateCategory = async (values) => {
    await axios.put(`${process.env.REACT_APP_API_URL}category/updateCategory/${id}`, values)
    navigate('/categoryDetails')
  }

  useEffect(() => {
    console.log('formValues', formValues)
  }, [formValues])

  return (
    <>
      <h3 className='text-center mb-5'>Category Update</h3>
      <Formik enableReinitialize = {true} initialValues={formValues} onSubmit={(values => updateCategory(values))}>
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Category Name:-</label>
            <Field name="categoryname" type="text" className='col-6'  />
          </div>
          
          <div>
            <button type='submit' className='btn btn-success'>Submit</button>
            <Link to='/categoryDetails' className='btn btn-danger'>Back</Link>
          </div>


        </Form>
      </Formik>
    </>
  )
}




export default CategoryUpdate;

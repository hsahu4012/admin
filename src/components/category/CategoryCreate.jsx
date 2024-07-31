import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CategoryCreate = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState('');
  const [file, setFile] = useState(null);
  const formValues = {
    categoryname: ""
  }

  const submitCategory = async (values) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}category/addCategory`, values);
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        await axios.post(`${process.env.REACT_APP_API_URL}categoryimage/upload/${data.category_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setUploadStatus('Image uploaded successfully');
      }
      navigate('/categoryDetails');
    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <h3 className='text-center mb-5'>Category Create</h3>
      <Formik initialValues={formValues} onSubmit={(values => submitCategory(values))}>
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Category Name:</label>
            <Field name="categoryname" type="text" className='col-6' required />
          </div>
          <div>
            <br />
            <input type="file" onChange={handleFileChange} />
            {uploadStatus && <p>{uploadStatus}</p>}
            <br />
          </div>
          <div>
            <button type='submit' className='btn btn-success'>Submit</button>
            <Link to='/categoryDetails' className='btn btn-danger back'>Back</Link>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default CategoryCreate

import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    categoryname: ""
  });
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}category/getById/${id}`)
      .then(res => {
        const obj = { categoryname: res.data[0].categoryname };
        setFormValues(obj);
      })
      .catch(err => console.log(err));

    axios.get(`${process.env.REACT_APP_API_URL}categoryimage/${id}`)
      .then(res => {
        setCurrentImage(res.data[0]); // Assuming one image per category
      })
      .catch(err => console.log(err));
  }, [id]);

  const updateCategory = async (values) => {
    console.log("done");
    await axios.put(`${process.env.REACT_APP_API_URL}category/updateCategory/${id}`, values);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      console.log("done");
      await axios.put(`${process.env.REACT_APP_API_URL}categoryimage/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    navigate('/categoryDetails');
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  return (
    <>
      <h3 className='text-center mb-5'>Category Update</h3>
      <Formik enableReinitialize={true} initialValues={formValues} onSubmit={(values => updateCategory(values))}>
        <Form>
          <div className='row mb-2'>
            <label className='col-4 my-2 text-center'>Category Name:</label>
            <Field name="categoryname" type="text" className='col-6' />
          </div>
          <div>
            <label>Current Image:</label>
            {currentImage ? (
              <div>
                <img src={`/uploads/${currentImage.image_path}`} alt="Category" />
              </div>
            ) : (
              <p>No image uploaded</p>
            )}
          </div>
          <div>
            <label>New Image:</label>
            <input type="file" onChange={handleFileChange} />
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

import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    categoryname: ""
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}category/getById/${id}`)
      .then(res => {
        console.log(res)
        let obj = {
          categoryname: res.data[0].categoryname,
        }
        setFormValues(obj);
      })
      .catch(err => console.log(err));

    axios.get(`${process.env.REACT_APP_API_URL}categoryimage/${id}`)
      .then(res => {
        //setCurrentImage(res.data[0]); // Assuming one image per category
      })
      .catch(err => console.log(err));
  }, [id]);

  const updateCategory = async (values) => {
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}category/updateCategory/${id}`, values)
      toast.success('Category updated successfully!');
      navigate('/categoryDetails')
    } catch (error) {
      console.log(error)
      toast.error('Error updating category!');
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (e) => {
    //setFile(e.target.files[0]);
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
            <button type='submit' className='btn btn-success' disabled={loading}>
              {loading ? 'Updating...' : 'Submit'}
            </button>
            <Link to='/categoryDetails' className='btn btn-danger'>Back</Link>
          </div>
        </Form>
      </Formik>
      <ToastContainer />
    </>
  )
}

export default CategoryUpdate;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from "formik";

const Subcategoryedit = () => {

    const temp = useParams();
    console.log(temp.subcategoryid);
    const [subcategory, setSubcategory] = useState({})
    const navigate = useNavigate();
    let { subcategoryid} = useParams();
    const fetchSubcategoryById = async (subcategoryid) => {
        try {
            const url = process.env.REACT_APP_API_URL + 'subCategory/subCategoryById/' + subcategoryid;
            const response = await axios.get(url);
            console.log('fetchSubcategoryById', response.data);
            let obj = {
                subcategoryname: response.data[0].subcategoryname,
                
            } 
            setSubcategory(obj);
        }
        catch (error) {
            console.log(error);  
        }
    }

    const editNewSubcategory = async (values,subcategoryid) => {
        //call api to add new product
        try {
            const url = process.env.REACT_APP_API_URL + 'subcategory/updateSubCategory/' + subcategoryid;
            const response = await axios.put(url, values);
            console.log(response.data);
            //return false
            if(response.status === 200) {
                navigate('/subcategorylist')
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchSubcategoryById(subcategoryid);
    }, [])

    return (
        <div>
            <h2>Subcategory Edit</h2>


                                <Formik
                      enableReinitialize={true}
                      initialValues={subcategory}
                      onSubmit={async (values, { resetForm }) => {
                        try {
                          await editNewSubcategory(values, subcategoryid);
                          resetForm();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
>

                <div className='row'>
                    <Form className='examAddForm'>
                        <div className='row'>
                            <label htmlFor="name" className='col-4 my-2'>Subcategory Name:</label>
                            <Field name="subcategoryname" type="text" className='col-8' required />
                        </div>


                        <div className='row'>
                            <div className='text-center my-4'>
                                <button type="submit" className='btn btn-success'>Edit Subcategory</button>
                            </div>
                        </div>



                        <br></br>
                    </Form>
                </div>
            </Formik>






            <div className='row'>
                <div className='text-center my-4'>
                    <Link to="/subcategorylist" className='btn btn-primary'>Back to Subcategory List</Link>
                </div>
            </div>

        </div>
    )
}

export default Subcategoryedit

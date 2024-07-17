import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from "formik";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Subcategoryadd = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL + 'category/allCategory');
                setCategories(response.data);
            } catch (error) {
                console.error('Error in  fetching categories:');
            }
        };
        
        fetchCategories();
    }, []);

    const initialFormValues = {
       
        subcategoryname: "",
        subcategory_id:"",
        category_id:""
        
    }

    const addNewSubcategory = async (values) => {
    // Call API to add new product
        try {
            const url = process.env.REACT_APP_API_URL + 'subCategory/addSubCategory';
            const response = await axios.post(url, values);
            console.log(response.data);
        
        // Alert indicating successful addition
            window.alert('Subcategory added successfully!');
        
        return false;
        } catch (error) {
        console.log(error);
        }
}

    return (
        <div>
            <h2> Add-Subcategory</h2>
            <br />
            <br />
            <Formik
                initialValues={initialFormValues}
                onSubmit={async (values, { resetForm }) => {
                    //console.log(values);
                    const { error } = await addNewSubcategory(values);
                    if (!error) {
                    resetForm();
                    };
    
                }}
            >
                <div className='row'>
                    <Form className='examAddForm'>
                        <div className='row'>
                            <label htmlFor="name" className='col-4 my-2'>Subcategory Name:</label>
                            <Field name="subcategoryname" type="text" className='col-8' required />
                        </div>
                        <div className='row'>
                            <label htmlFor="name" className='col-4 my-2'>Category_id:</label>
                            <Field name="category_id" as="select" className='col-8' required>
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.categoryname}
                                    </option>
                                ))}
                            </Field>
                        </div>
                       

                        <div className='row'>
                            <div className='text-center my-4'>
                                <button type="submit" className='btn btn-success'>Add Subcategory</button>
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


export default Subcategoryadd;
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from "formik";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductAdd = () => {
   
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const initialFormValues = {
        prod_name: "",
        category: "",
        subcategory: "",
        price: "",
        image: "",
        brand: "",
        discount: "",
        prod_desc: ""
    }
      useEffect(() => {
        const fetchCategories = async () => {
            try {
                const url = process.env.REACT_APP_API_URL + 'category/allCategory';
                const response = await axios.get(url);
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories()
      },[])    
      const handleCategoryChange = async (categoryId) => {
        try {
            const url = process.env.REACT_APP_API_URL + 'subCategory/allSubCategory';
            const response = await axios.get(url);
            setSubcategories(response.data.filter(subcategory => subcategory.category_id === parseInt(categoryId)));
        } catch (error) {
            console.log(error);
        }
    }     

    const addNewProduct = async (values) => {
        //call api to add new product
        try {
            const url = process.env.REACT_APP_API_URL + 'products/addProuduct';
            const response = await axios.post(url, values);
            console.log(response.data);
            return false
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h2>Products Add</h2>

            <Formik
                initialValues={initialFormValues}
                onSubmit={async (values, { resetForm }) => {
                    //console.log(values);
                    const { error } = await addNewProduct(values);
                    if (!error) {
                        resetForm();
                    };
                }}
            >
                                {({ values, setFieldValue }) => (

                <div className='row'>
                    <Form className='examAddForm'>
                        <div className='row'>
                            <label htmlFor="name" className='col-4 my-2'>Product Name:</label>
                            <Field name="prod_name" type="text" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="category" className='col-4 my-2'>Category</label>
                            <Field name="category" as="select" className='col-8' type="text" onChange={(e) => {
                                    setFieldValue('category', e.target.value);
                                    handleCategoryChange(e.target.value);
                                }}
                                required >
                                    <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>{category.categoryname}</option>
                                ))}
                                    </Field>
                        </div>

                        <div className='row'>
                            <label htmlFor="subcategory" className='col-4 my-2'>Subcategory</label>
                            <Field name="subcategory" as="select" type="text" className='col-8' required >
                                 <option value="">Select a subcategory</option>
                                {subcategories.map(subcategory => (
                                    <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.subcategoryname}</option>
                                ))} </Field>
                        </div>

                        <div className='row'>
                            <label htmlFor="password" className='col-4 my-2'>Price</label>
                            <Field name="price" type="number" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="password" className='col-4 my-2'>Image</label>
                            <Field name="image" type="text" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="password" className='col-4 my-2'>Brand</label>
                            <Field name="brand" type="text" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="password" className='col-4 my-2'>Discount</label>
                            <Field name="discount" type="number" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="password" className='col-4 my-2'>Description</label>
                            <Field name="prod_desc" type="text" className='col-8' required />
                        </div>

                        <div className='row'>
                            <div className='text-center my-4'>
                                <button type="submit" className='btn btn-success'>Add Product</button>
                            </div>
                        </div>



                        <br></br>
                    </Form>
                </div>
                                )}
            </Formik>

            <div className='row'>
                <div className='text-center my-4'>
                    <Link to="/productslist" className='btn btn-primary'>Back to Product List</Link>
                </div>
            </div>

        </div>
    )
}

export default ProductAdd

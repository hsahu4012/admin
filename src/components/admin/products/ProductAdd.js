import React from 'react';
import { Formik, Field, Form } from "formik";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductAdd = () => {

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
                <div className='row'>
                    <Form className='examAddForm'>
                        <div className='row'>
                            <label htmlFor="name" className='col-4 my-2'>Product Name:</label>
                            <Field name="prod_name" type="text" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="email" className='col-4 my-2'>Category</label>
                            <Field name="category" className='col-8' type="text" required />
                        </div>

                        <div className='row'>
                            <label htmlFor="mobile" className='col-4 my-2'>Subcategory</label>
                            <Field name="subcategory" type="text" className='col-8' required />
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

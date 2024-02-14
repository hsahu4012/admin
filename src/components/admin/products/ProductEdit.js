import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from "formik";

const ProductEdit = () => {

    const temp = useParams();
    console.log(temp.productid);
    const [product, setProduct] = useState({})
    const navigate = useNavigate();

    const fetchProductById = async (id) => {
        try {
            const url = process.env.REACT_APP_API_URL + 'products/productById/' + id;
            const response = await axios.get(url);
            console.log('fetchProductById', response.data);
            let obj = {
                prod_name: response.data.prod_name,
                category: response.data.category,
                subcategory: response.data.subcategory,
                price: response.data.price,
                image: response.data.image,
                brand: response.data.brand,
                discount: response.data.discount,
                prod_desc: response.data.prod_desc,
            }
            setProduct(obj);
        }
        catch (error) {
            console.log(error);
        }
    }

    const editNewProduct = async (values) => {
        //call api to add new product
        try {
            const url = process.env.REACT_APP_API_URL + 'products/updateProduct/' + temp.productid;
            const response = await axios.put(url, values);
            console.log(response.data);
            //return false
            if(response.status === 200) {
                navigate('/productslist')
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchProductById(temp.productid);
    }, [])

    return (
        <div>
            <h2>Products Edit</h2>


            <Formik
            enableReinitialize = {true}
                initialValues={product}
                onSubmit={async (values, { resetForm }) => {
                    //console.log(values);
                    const { error } = await editNewProduct(values);
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
                                <button type="submit" className='btn btn-success'>Edit Product</button>
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

export default ProductEdit

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from "formik";
import JoditEditor from 'jodit-react';

const ProductEdit = () => {
    const { productid } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        const fetchProductById = async (id) => {
            try {
                const url = process.env.REACT_APP_API_URL + 'products/productById/' + id;
                const response = await axios.get(url);
                setProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchCategories = async () => {
            try {
                const url = process.env.REACT_APP_API_URL + 'category/allCategory';
                const response = await axios.get(url);
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProductById(productid);
        fetchCategories();
    }, [productid]);

    const handleCategoryChange = async (categoryId) => {
        try {
            const url = process.env.REACT_APP_API_URL + 'subCategory/allSubCategory';
            const response = await axios.get(url);
            setSubcategories(response.data.filter(subcategory => subcategory.category_id === categoryId));
        } catch (error) {
            console.log(error);
        }
    }

    const editProduct = async (values) => {
        try {
            const { category, subcategory, ...otherValues } = values;
            const categoryObject = categories.find(cat => cat.category_id === category);
            const subcategoryObject = subcategories.find(subcat => subcat.subcategory_id === subcategory);

            const updatedValues = {
                ...otherValues,
                category: categoryObject ? categoryObject.categoryname : '',
                subcategory: subcategoryObject ? subcategoryObject.subcategoryname : '',
            };

            const url = process.env.REACT_APP_API_URL + 'products/updateProduct/' + productid;
            const response = await axios.put(url, updatedValues);
            if (response.status === 200) {
                // Fetch the updated product data 
                const updatedProductUrl = process.env.REACT_APP_API_URL + 'products/productById/' + productid;
                const updatedProductResponse = await axios.get(updatedProductUrl);
                setProduct(updatedProductResponse.data);

                // Navigate to the product list page
                navigate('/productslist');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Products Edit</h2>

            <Formik
                enableReinitialize={true}
                initialValues={product}
                onSubmit={(values, { resetForm }) => {
                    editProduct(values);
                    resetForm();
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className='examAddForm'>
                        <div className='row'>
                            <label htmlFor="name" className='col-4 my-2'>Product Name:</label>
                            <Field name="prod_name" type="text" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="category" className='col-4 my-2'>Category</label>
                            <Field
                                name="category"
                                as="select"
                                className='col-8'
                                onChange={(e) => {
                                    setFieldValue('category', e.target.value);
                                    handleCategoryChange(e.target.value);
                                }}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>{category.categoryname}</option>
                                ))}
                            </Field>
                        </div>

                        <div className='row'>
                            <label htmlFor="subcategory" className='col-4 my-2'>Subcategory:</label>
                            <Field
                                name="subcategory"
                                as="select"
                                className='col-8'
                                required
                            >
                                <option value="">Select a subcategory</option>
                                {subcategories.map(subcategory => (
                                    <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.subcategoryname}</option>
                                ))}
                            </Field>
                        </div>

                        <div className='row'>
                            <label htmlFor="price" className='col-4 my-2'>Price:</label>
                            <Field name="price" type="number" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="image" className='col-4 my-2'>Image:</label>
                            <Field name="image" type="text" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="brand" className='col-4 my-2'>Brand:</label>
                            <Field name="brand" type="text" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="discount" className='col-4 my-2'>Discount:</label>
                            <Field name="discount" type="number" className='col-8' required />
                        </div>

                        <div className='row'>
                            <label htmlFor="prod_desc" className='col-4 my-2'>Description:</label>
                            <div className='col-8'>
                                <JoditEditor
                                    value={values.prod_desc}
                                    onChange={(content) => setFieldValue('prod_desc', content)}
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='text-center my-4'>
                                <button type="submit" className='btn btn-success'>Edit Product</button>
                            </div>
                        </div>
                    </Form>
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

export default ProductEdit;
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from "formik";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const ProductAdd = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [brands, setBrands] = useState([]);
    const [discountAmount, setDiscountAmount] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const initialFormValues = {
        prod_name: "",
        category: "",
        subcategory: "",
        price: "",
        stock_quantity: "",
        brand: "",
        discount: "",
        prod_desc: ""
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const url = process.env.REACT_APP_API_URL + 'category/allCategory';
                const response = await axios.get(url);
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = async (categoryId) => {
        try {
            const subcategoryUrl = process.env.REACT_APP_API_URL + 'subCategory/allSubCategory';
            const subcategoryResponse = await axios.get(subcategoryUrl);
            setSubcategories(subcategoryResponse.data.filter(subcategory => subcategory.category_id === categoryId));
            
            const brandUrl = process.env.REACT_APP_API_URL + `brand/brandbycategoryid/${categoryId}`;
            const brandResponse = await axios.get(brandUrl);
            setBrands(brandResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addNewProduct = async (values) => {
        const formData = new FormData();
        const productid = parseInt(Math.random() * 10000000000);
        // const datestamp = Date.now();

        formData.append('prod_name', values.prod_name);
        formData.append('category', values.category);
        formData.append('subcategory', values.subcategory);
        formData.append('price', values.price);
        formData.append('stock_quantity', values.stock_quantity);
        formData.append('brand', values.brand);
        formData.append('discount', values.discount);
        formData.append('prod_desc', values.prod_desc);
        formData.append('image', imageFile);
        formData.append('productid', productid);
        // formData.append('datestamp', datestamp);

        try {
            const url = process.env.REACT_APP_API_URL + 'products/addProuduct';
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate('/productslist'); // Redirect on successful response
        } catch (error) {
            console.error(error);
            setError('Failed to add product. Please try again.'); // Show error message on failure
        } finally {
            setLoading(false); // Stop the loader
        }
    };

    const handleDiscountPercentageChange = (percentage, setFieldValue, values) => {
        setDiscountPercentage(percentage);
        const calculatedDiscount = (values.price * percentage) / 100;
        setDiscountAmount(calculatedDiscount.toFixed(2));
        setFieldValue('discount', calculatedDiscount.toFixed(2));
    }

    const handleDiscountAmountChange = (amount, setFieldValue, values) => {
        setDiscountAmount(amount);
        setFieldValue('discount', amount);
        const calculatedPercentage = (amount / values.price) * 100;
        setDiscountPercentage(calculatedPercentage.toFixed(2));
    }

    return (
        <div>
            <h2>Products Add</h2>
            <Formik
                initialValues={initialFormValues}
                onSubmit={async (values, { resetForm }) => {
                    setLoading(true); // Start the loader
                    setError(""); // Reset error message
                    await addNewProduct(values);
                    resetForm();
                    setDiscountAmount("");
                    setDiscountPercentage("");   
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
                                }} required>
                                    <option value="">Select a category</option>
                                    {categories.map(category => (
                                        <option key={category.category_id} value={category.category_id}>{category.categoryname}</option>
                                    ))}
                                </Field>
                            </div>

                            <div className='row'>
                                <label htmlFor="subcategory" className='col-4 my-2'>Subcategory</label>
                                <Field name="subcategory" as="select" type="text" className='col-8' required>
                                    <option value="">Select a subcategory</option>
                                    {subcategories.map(subcategory => (
                                        <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.subcategoryname}</option>
                                    ))}
                                </Field>
                            </div>

                            <div className='row'>
                                <label htmlFor="price" className='col-4 my-2'>Price</label>
                                <Field name="price" type="number" className='col-8' onChange={(e) => {
                                    setFieldValue('price', e.target.value);
                                    handleDiscountPercentageChange(discountPercentage, setFieldValue, { price: e.target.value });
                                }} required />
                            </div>

                            <div className='row'>
                                <label htmlFor="stock_quantity" className='col-4 my-2'>Quantity</label>
                                <Field name="stock_quantity" type="number" className='col-8' required />
                            </div>

                            <div className='row'>
                                <label htmlFor="image" className='col-4 my-2'>Image</label>
                                <input name="image" type="file" className='col-8' onChange={(e) => {
                                    setImageFile(e.target.files[0]);
                                    setFieldValue('image', e.target.files[0]);
                                }} />
                            </div>

                            <div className='row'>
                                <label htmlFor="brand" className='col-4 my-2'>Brand</label>
                                <Field name="brand" as="select" className='col-8' required >
                                    <option value="">Select a brand</option>
                                    {brands.map(brand => (
                                        <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                                    ))}
                                </Field>
                            </div>

                            <div className='row'>
                                <label htmlFor="password" className='col-4 my-2'>Discount</label>
                                <div className='col-8'>
                                    <div className="row">
                                        <div className="col">
                                            <Field name="discount" type="number" placeholder="Amount" className='col-8' value={discountAmount} onChange={(e) => {
                                                handleDiscountAmountChange(e.target.value, setFieldValue, values);
                                            }} />
                                        </div>
                                        <div className="col">
                                            <Field name="discount_percentage" type="number" placeholder="Percentage" className='col-8' value={discountPercentage} onChange={(e) => {
                                                handleDiscountPercentageChange(e.target.value, setFieldValue, values);
                                            }} />
                                        </div>
                                    </div>
                                </div>
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
                                    <button type="submit" className='btn btn-success' disabled={loading}>
                                        {loading ? 'Adding...' : 'Add Product'}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className='row'>
                                    <div className='col-12 my-2'>
                                        <p style={{ color: 'red' }}>{error}</p>
                                    </div>
                                </div>
                            )}
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
    );
};

export default ProductAdd;

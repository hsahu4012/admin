import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryname, setCategoryname] = useState(null);

    const fetchCategories = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + 'category/allCategory';
            const response = await axios.get(url);
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProductsList = async (categoryname) => {
        try {
            if (categoryname) {
                const url = process.env.REACT_APP_API_URL + `products/CategoryByName?categoryname=${encodeURIComponent(categoryname)}`;
                const response = await axios.get(url);
                setProducts(response.data);
            } else {
                
                setProducts(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoryClick = (categoryname) => {
        setCategoryname(categoryname);
        fetchProductsList(categoryname); 
    };

    const deleteProduct = async (productid) => {
        try {
            const url = process.env.REACT_APP_API_URL + 'products/removeProduct/' + productid;
            await axios.put(url);
            fetchProductsList(categoryname); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProductsList(categoryname); 
    }, [categoryname]);

    return (
        <div>
            <h2>Products List</h2>
            <Link to='/productadd' className='btn btn-primary'>Create New Products</Link>
            <div>
                <Link to='/bulkqsadd' className='btn btn-primary'>Bulk Products upload</Link>
            </div>
            <div>
                <h3>Categories</h3>
                {categories.map(category => (
                    <button 
                        key={category.categoryname} 
                        onClick={() => handleCategoryClick(category.categoryname)} 
                        className='btn btn-primary m-1'
                    >
                        {category.categoryname}
                    </button>
                ))}
            </div>
            <table className='table table-responsive'>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>SubCategory</th>
                        <th>Price</th>
                        <th>Stock Quantity</th>
                        <th>Brand</th>
                        <th>Discount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((temp, index) => (
                        <tr key={temp.productid}>
                            <td>{index + 1}</td>
                            <td>{temp.productid}</td>
                            <td>{temp.prod_name}</td>
                            <td>{temp.categoryname}</td>
                            <td>{temp.subcategory}</td>
                            <td>{temp.price}</td>
                            <td>{temp.stock_quantity}</td>
                            <td>{temp.brand}</td>
                            <td>{temp.discount}</td>
                            <td>
                                <Link to={`/productview/${temp.productid}`} className='btn btn-success'>View</Link>
                                <Link to={`/productedit/${temp.productid}`} className='btn btn-warning'>Edit</Link>
                                <button onClick={() => deleteProduct(temp.productid)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsList;

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductView = () => {
    const temp = useParams();
    console.log(temp.productid);
    const [product, setProduct] = useState({})

    const fetchProductById = async(id) => {
        try {
            const url = process.env.REACT_APP_API_URL + 'products/productById/' + id;
            const response = await axios.get(url);
            console.log(response.data);
            setProduct(response.data);
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
            <h2>Products View</h2>

            <div>Product Name - {product.prod_name}</div>
            <div>Category - {product.category}</div>
            <div>Subcategory - {product.subcategory}</div>
            <div>Price - {product.price}</div>
            <div>Brand - {product.brand}</div>
            <div>Stock Quantity - {product.stock_quantity}</div>
            <div>Discount - {product.discount}</div>
            <div>Description - {product.prod_desc}</div>
            <div>Image - <img src={`${process.env.REACT_APP_API_URL}${product.image}`} alt="Product" style={{ height: '50px' }} /></div>

            <div className='row'>
                            <div className='text-center my-4'>
                                <Link to="/productslist" className='btn btn-primary'>Back to Product List</Link>
                            </div>
                        </div>

        </div>
    )
}

export default ProductView

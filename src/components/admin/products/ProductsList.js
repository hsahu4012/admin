import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    const fetchProductsList = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + 'products/allProducts';
            const response = await axios.get(url);
            const sortedProducts = response.data.sort((a, b) => b.srno - a.srno);
            setProducts(sortedProducts);
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteProduct = async(productid) => {
        //api call for delete
        try {
            const url = process.env.REACT_APP_API_URL + 'products/removeProduct/' + productid;
            const response = await axios.put(url);
            //console.log(response);
            //setUserList(response.data);
            fetchProductsList();
          }
          catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        fetchProductsList();
    }, [])

    return (
        <div>
            <h2>Products List</h2>
            <Link to='/productadd' className='btn btn-primary'>Create New Products</Link>
            <div>
            <Link to='/bulkqsadd' className='btn btn-primary'>Bulk Products upload</Link>
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
                        {/* <th>Image</th> */}
                        <th>Brand</th>
                        <th>Discount</th>
                        {/* <th>Description</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products && products.map((temp, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{temp.productid}</td>
                                <td>{temp.prod_name}</td>
                                <td>{temp.category}</td>
                                <td>{temp.subcategory}</td>
                                <td>{temp.price}</td>
                                <td>{temp.stock_quantity}</td>
                                {/* <td><img src={process.env.REACT_APP_API_URL + temp.image} style={{height: '50px'}}/></td> */}
                                {/* <td>{temp.image}</td> */}
                                <td>{temp.brand}</td>
                                <td>{temp.discount}</td>
                                {/* <td>{temp.prod_desc}</td> */}
                                <td>
                                <Link to={`/productview/${temp.productid}`} className='btn btn-success'>View</Link>
                                <Link to={`/productedit/${temp.productid}`} className='btn btn-warning'>Edit</Link>
                                <button onClick={() => deleteProduct(temp.productid)} className='btn btn-danger'>Delete</button>
                                    </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductsList

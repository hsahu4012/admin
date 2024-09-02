import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryname, setCategoryname] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

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
            toast.success('Product deleted successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            fetchProductsList(categoryname);
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error('Failed to delete the product. Please try again later.');
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProductsList(categoryname);
    }, [categoryname]);

    return (
        <div>
            <h2>Products List</h2>
            <Link to='/productadd' className='btn btn-primary'>Create New Product</Link>
            <div>
                <Link to='/bulkqsadd' className='btn btn-primary'>Bulk Products Upload</Link>
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
                                <button 
                                    onClick={() => {
                                        setIsDeleteModalOpen(true);
                                        setProductToDelete(temp.productid);
                                    }} 
                                    className='btn btn-danger'>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                message='Do you want to delete the product?'
                onConfirm={() => {
                    if (productToDelete) {
                        deleteProduct(productToDelete);
                        setIsDeleteModalOpen(false);
                    }
                }}
            />
        </div>
    );
};

const DeleteModal = ({ isOpen, onClose, message, onConfirm }) => {
    return (
        <>
            {isOpen && (
                <div
                    className='modal'
                    tabIndex='-1'
                    role='dialog'
                    aria-labelledby='delete-modal-title'
                    aria-describedby='delete-modal-description'
                    style={{ display: "block" }}
                >
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title' id='delete-modal-title'>
                                    <b>Confirmation</b>
                                </h5>
                            </div>
                            <div className='modal-body' id='delete-modal-description'>
                                <p>{message}</p>
                            </div>
                            <div className='modal-footer'>
                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={onConfirm}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isOpen && <div className='modal-backdrop fade show'></div>}
        </>
    );
};

export default ProductsList;

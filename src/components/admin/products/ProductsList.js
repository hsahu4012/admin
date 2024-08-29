import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const fetchProductsList = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + 'products/allProducts';
            const response = await axios.get(url);
            if (Array.isArray(response.data)) {
                const sortedProducts = response.data.sort((a, b) => b.srno - a.srno);
                setProducts(sortedProducts);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    const handleEditClick = (productid, field, value) => {
        setEditingProductId(productid);
        setEditedValues({ ...editedValues, [field]: value });
    };

    const handleValueChange = (field, value) => {
        setEditedValues({ ...editedValues, [field]: value });
    };

    const handleSaveClick = async (productid) => {
        try {
            const url = process.env.REACT_APP_API_URL + `products/updateProduct/${productid}`;
            await axios.put(url, editedValues);
            toast.success('Product updated successfully!');
            setEditingProductId(null);
            fetchProductsList();
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error('Failed to update the product.');
        }
    };

    const deleteProduct = async (productid) => {
        try {
            const url = `${process.env.REACT_APP_API_URL}products/removeProduct/${productid}`;
            const response = await axios.put(url);
            if (response.status === 200) {
                toast.success('Product deleted successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                fetchProductsList(); // Refresh the product list after deletion
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error('Failed to delete the product. Please try again later.');
        }
    };

    useEffect(() => {
        fetchProductsList();
    }, []);

    return (
        <div>
            <h2>Products List</h2>
            <Link to='/productadd' className='btn btn-primary'>Create New Product</Link>
            <div>
                <Link to='/bulkqsadd' className='btn btn-primary'>Bulk Products Upload</Link>
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
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{temp.productid}</td>
                            <td>{temp.prod_name}</td>
                            <td>{temp.categoryname}</td>
                            <td>{temp.subcategoryname}</td>
                            <td>
                                {editingProductId === temp.productid ? (
                                    <input 
                                        type="text" 
                                        value={editedValues.price || temp.price} 
                                        onChange={(e) => handleValueChange('price', e.target.value)} 
                                        style={{ width: '60px' }} 
                                    />
                                ) : (
                                    temp.price
                                )}
                                <button 
                                    onClick={() => handleEditClick(temp.productid, 'price', temp.price)} 
                                    className='btn btn-warning'
                                    style={{ marginLeft: '10px' }}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                {editingProductId === temp.productid ? (
                                    <input 
                                        type="text" 
                                        value={editedValues.stock_quantity || temp.stock_quantity} 
                                        onChange={(e) => handleValueChange('stock_quantity', e.target.value)} 
                                        style={{ width: '60px' }} 
                                    />
                                ) : (
                                    temp.stock_quantity
                                )}
                                <button 
                                    onClick={() => handleEditClick(temp.productid, 'stock_quantity', temp.stock_quantity)} 
                                    className='btn btn-warning'
                                    style={{ marginLeft: '10px' }}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>{temp.brand_name}</td>
                            <td>
                                {editingProductId === temp.productid ? (
                                    <input 
                                        type="text" 
                                        value={editedValues.discount || temp.discount} 
                                        onChange={(e) => handleValueChange('discount', e.target.value)} 
                                        style={{ width: '60px' }} 
                                    />
                                ) : (
                                    temp.discount
                                )}
                                <button 
                                    onClick={() => handleEditClick(temp.productid, 'discount', temp.discount)} 
                                    className='btn btn-warning'
                                    style={{ marginLeft: '10px' }}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                {editingProductId === temp.productid && (
                                    <button 
                                        onClick={() => handleSaveClick(temp.productid)} 
                                        className='btn btn-success'
                                        style={{ marginRight: '10px' }}
                                    >
                                        Save
                                    </button>
                                )}
                                <Link to={`/productview/${temp.productid}`} className='btn btn-success'>
                                    View
                                </Link>
                                <Link to={`/productedit/${temp.productid}`} className='btn btn-warning'>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsDeleteModalOpen(true);
                                        setProductToDelete(temp.productid);
                                    }}
                                    className='btn btn-danger'
                                >
                                    Delete
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryid, setCategoryid] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [btnAll, setBtnAll] = useState(false);

  const fetchCategories = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'category/allCategory';
      const response = await axios.get(url);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsList = async categoryname => {
    try {
      if (categoryname) {
        const url =
          process.env.REACT_APP_API_URL +
          `products/allProductsByCategory?categoryid=${encodeURIComponent(categoryname)}`;
        const response = await axios.get(url);
        setProducts(response.data);
      } else {
        setProducts(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = categoryid => {
    setCategoryid(categoryid);
    window.localStorage.setItem('admin_categoryid', categoryid);
    if(categoryid==="all"){
      handleAllCategoriesClick()
    }else{
      fetchProductsList(categoryid);
    }
    setBtnAll(false);
  };

  const handleAllCategoriesClick = async() => {
    setBtnAll(!btnAll);
    try {

            const url = process.env.REACT_APP_API_URL + `products/allProducts`;
            const response = await axios.get(url);
            setProducts(response.data);

    } catch (error) {
        console.log(error);
    }   
};

  const deleteProduct = async productid => {
    try {
      const url =
        process.env.REACT_APP_API_URL + 'products/removeProduct/' + productid;
      const response = await axios.put(url);
      toast.success('Product deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      fetchProductsList(categoryid);
      // console.log(response.data);
      if (Array.isArray(response.data)) {
        const sortedProducts = response.data.sort((a, b) => b.srno - a.srno);
        setProducts(sortedProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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

  const handleSaveClick = async productid => {
    try {
      const url =
        process.env.REACT_APP_API_URL + `products/updateProduct/${productid}`;
      await axios.put(url, editedValues);
      toast.success('Product updated successfully!');
      setEditingProductId(null);
      if (categoryid==="all") {
        handleAllCategoriesClick()
      } else {
        fetchProductsList(categoryid);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update the product.');
    }
  };

  useEffect(() => {
    fetchCategories();
    let admin_categoryid = localStorage.getItem('admin_categoryid');
    setCategoryid(admin_categoryid);
    if (admin_categoryid==="all") {
      handleAllCategoriesClick()
    } else {
      fetchProductsList(admin_categoryid);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <h2>Products List</h2>
      <Link to='/productadd' className='btn btn-primary'>
        Create New Product
      </Link>
      &nbsp;
      <Link to='/bulkqsadd' className='btn btn-primary'>
        Bulk Products Upload
      </Link>
      <div>
        <h3>Categories</h3>
        {categories.map(category => (
          <button
            key={category.categoryname}
            onClick={() => handleCategoryClick(category.category_id)}
            className={`btn m-1 ${categoryid === category.category_id && btnAll === false ? 'btn-info' : 'btn-primary'}`}
          >
            {category.categoryname}
          </button>
        ))}
        <button onClick={() => handleCategoryClick("all")} 
        // className={`btn m-1 ${ btnAll ? 'btn-info' : 'btn-primary'}`}
        className={`btn m-1 ${categoryid === "all" ? 'btn-info' : 'btn-primary'}`}
        > All</button>
      </div>

      <div>Total No of Products - {products && products.length}</div>
      <table className='table table-responsive table-striped table-bordered'>
        <thead className=''>
          <tr>
            <th>Sr No</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((temp, index) => (
              <tr key={temp.productid}>
                <td>{index + 1}</td>
                <td>{temp.productid}</td>
                <td>{temp.prod_name}</td>
                <td>{temp.categoryname}</td>
                <td>{temp.subcategory}</td>
                <td>{temp.brand}</td>
                <td>
                  {editingProductId === temp.productid ? (
                    <input
                      type='number'
                      value={editedValues.price || temp.price}
                      onChange={e => handleValueChange('price', e.target.value)}
                      style={{ width: '60px' }}
                    />
                  ) : (
                    temp.price
                  )}
                  <button
                    onClick={() =>
                      handleEditClick(temp.productid, 'price', temp.price)
                    }
                    className='btn btn-warning btn-sm ml-2'
                  >
                    Edit
                  </button>
                </td>
                <td>
                  {editingProductId === temp.productid ? (
                    <input
                      type='number'
                      value={editedValues.stock_quantity || temp.stock_quantity}
                      onChange={e =>
                        handleValueChange('stock_quantity', e.target.value)
                      }
                      style={{ width: '60px' }}
                    />
                  ) : (
                    temp.stock_quantity
                  )}
                  <button
                    onClick={() =>
                      handleEditClick(
                        temp.productid,
                        'stock_quantity',
                        temp.stock_quantity
                      )
                    }
                    className='btn btn-warning btn-sm ml-2'
                  >
                    Edit
                  </button>
                </td>
                <td>
                  {editingProductId === temp.productid ? (
                    <input
                      type='number'
                      value={editedValues.discount || temp.discount}
                      onChange={e =>
                        handleValueChange('discount', e.target.value)
                      }
                      style={{ width: '60px' }}
                    />
                  ) : (
                    temp.discount
                  )}
                  <button
                    onClick={() =>
                      handleEditClick(temp.productid, 'discount', temp.discount)
                    }
                    className='btn btn-warning btn-sm ml-2'
                  >
                    Edit
                  </button>
                </td>
                <td className=''>
                  {editingProductId === temp.productid && (
                    <button
                      onClick={() => handleSaveClick(temp.productid)}
                      className='btn btn-success m-1 '
                      style={{ marginRight: '10px' }}
                    >
                      Save
                    </button>
                  )}
                  <span className='d-inline-block w-60'>
                    {' '}
                    <Link
                      to={`/productview/${temp.productid}`}
                      className='btn btn-primary m-1'
                    >
                      View
                    </Link>
                  </span>
                  <span className='d-inline-block w-60'>
                    <Link
                      to={`/productedit/${temp.productid}`}
                      className='btn btn-warning m-1'
                    >
                      Edit
                    </Link>
                  </span>
                  <span className='d-inline-block w-60 '>
                    <Link
                      to={`/productcopy/${temp.productid}`}
                      className='btn btn-info m-1 w-100'
                    >
                      Copy
                    </Link>
                  </span>

                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setProductToDelete(temp.productid);
                    }}
                    className='btn btn-danger m-1'
                  >
                    Delete
                  </button>
                </td>

                {/* <td>
                                <Link to={`/productview/${temp.productid}`} className='btn btn-success'>View</Link>
                                <Link to={`/productedit/${temp.productid}`} className='btn btn-warning'>Edit</Link>
                                <button
                                    onClick={() => {
                                        setIsDeleteModalOpen(true);
                                        setProductToDelete(temp.productid);
                                    }}
                                    className='btn btn-danger'>Delete
                                </button>
                            </td> */}
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
          style={{ display: 'block' }}
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

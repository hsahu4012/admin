import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../../loader/Loader';
import { ConfirmationModal } from '../../shared/ConfirmationModal';
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryid, setCategoryid] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnAll, setBtnAll] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showSelection, setShowSelection] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [modalShow,setModalShow] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_API_URL + 'category/allCategory';
      const response = await axios.get(url);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };


  const fetchProductsList = async categoryname => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleCategoryClick = categoryid => {
    setCategoryid(categoryid);
    window.localStorage.setItem('admin_categoryid', categoryid);
    if (categoryid === "all") {
      handleAllCategoriesClick()
    } else {
      fetchProductsList(categoryid);
    }
    setBtnAll(false);
    setSelectedProducts([]);
    setSelectAll(false);
  };

  const handleSelectProduct = (productid) => {
    setSelectedProducts((prevSelected) => {
      const updatedSelected = prevSelected.includes(productid)
        ? prevSelected.filter((id) => id !== productid)
        : [...prevSelected, productid];
      return updatedSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      const selectedProductIds = products.map((product) => product.productid);
      setSelectedProducts(selectedProductIds);
    }
    setSelectAll(!selectAll);
  };

  const handleShowSelection = () => {
    setShowSelection(true);
  };

  const handleBulkOutOfStock = async () => {
    if (selectedProducts.length > 0) {
      try {
        const url = process.env.REACT_APP_API_URL + `products/setstocktozero`;
        await axios.put(url, { productIds: selectedProducts });
        toast.success('Selected products set to out of stock!');
        setSelectedProducts([]); // Clear the selected products after the update
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast.error('Failed to set selected products to out of stock.');
        console.error(error);
      }
    } else {
      toast.error('Please select products to set to out of stock.');
    }
  };
  
  const handleAllOutOfStock = async () => {
    if (selectAll) {
      try {
        const url =  process.env.REACT_APP_API_URL + `products/setstocktozero`;
        const allProductIds = products.map(product => product.productid); // Get all product IDs in the selected category
        await axios.put(url, { productIds: allProductIds });
        toast.success('All products in this category set to out of stock!');
        setSelectedProducts([]); // Clear the selected products after the update
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast.error('Failed to set all products to out of stock.');
        console.error(error);
      }
    } else {
      toast.error('Please select the "Select All" checkbox first.');
    }
  };
  
  
  const switchVisibility = async (productid, isVisible) => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_API_URL + `products/updateProduct/${productid}`;
      const updatedData = isVisible ? { stock_quantity: 100, isactive: 1 } : { isactive: -1 };
  
      await axios.put(url, updatedData);
  
      toast.success(isVisible ? 'Product is now visible!' : 'Product is now hidden!');  //Notification Message
  
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.productid === productid
            ? { ...product, stock_quantity: updatedData.stock_quantity, isactive: updatedData.isactive }
            : product
        )
      );
    } catch (error) {
      console.error('Error toggling product visibility:', error);
      toast.error('Failed to update product visibility.');
    }
    setLoading(false);
  };
  

  const handleAllCategoriesClick = async () => {
    setLoading(true);
    setBtnAll(!btnAll);
    try {

      const url = process.env.REACT_APP_API_URL + `products/allProducts`;
      const response = await axios.get(url);
      setProducts(response.data);

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteProduct = async productid => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleEditClick = (productid, field, value) => {
    setEditingProductId(productid);
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleStockClick = async (id, stock) => {
    try {
      (stock > 0 && stock < 100) ? await axios.put(process.env.REACT_APP_API_URL + `products/updateStockQuantity/${id}/0`)
        : await axios.put(process.env.REACT_APP_API_URL + `products/updateStockQuantity/${id}/100`);
      toast.success('Product Stock updated successfully!');
    } catch (error) {
      toast.error('Failed to update the Stock Quantity.');
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleValueChange = (field, value) => {
    setEditedValues({ ...editedValues, [field]: value });
  };

  const handleSaveClick = async productid => {
    setLoading(true);
    try {
      const url =
        process.env.REACT_APP_API_URL + `products/updateProduct/${productid}`;
      await axios.put(url, editedValues);
      toast.success('Product updated successfully!');
      setEditingProductId(null);
      if (categoryid === "all") {
        handleAllCategoriesClick()
      } else {
        fetchProductsList(categoryid);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update the product.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    let admin_categoryid = localStorage.getItem('admin_categoryid');
    setCategoryid(admin_categoryid);
    if (admin_categoryid === "all") {
      handleAllCategoriesClick()
    } else {
      fetchProductsList(admin_categoryid);
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <h2>Products List</h2>
      {loading && <Loader />}
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

      <div>
        Total No of Products - {products && products.length} <br/>
        Selected Products - {selectedProducts.length} <br/>
        <button
          className='btn btn-success m-1'
          onClick={handleShowSelection}
        >
          Select Custom Products
        </button> &nbsp;  &nbsp;
        <label>
          <input
            type='checkbox'
            checked={selectAll}
            onChange={handleSelectAll}
          />
          Select All
        </label>
      </div>

      <button onClick={handleBulkOutOfStock} disabled={!selectedProducts.length || selectAll} className="btn btn-danger m-1">
        Bulk Out of Stock
      </button>

      <button onClick={handleAllOutOfStock} disabled={!selectAll} className="btn btn-warning m-1">
        All Out of Stock
      </button>
      
      <table className='table table-responsive table-striped table-bordered'>
        <thead className=''>
          <tr>
            {(selectAll || showSelection) && <th>Select</th>}
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
                {(selectAll || showSelection) && (
                  <td>
                    <input
                      type='checkbox'
                      checked={selectedProducts.includes(temp.productid)}
                      onChange={() => handleSelectProduct(temp.productid)}
                    />
                  </td>
                )}
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
 
                  {/* Hide and Show Button */}
                  <button
                     onClick={() => switchVisibility(temp.productid, temp.isactive === -1)}
                     className='btn m-1'
                     style={{ backgroundColor: temp.isactive === -1 ? 'lightgreen' : 'lightcoral', color: 'black' }}
                  >
                     {temp.isactive === -1 ? 'Show' : 'Hide'}
                  </button>

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
                      setModalShow(true);
                      setProductToDelete(temp.productid);
                    }}
                    className='btn btn-danger m-1'
                  >
                    Delete
                  </button>
                  <button onClick={() => {
                    handleStockClick(temp.productid, temp.stock_quantity);
                  }} className='btn btn-warning m-1'
                  >
                    {temp.stock_quantity === 0 ? "Stock" : "Out of Stock"}
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
      <ConfirmationModal
        show={modalShow}
        modalMessage = "you really want to delete this Product"
        onHide={() => setModalShow(false)}
        confirmation ={() => {
          if (productToDelete) {
            deleteProduct(productToDelete);
            setModalShow(false);
          }
        }}
        operationType = "Delete"
        wantToAddData = {true}
      />
    </div>
  );
};



export default ProductsList;

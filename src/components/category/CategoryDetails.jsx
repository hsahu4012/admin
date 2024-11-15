import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const CategoryDetails = () => {
  const [data, setData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const [updateCategoryName, setUpdateCategoryName] = useState('');

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}category/allCategory`
      );
      const categories = res.data;
      // const images = await Promise.all(categories.map(async category => {
      //   const imgRes = await axios.get(`${process.env.REACT_APP_API_URL}categoryimage/${category.category_id}`);
      //   return { ...category, image: imgRes.data[0] };
      // }));
      setData(categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDelete = async id => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}category/romoveCategory/${id}`
      );
      await axios.delete(
        `${process.env.REACT_APP_API_URL}categoryimage/delete/${id}`
      );
      toast.success('Category deleted successfully!');
      fetchAllUsers();
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      console.log(err);
      toast.error('Error deleting category!');
    }
  };

  const handleUpdate = async id => {
    try {
      const url= `${process.env.REACT_APP_API_URL}category/updateCategory/${id}`
      await axios.put(url, {
        categoryname: updateCategoryName,
      });
      toast.success('Category updated successfully!');
      fetchAllUsers();
      setIsUpdateModalOpen(false);
      setCategoryToUpdate(null);
      setUpdateCategoryName('');
    } catch (err) {
      console.error('Error updating category:', err);
      toast.error('Error updating category!');
    }
  };

  return (
    <div className='container'>
      <ToastContainer/>
      <h2 className='w-100 d-flex justify-content-center p-3'>
        Category Details
      </h2>
      <div className='row'>
        <div className='col-md-12'>
          <p>
            <Link to='/CategoryCreate' className='btn btn-primary'>
              Add New Category
            </Link>
          </p>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((user, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{user.category_id}</td>
                    <td>{user.categoryname}</td>
                    <td>
                      {user.image ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}images/${user.category_id}`}
                          alt={user.category_id}
                          width='50'
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td>
                      {/* <Link
                        to={`/categoryUpdate/${user.category_id}`}
                        className='btn btn-warning mx-2'
                      >
                        Update
                      </Link> */}
                      <button onClick={() =>{ setIsUpdateModalOpen(true) 
                      setCategoryToUpdate(user.category_id)
                      setUpdateCategoryName(user.categoryname)

                      }}className='btn btn-warning mx-2'>
                        Update
                      </button>
                      <button
                        onClick={() =>{setIsDeleteModalOpen(true)
                        setCategoryToDelete(user.category_id)}
                    }className='btn btn-danger'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        message='Are you sure you want to delete this category?'
        onConfirm={() => handleDelete(categoryToDelete)}
      />

        <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        message='Are you sure you want to update this category?'
        onConfirm={() => handleUpdate(categoryToUpdate)}
        updateCategoryName={updateCategoryName}
        setUpdateCategoryName={setUpdateCategoryName}
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
                  className='btn btn-danger'
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

const UpdateModal = ({ isOpen, onClose, message, onConfirm, updateCategoryName, setUpdateCategoryName }) => {
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
                  <b>Update Category</b>
                </h5>
              </div>
              <div className='modal-body' id='delete-modal-description'>
                <p>{message}</p>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter updated category name'
                  value={updateCategoryName}
                  onChange={(e) => setUpdateCategoryName(e.target.value)}
                />
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
                  className='btn btn-danger'
                  onClick={onConfirm}
                >
                  Update
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

export default CategoryDetails;

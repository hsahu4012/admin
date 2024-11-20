import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const UsersList = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number| null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const callApiExamsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'users/allusers';
      const response = await axios.get(url);
      console.log(response);
      setUserList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApiExamsList();
  }, []);

  const openDeleteModal = (id: number) => {
    setSelectedUserId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  // const deleteUser = async (id: any) => {
  //   // eslint-disable-next-line no-restricted-globals
  //   var val = confirm('Sure you want to delete user?');
  //   if (val === true) {
  //     const url = process.env.REACT_APP_API_URL + 'users/removeuser/' + id;
  //     const response = await axios.delete(url);
  //     console.log(response);
  //     toast.success('User Deleted Successfully');
  //   } else {
  //     toast.error('User not Deleted');
  //   }
  //   callApiExamsList();
  // };

  const deleteUser = async () => {
    if (selectedUserId !== null) {
      try {
        const url = `${process.env.REACT_APP_API_URL}users/removeuser/${selectedUserId}`;
        await axios.delete(url);
        toast.success('User Deleted Successfully');
        callApiExamsList();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }

    closeDeleteModal();
  };

  const activateUser = async (id: any) => {
    // eslint-disable-next-line no-restricted-globals
    var val = confirm('Sure you want to activate user?');
    if (val === true) {
      const url = process.env.REACT_APP_API_URL + 'users/activateuser/' + id;
      const response = await axios.put(url);
      console.log(response);
      alert('User Activated');
    } else {
      alert('User not Activated');
    }
    callApiExamsList();
  };

  return (
    <div>
      <ToastContainer />
      <br></br>
      <Link to='/useradd' className='btn btn-primary'>
        Create New User
      </Link>
      <br></br>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>User Id</th>

            <th>UserName</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Password</th>
            <th>Status</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((item, index) => (
              <tr key={index + item.exam_id}>
                <td>{index + 1}</td>
                <td>{item.userid}</td>   
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.password}</td>
                <td>{item.status}</td>
                <td>
                  <Link
                    to={`/useredit/${item.userid}`}
                    className='btn btn-warning'
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => openDeleteModal(item.userid)}
                    className='btn btn-danger'
                  >
                    Delete User
                  </button>
                </td>
                <td>
                  {item.status === 1 && (
                    <button
                      onClick={() => activateUser(item.userid)}
                      className='btn btn-success'
                    >
                      Activate User
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br></br>

      {isDeleteModalOpen && (
        <div className='modal fade show' style={{ display: 'block',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={deleteUser}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default UsersList;

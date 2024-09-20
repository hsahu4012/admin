import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [userList, setUserList] = useState<any[]>([]);

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

  const deleteUser = async (id: any) => {
    // eslint-disable-next-line no-restricted-globals
    var val = confirm('Sure you want to delete user?');
    if (val === true) {
      const url = process.env.REACT_APP_API_URL + 'users/removeuser/' + id;
      const response = await axios.delete(url);
      console.log(response);
      alert('User deleted');
    } else {
      alert('User not Deleted');
    }
    callApiExamsList();
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
      <br></br>
      <Link to='/useradd' className='btn btn-primary'>
        Create New User
      </Link>
      <br></br>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>UserName</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.map((item, index) => (
              <tr key={index + item.exam_id}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
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
                    onClick={() => deleteUser(item.userid)}
                    className='btn btn-primary'
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
    </div>
  );
};

export default UsersList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersDetails = () => {
  const [userList, setUserList] = useState([]);

  const fetchUsersList = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}users/allusersdetails`;
      const response = await axios.get(url);
      console.log(response);
      setUserList(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <div>
      <h2 className='w-100 d-flex justify-content-center p-3'>
        Users Details
      </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Payment Amount</th>
            <th>Cost Amount</th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.map((user, index) => (
            <tr key={user.userid}>
              <td>{index + 1}</td>
              <td>{user.userid}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email ? user.email : '-'}</td>
              <td>{user.mobile ? user.mobile : '-'}</td>
              <td>{user.total_paymentamount}</td>
              <td>{user.total_costamount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersDetails;

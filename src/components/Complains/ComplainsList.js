import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const ComplainsList = () => {
  const [complains, setComplains] = useState([]);

  const fetchComplainsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'complains/allcomplains';
      const response = await axios.get(url);
      console.log(response.data);
      setComplains(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComplain = async complainid => {
    //api call for delete
    try {
      const url =
        process.env.REACT_APP_API_URL +
        'complains/removecomplains/' +
        complainid;
      const response = await axios.put(url);
      console.log(response);
      //setUserList(response.data);
      fetchComplainsList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplainsList();
  }, []);
  return (
    <div>
      <h2>Complain List</h2>
      <Link to='/complainsadd' className='btn btn-primary'>
        Create New Complain
      </Link>
      <table className='table table-responsive'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Complain ID</th>
            <th>Order ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile no.</th>
            <th>Address</th>
            <th>Description</th>
            <th>Resolvestatus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complains &&
            complains.map((temp, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{temp.complainid}</td>
                <td>{temp.orderid || temp.userid}</td>
                <td>{temp.name}</td>
                <td>{temp.email}</td>
                <td>{temp.mobile}</td>
                <td>{temp.address}</td>
                <td>{temp.complain_desc}</td>
                <td>{temp.resolvestatus}</td>
                <td>
                  <Link
                    to={`/complainsedit/${temp.complainid}`}
                    className='btn btn-warning'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteComplain(temp.complainid)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplainsList;

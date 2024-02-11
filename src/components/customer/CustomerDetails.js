import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
const CustomerDetails = () => {
  const [data, setData] = useState([]);
  


  
  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const resAllUsers = await axios.get(`${process.env.REACT_APP_API_URL}customer/showallcustomer`);
        setData(resAllUsers.data);

      
        const resUserData = await axios.get(`${process.env.REACT_APP_API_URL}customer/customerDetails`);
        setData(resUserData.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
 
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this customer?");
      if (confirmed) {
      await axios.put(`${process.env.REACT_APP_API_URL}customer/removeCustomer/${id}`);
      console.log(id)
      window.location.reload()
      }
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className="container">
    <h2 className='w-100 d-flex justify-content-center p-3'>Customer Details</h2>
        <div className='row'>
            <div className='col-md-12'>
            <p><Link to="/CustomerCreate" className="btn btn-success">Add New Customer</Link></p>
            <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>No</th>
                    <th>UserId</th>
                    <th>UserName</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Password</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Pincode</th>
                    <th>Profile</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((user, i) => {
                        return (
                            <tr key={i}>
                            <td>{user.cust_det_srno}</td>
                              <td>{user.userid} </td>
                              <td>{user.username} </td>
                              <td>{user.name} </td>
                              <td>{user.email} </td>
                              <td>{user.mobile} </td>
                              <td>{user.password} </td>
                                <td>{user.city} </td>
                                <td>{user.address} </td>
                                <td>{user.alternatecontact} </td>
                                <td>{user.pincode} </td>
                                <td>{user.profile_photo} </td>
                                <td>
                                    <Link to={`/customerUpdate/${user.cust_det_srno}`} className="btn btn-warning mx-2">Edit</Link>
                                    <button onClick={()=>handleDelete(user.cust_det_srno)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        </div>
    </div>
  );
};
 
export default CustomerDetails;
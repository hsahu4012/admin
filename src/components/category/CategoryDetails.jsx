import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
const CategoryDetails = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}category/allCategory`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);
 
 
  const handleDelete = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}category/romoveCategory/${id}`);
      console.log(id)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className="container">
    <h2 className='w-100 d-flex justify-content-center p-3'>Category Details</h2>
        <div className='row'>
            <div className='col-md-12'>
            <p><Link to="/CategoryCreate" className="btn btn-primary">Add New Category</Link></p>
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Sr No.</th>
                    <th>Category Name</th>
                    
                </tr>
            </thead>
            <tbody>
                {
                    data.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.category_id}</td>
                                <td>{user.categoryname} </td>
                                <td>
                                    <Link to={`/categoryUpdate/${user.category_id}`} className="btn btn-warning mx-2">Update</Link>
                                    <button onClick={()=>handleDelete(user.category_id)} className="btn btn-danger">Delete</button>
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
 
export default CategoryDetails;
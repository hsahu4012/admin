import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryDetails = () => {
  const [data, setData] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}category/allCategory`);
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

  const handleDelete = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}category/romoveCategory/${id}`);
      await axios.delete(`${process.env.REACT_APP_API_URL}categoryimage/delete/${id}`);
      fetchAllUsers();
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
                <th>Category ID</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data && data.map((user, i) => (
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td>{user.category_id}</td>
                    <td>{user.categoryname}</td>
                    <td>
                    {user.image ? (
  <img
    src={`${process.env.REACT_APP_API_URL}images/${user.category_id}`}
    alt={user.category_id}
    width="50"
  />
) : (
  'No Image'
)}


                    </td>
                    <td>
                      <Link to={`/categoryUpdate/${user.category_id}`} className="btn btn-warning mx-2">Update</Link>
                      <button onClick={() => handleDelete(user.category_id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderDetailsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}orderdetails/orderDetails`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this wishlist?"
      );
      if (confirmed) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}orderdetails/removeOrderProduct/${id}`
        );

        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">
        Orders Detail List
      </h2>
      <div className="row">
        <div className="col-md-12">
          <p>
            <Link to="/orderDetailsCreate" className="btn btn-warning">
              Add New OrderDetail
            </Link>
          </p>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Order_id</th>
                <th>ProductId</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.srno}</td>
                    <td>{item.order_id}</td>
                    <td>{item.productid}</td>
                    <td>{item.quantity}</td>
                    <td className="now">
                      <Link
                        to={`/orderDetailsUpdate/${item.order_id}`}
                        className="btn btn-warning mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.order_id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsList;

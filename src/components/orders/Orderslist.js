import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Orderslist = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}orders/allOrders`
      );
      setOrders(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async id => {
    console.log(id, 'hii');
    try {
      const confirmed = window.confirm(
        'Are you sure you want to delete this order?'
      );
      if (confirmed) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}orders/romoveOrder/${id}`
        );
        setOrders(orders.filter(item => item.order_id !== id));

        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container'>
      <h2 className='w-100 d-flex justify-content-center p-3'>Orders List</h2>
      <div className='row'>
        <div className='col-md-12'>
          <p>
            <Link to='/orderCreate' className='btn btn-warning'>
              Add New Order
            </Link>
          </p>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Order_id</th>
                <th>Order_date</th>
                <th>Order_time</th>
                <th>Order_status</th>
                <th>userid</th>
                <th>PaymentAmount</th>
                <th>PaymentStatus</th>
                <th>PaymentMode</th>
                <th>Addressid</th>
                <th>Delivery_status</th>
                <th>Tracking_id</th>
                <th>Delivery_Partner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.srno}</td>
                    <td>{item.order_id}</td>
                    <td>{item.order_date}</td>
                    <td>{item.order_time}</td>
                    <td>{item.order_status}</td>
                    <td>{item.userid}</td>
                    <td>{item.paymentamount}</td>
                    <td>{item.paymentstatus}</td>
                    <td>{item.paymentmode}</td>
                    <td>{item.addressid}</td>
                    <td>{item.delivery_status}</td>
                    <td>{item.tracking_id}</td>
                    <td>{item.delivery_partner}</td>
                    <td className='now'>
                      <Link
                        to={`/orderUpdate/${item.order_id}`}
                        className='btn btn-primary mx-2'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.order_id)}
                        className='btn btn-danger'
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

export default Orderslist;

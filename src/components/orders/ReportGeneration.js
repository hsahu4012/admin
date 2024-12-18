import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportGeneration = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}orders/Orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">Report</h2>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Total Orders</th>
                <th>Total Price</th>
                <th>Average Price</th>
                <th>Last Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.userid}</td>
                  <td>{order.name}</td>
                  <td>
                    <a
                      href={`https://wa.me/${order.mobile}?text=Hello%20${encodeURIComponent(
                        order.name
                      )},%20we%20noticed%20your%20order%20activity!`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {order.mobile}
                    </a>
                  </td>
                  <td>{order.total_orders}</td>
                  <td>{order.total_price}</td>
                  <td>{order.average_price  }</td>
                  <td>{order.last_order_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;

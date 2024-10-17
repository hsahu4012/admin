import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DiscountList = () => {
  const [discount, setDiscount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}discount/alldiscount`
        );
        setDiscount(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};


  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this discount?"
      );
      if (confirmed) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}discount/removediscount/${id}`
        );
        setDiscount(discount.filter((discounts) => discounts.id !== id));
      }
    } catch (err) {
      console.log("Error deleting discount:", err);
    }
  };

  return (
    <div className="container">
      <h2 className="w-100 d-flex justify-content-center p-3">Discount List</h2>
      <div className="row">
        <div className="col-md-12">
          <p>
            <Link to="/adddiscount" className="btn btn-warning">
              Add New Discount
            </Link>
          </p>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Disc ID</th>
                <th>Disc Name</th>
                <th>Amount</th>
                <th>Percentage</th>
                <th>maxdiscount</th>
                <th>mincartvalue</th>
                <th>maxcartvalue</th>
                <th>Image</th>
                <th>Count</th>
                <th>isoffer</th>
                <th>ishidden</th>
                <th>description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {discount.length > 0 ? (
                discount.map((discounts, index) => (
                  <tr key={discounts.id}>
                    <td>{index + 1}</td>
                    <td>{discounts.discountid}</td>
                    <td>{discounts.discountname}</td>
                    <td>{discounts.amount}</td>
                    <td>{discounts.percentage}</td>
                    <td>{discounts.maxdiscount}</td>
                    <td>{discounts.mincartvalue}</td>
                    <td>{discounts.maxcartvalue}</td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_API_URL}${discounts.image}`}
                        alt={discounts.discountname}
                        width="50"
                      />
                    </td>
                    <td>{discounts.count}</td>
                    <td>{discounts.isoffer}</td>
                    <td>{discounts.ishidden}</td>
                    <td>{discounts.description}</td>
                    <td>{formatDate(discounts.startdate)}</td>
                    <td>{formatDate(discounts.enddate)}</td>
                    <td>
                      <Link
                        to={`/updatediscount/${discounts.discountid}`}
                        className="btn btn-primary mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(discounts.discountid)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17" className="text-center">
                    No discounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiscountList;


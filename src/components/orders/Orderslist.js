import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const Orderslist = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  
  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}orders/allOrders`
    );
    setOrders(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const handleDelete = async id => {
    //   console.log(id, 'hii');
    //   try {
      //     const confirmed = window.confirm(
  //       'Are you sure you want to delete this order?'
  //     );
  //     if (confirmed) {
  //       await axios.put(
  //         `${process.env.REACT_APP_API_URL}orders/romoveOrder/${id}`
  //       );
  //       setOrders(orders.filter(item => item.order_id !== id));

  //       window.location.reload();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handleEditClick = (order_id, field, value) => {
      const date=orders.find(p => p.order_id === order_id).order_date;
      const [day,month, year] = date.split("/");
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const temp={
        order_date:formattedDate,
      } 
      setEditingOrderId(order_id);
      setEditedValues({ ...temp });
  }
  const handleValueChange = (order_id, field, value) => {    
      setEditedValues({ ...editedValues, [field]: value });
      
  }

  const handleSaveClick = async orderid => {
    // setOrders(prev => prev.map(item => (item.order_id === orderid ? { ...item, ...editedValues } : item)));
    try {

      let updatedValues = { ...editedValues }; // Clone the current edited values

      if (editedValues.order_date) {
          const date = editedValues.order_date;
          const [year, month, day] = date.split("-");
          const formattedDate = `${day}/${month}/${year}`;
          updatedValues = { ...updatedValues, order_date: formattedDate };
          console.log("Formatted date:", formattedDate); // Debug log
      }


      const url =
        process.env.REACT_APP_API_URL + `orders/updateOrder/${orderid}`;
      await axios.put(url, updatedValues);
      toast.success('Order updated successfully!');
      setEditingOrderId(null);
      
      fetchData();
    } catch (error) {
      console.error('Error updating Order:', error);
      toast.error('Failed to update the Order.');
    }
  };
  const handleDelete = async()  => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}orders/romoveOrder/${deleteId}`
      );

      setOrders(orders.filter(item => item.order_id !== deleteId));
        setShowModal(false);
        toast.success('Order Deleted Successfully');
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete order');
    }
  }
   const openModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const closeModal = (id) => {
    setShowModal(false);
    setDeleteId(null);

  };

  return (
    <div className='container'>
      <ToastContainer />
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
                    <td>
                    {editingOrderId === item.order_id ? (
                      <input
                        type='date'
                        value={editedValues.order_date}
                        onChange={e =>handleValueChange(item.order_id, 'order_date', e.target.value)}                      
                      />
                    ) : (
                      item.order_date
                    )}  
                    <button
                      onClick={() =>
                        handleEditClick(item.order_id, 'order_date', item.order_date)
                      }
                      className='btn btn-warning btn-sm ml-2'
                    >
                      Edit
                    </button>
                    </td>
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
                        onClick={() => openModal(item.order_id)}
                        className='btn btn-danger'
                      >
                        Delete
                      </button>
                      {editingOrderId === item.order_id && (
                        <button
                          onClick={() => handleSaveClick(item.order_id)}
                          className='btn btn-success'  
                        >
                          Save
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className='modal fade show' style={{ display: 'block',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>Are you sure you want to delete this order?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

      
  
};

export default Orderslist;

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ConfirmationModal } from '../../shared/ConfirmationModal';

const Addressdetails = () => {
  const [data, setData] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [deletedId,setDeletedId] = useState(null);

  const fetchAddressDetails = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'address/allAddress';
      const response = await axios.get(url);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete =  (id) => {
    setDeletedId(id);
    setModalShow(true);
    console.log('deleting ', id);
  };

  const confirmDeleteAddress = async()=>{
    try {
      const url = process.env.REACT_APP_API_URL + 'address/deleteAddress/' + deletedId;
      console.log(deletedId);
      const response = await axios.put(url);
      console.log(response);
      setModalShow(false)
      fetchAddressDetails();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAddressDetails();
  }, []);

  return (
    <>
    <div className='container'>
      <h2 className='w-100 d-flex justify-content-center p-3'>
        Address Details
      </h2>
      <div className='row'>
        <div className='col-md-12'>
          <p>
            <Link to='/addressadd' className='btn btn-success'>
              Add New Address
            </Link>
          </p>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>Sr_No</th>
                <th>UserId</th>
                <th>AddressId</th>
                <th>Name</th>
                <th>Line1</th>
                <th>Line2</th>
                <th>Line3</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Pincode</th>
                <th>Contact</th>
                <th>AlternateContact</th>
                <th>Landmark</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => {
                return (
                  <tr key={i}>
                    <td>{user.sr_no}</td>
                    <td>{user.userid} </td>
                    <td>{user.addressid} </td>
                    <td>{user.name} </td>
                    <td>{user.line1} </td>
                    <td>{user.line2} </td>
                    <td>{user.line3} </td>
                    <td>{user.city} </td>
                    <td>{user.state} </td>
                    <td>{user.country} </td>
                    <td>{user.pin} </td>
                    <td>{user.contact} </td>
                    <td>{user.alternatecontact} </td>
                    <td>{user.landmark} </td>

                    <td>
                      <Link
                        to={`/addressupdate/${user.addressid}`}
                        className='btn btn-warning mx-2'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.addressid)}
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
    <ConfirmationModal
        show={modalShow}
        modalMessage = "you really want to delete this Address"
        onHide={() => setModalShow(false)}
        confirmation ={confirmDeleteAddress}
        operationType = "Delete"
        wantToAddData = {true}
      />
    </>
  );
};

export default Addressdetails;

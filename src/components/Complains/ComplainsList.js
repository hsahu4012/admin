import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ConfirmationModal } from '../shared/ConfirmationModal';

export const ComplainsList = () => {
  const [complains, setComplains] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [deleteId,setDeleteId] = useState(null);

  const fetchComplainsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'complains/allcomplains';
      const response = await axios.get(url);
      const sortedComplains = response.data.sort((a, b) => {
        const dateA = new Date(a.date_raised); 
        const dateB = new Date(b.date_raised);
        return dateB - dateA;
      });
      console.log(response.data);
      setComplains(sortedComplains);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComplain =  complainid => {
    setDeleteId(complainid)
    setModalShow(true)
  };

  const confirmDeleteComplain = async()=>{
    //api call for delete
    setModalShow(false)
    try {
      const url =
        process.env.REACT_APP_API_URL +
        'complains/removecomplains/' +
        deleteId;
      const response = await axios.put(url);
      console.log(response);
      //setUserList(response.data);
      fetchComplainsList();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchComplainsList();
  }, []);
  return (
    <>
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
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile no.</th>
            <th>Address</th>
            <th>Subject</th>
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
                <td>{temp.orderid}</td>
                <td>{temp.userid}</td>
                <td>{temp.name}</td>
                <td>{temp.email}</td>
                <td>{temp.mobile}</td>
                <td>{temp.address}</td>
                <td>{temp.subject}</td>
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
    <ConfirmationModal
        show={modalShow}
        modalMessage = "you really want to delete this Complain"
        onHide={() => setModalShow(false)}
        confirmation ={confirmDeleteComplain}
        operationType = "Delete"
        wantToAddData = {true}
      />
    </>
  );
};

export default ComplainsList;

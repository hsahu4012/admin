import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactList = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}contact/allContacts`
      );
      setContact(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async id => {
    console.log(id, 'hii');
    try {
      const confirmed = window.confirm(
        'Are you sure you want to delete this contact?'
      );
      if (confirmed) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}contact/removeContact/${id}`
        );
        setContact(contact.filter(item => item.id !== id));

        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='container'>
      <h2 className='w-100 d-flex justify-content-center p-3'> Contact List</h2>
      <div className='row'>
        <div className='col-md-12'>
          <p>
            <Link to='/AddContact' className='btn btn-warning'>
              Add contact
            </Link>
          </p>
          <table className='table table-striped table-white'>
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Contact Id</th>
                <th> Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Address</th>
                <th>Subject</th>
                <th>Message</th>
                
                <th>Resolve Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contact.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.contactid}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td>{item.subject}</td>
                    <td>{item.message}</td>
                  
                    <td>{item.resolvestatus}</td>

                    {/* <td>{item.isactive}</td> */}

                    <td className='now'>
                      <Link
                        to={`/UpdateContact/${item.contactid}`}
                        className='btn btn-primary '
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.contactid)}
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

export default ContactList;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactList = () => {
  const [contact, setContact] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}contact/allContacts`
      );
      setContact(response.data);
    };
    fetchData();
  }, []);

  const openDeleteModal = (id) => {
    setSelectedContactId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedContactId(null);
  };

  const handleDelete = async () => {
    if (selectedContactId !== null) {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}contact/removeContact/${selectedContactId}`
        );
        setContact((prevContacts) =>
          prevContacts.filter((item) => item.contactid !== selectedContactId)
        );

        setSelectedContactId(null);
      } catch (err) {
        console.error('Error deleting contact:', err);
      }
    }
    closeDeleteModal();
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
                <th>Name</th>
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
                        onClick={() => openDeleteModal(item.contactid)}
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

      {/* Modal for delete confirmation */}
      {isDeleteModalOpen && (
        <div
          className='modal fade show'
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-body'>
                <p>Are you sure you want to delete this contact?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeDeleteModal} // Close modal on cancel
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={handleDelete} // Proceed with delete on confirmation
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

export default ContactList;

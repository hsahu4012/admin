import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeamList = () => {
  const [team, setTeam] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}ourTeam/allourTeam`
        );
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const openModal = (id) => {
    setSelectedTeamId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeamId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}ourTeam/removeourTeam/${selectedTeamId}`
      );
      setTeam(team.filter(item => item.id !== selectedTeamId));
      closeModal();
    } catch (err) {
      console.log('Error deleting team member:', err);
      closeModal();
    }
  };

  return (
    <div className='container'>
      <h2 className='w-100 d-flex justify-content-center p-3'>Team List</h2>
      <div className='row'>
        <div className='col-md-12'>
          <p>
            <Link to='/addTeam' className='btn btn-warning'>
              Add New Team Member
            </Link>
          </p>
          <table className='table table-striped '>
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Team ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Image</th>
                <th>Description</th>
                <th>Sequence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {team.length > 0 ? (
                team.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.designation}</td>
                    <td>{item.department}</td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_API_URL}${item.image}`}
                        alt={item.name}
                        width='50'
                      />
                    </td>
                    <td>{item.description}</td>
                    <td>{item.sequence}</td>
                    <td>
                      <Link
                        to={`/updateTeam/${item.id}`}
                        className='btn btn-primary mx-2'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openModal(item.id)}
                        className='btn btn-danger'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='8' className='text-center'>
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <p className="text-dark">Are you sure you want to delete this team member?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamList;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeamList = () => {
  const [team, setTeam] = useState([]);

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

  const handleDelete = async id => {
    console.log(id, 'hii');
    try {
      const confirmed = window.confirm(
        'Are you sure you want to delete this team member?'
      );
      if (confirmed) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}ourTeam/removeourTeam/${id}`
        );

        setTeam(team.filter(item => item.id !== id));
      }
    } catch (err) {
      console.log('Error deleting team member:', err);
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
                    <td>
                      <Link
                        to={`/updateTeam/${item.id}`}
                        className='btn btn-primary mx-2'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
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
    </div>
  );
};

export default TeamList;

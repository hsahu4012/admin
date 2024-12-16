import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const Settingslist = () => {
  const [setting, setSetting] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}settings/allsettings`
      );
      setSetting(response.data);
    };
    fetchData();
  }, []);

  const openModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  // const handleDelete = async id => {
  //   console.log(id, 'hii');
  //   try {
  //     const confirmed = window.confirm(
  //       'Are you sure you want to delete this setting?'
  //     );
  //     if (confirmed) {
  //       await axios.put(
  //         `${process.env.REACT_APP_API_URL}settings/removesetting/${id}`
  //       );

  //       window.location.reload();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async () => {
    try {
      if(deleteId) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}settings/removesetting/${deleteId}`
        );
        setSetting((prevSetting) => prevSetting.filter((item) => item.setting_id !== deleteId));
      }
      closeModal();
    } catch (err) {
      console.log('Error deleting setting:', err);
    }
  };

  return (
    <div className='container'>
      <h2 className='w-100 d-flex justify-content-center p-3'>
        {' '}
        Settings List
      </h2>
      <div className='row'>
        <div className='col-md-12'>
          <p>
            <Link to='/settingCreate' className='btn btn-warning'>
              Add Setting
            </Link>
          </p>
          <table className='table table-striped table-white'>
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Setting Id</th>
                <th>Setting Name</th>
                <th>Setting Value</th>
                {/* <th>IsActive</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {setting.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.setting_id}</td>
                    <td>{item.setting_name}</td>
                    <td>{item.setting_value}</td>

                    {/* <td>{item.isactive}</td> */}

                    <td className='now'>
                      <Link
                        to={`/settingUpdate/${item.setting_id}`}
                        className='btn btn-primary '
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openModal(item.setting_id)}
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

      {/* {showModal && (
        <div className='modal fade show' style={{ display: 'block',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content '>
          <div className='modal-body'>
            <p>Are you sure you want to delete this setting?</p>
          </div>
          <div className='modal-footer'>
            <button  className='btn btn-primary' onClick={handleDelete}>Yes</button>
            <button className='btn btn-danger' onClick={closeModal}>No</button>
          </div>
        </div>
        </div>
        </div>
      )} */}

      <ConfirmationModal
        show={showModal}
        onHide={closeModal}
        modalMessage="Are you sure you want to delete this setting?"
        confirmation={handleDelete}
        wantToAddData={true}
        operationType="Yes"
      />
    </div>
  );
};

export default Settingslist;

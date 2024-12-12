import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const VendorList = () => {
  const [vendorList, setVendorList] = useState<any[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);

  const callApiExamsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'vendor/allvendors';
      const response = await axios.get(url);
      // console.log(response.data);
      setVendorList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApiExamsList();
  }, []);

  const deleteVendor = async (id: any) => {
    const url = process.env.REACT_APP_API_URL + 'vendor/removevendor/' + id;
    const response = await axios.put(url);
    // console.log(response);
    callApiExamsList();
  };

  const handleDeleteClick = (id: any) => {
    setSelectedVendorId(id);
    setModalShow(true);
  };

  const handleConfirmDelete = () => {
    if (selectedVendorId !== null) {
      deleteVendor(selectedVendorId);
      setModalShow(false);
    }
  };

  function TableBody() {
    let arr = [...vendorList];
    let tableDataList = arr.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.vendor_id}</td>
        <td>{item.vendor_name}</td>
        <td>{item.vendor_description}</td>
        <td>
          <Link
            to={`/vendoredit/${item.vendor_id}`}
            className='btn btn-warning'
          >
            Edit
          </Link>
        </td>
        <td>
          <button
            onClick={() => handleDeleteClick(item.vendor_det_srno)}
            className='btn btn-danger'
          >
            Delete Vendor
          </button>
        </td>
      </tr>
    ));
    return <tbody>{tableDataList}</tbody>;
  }

  return (
    <div>
      <br></br>
      <Link to='/vendoradd' className='btn btn-primary'>
        Create New Vendor
      </Link>
      <br></br>

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Vendor Id</th>
            <th>VendorName</th>
            <th>Vendor Description</th>

            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        {/* <tbody>
          {
            vendorList && vendorList.map((item, index) => (

              // I cokmmented this out because it was throwing some error
              // <tr key={index + item.exam_id}>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.vendor_id}</td>
                <td>{item.vendor_name}</td>
                <td>{item.vendor_description}</td>
               
                <td>
                  <Link to={`/vendoredit/${item.vendor_id}`} className='btn btn-warning'>Edit</Link>
                </td>
                <td>
                  <button onClick={() => deleteVendor(item.vendor_det_srno)} className='btn btn-primary'>Delete Vendor</button>
                </td>
                
              </tr>
            ))
          }
        </tbody> */}
        <TableBody />
      </table>
      <br></br>

      <ConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalMessage="Are you sure you want to delete this vendor?"
        confirmation={handleConfirmDelete}
        operationType="Delete"
        wantToAddData={true}
      />
    </div>
  );
};

export default VendorList;

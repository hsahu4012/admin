import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmationModal } from '../shared/ConfirmationModal';

const WishlistList = () => {
  const [data, setData] = useState([]);
  const [modalShow,setModalShow] = useState(false);
  const [deletedId,setDeletedId] = useState(null);


  const handleDelete =  userid => {
    setDeletedId(userid);
    setModalShow(true)
  };

  const confirmDeleteWishlist = async()=>{
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}wishlist/emptyWishList/${deletedId}`
        );
        // window.location.reload();
    } catch (err) {
      console.log(err);
    }finally{
    setModalShow(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}wishlist/allWishlistItems`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <>
    <div className='container'>
      <h2 className='w-100 d-flex justify-content-center p-3'>
        WishList Details
      </h2>
      <div className='row'>
        <div className='col-md-12'>
          <p>
            <Link to='/wishlistCreate' className='btn btn-warning'>
              Add New WishList
            </Link>
          </p>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>No</th>
                <th>Userid</th>
                <th>ProductId</th>
                <th>Wishlist_Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.srno}</td>
                    <td>{item.userid}</td>
                    <td>{item.productid}</td>
                    <td>{item.wishlist_date}</td>
                    <td className='now'>
                      <Link
                        to={`/wishlistUpdate/${item.userid}`}
                        className='btn btn-warning mx-2'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.userid)}
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
        modalMessage = "you really want to delete this Wishlist"
        onHide={() => setModalShow(false)}
        confirmation ={confirmDeleteWishlist}
        operationType = "Delete"
        wantToAddData = {true}
      />
    </>
  );
};

export default WishlistList;

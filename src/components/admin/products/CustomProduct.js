import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../../shared/ConfirmationModal';
import JoditEditor from 'jodit-react';
import { toast, ToastContainer } from 'react-toastify';

const CustomProduct = () => {
  // const [requestid, setReuestid] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [product_name, setProdName] = useState('');
  const [product_desc, setDesc] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [userid, setUserid] = useState('user123');
  const [Ids, setIds] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // console.log(
      //   `name = ${name}, contact = ${contact}, prod name = ${product_name}, desc = ${product_desc}, quantity = ${quantity}, userid = ${userid}`
      // );
      const url =
        process.env.REACT_APP_API_URL + 'customProduct/addCustomProduct';
      const response = await axios.post(url, {
        product_name,
        product_desc,
        quantity,
        userid,
        name,
        contact,
      });
      window.location.reload()
      toast.success('Custom Product Added Successfully');
      // console.log('response = ', response);
    } catch (e) {
      toast.error('Error In Adding Custom Product')
      // console.log('error = ', e.message);
    }
  }

  async function fetchuserIds() {
    try {
      const url = `${process.env.REACT_APP_API_URL}customProduct/getAllUserid`;
      const response = await axios.get(url);
      // console.log(response.data);
      setIds(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  useEffect(() => {
    fetchuserIds();
  }, []);

  return (
    <>
    <ToastContainer/>
      <div className=' d-flex flex-column gap-5'>
        <h2>Add Custom Product</h2>
        {/* <Formik onSubmit={handleSubmit}> */}
        <div className='row'>
          <form
            onSubmit={handleSubmit}
            className='examAddForm d-flex flex-column gap-4'
          >
            <div className='row'>
              <label htmlFor='name' className='col-4 my-2'>
                Name:
              </label>
              <input
                name='name'
                onChange={e => setName(e.target.value)}
                value={name}
                type='text'
                className='col-8'
                required
              />
            </div>
            <div className='row'>
              <label htmlFor='contact' className='col-4 my-2'>
                Contact:
              </label>
              <input
                name='contact'
                onChange={e => setContact(e.target.value)}
                value={contact}
                type='text'
                className='col-8'
                required
              />
            </div>
            <div className='row'>
              <label htmlFor='userid' className='col-4 my-2'>
                User Id:
              </label>
              <select
                className='col-8'
                value={userid}
                onChange={e => setUserid(e.target.value)}
              >
                {Ids.map((Id,index) => (
                  <option key={Id.userid} value={Id.userid}>
                    {`${Id.userid}`}
                  </option>
                ))}
              </select>
            </div>
            <div className='row'>
              <label htmlFor='prodname' className='col-4 my-2'>
                Product Name:
              </label>
              <input
                name='prodname'
                onChange={e => setProdName(e.target.value)}
                value={product_name}
                type='text'
                className='col-8'
                required
              />
            </div>
            <div className='row'>
              <label htmlFor='desc' className='col-4 my-2'>
                Product Description:
              </label>
              <input
                name='desc'
                onChange={e => setDesc(e.target.value)}
                value={product_desc}
                type='text'
                className='col-8'
                required
              />
            </div>
            <div className='row'>
              <label htmlFor='quantity' className='col-4 my-2'>
                Quantity:
              </label>
              <input
                name='quantity'
                onChange={e => setQuantity(e.target.value)}
                value={quantity}
                type='text'
                className='col-8'
                required
              />
            </div>
            <div className='row'>
              <div className='text-center my-4'>
                <button type='submit' className='btn btn-primary'>
                  Add Custom Product
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* </Formik> */}
      </div>
    </>
  );
};
export default CustomProduct;

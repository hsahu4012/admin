import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaAudioDescription } from 'react-icons/fa';

const _ = require('lodash');

const VendorUpdate: FC = () => {
  const { vendorid } = useParams();
  const id = vendorid;
  console.log('user id - ', id);
  const vendorDataIntialState = {
    vendor_id: id,
    vendor_name: '',
    vendor_description: '',
  };
  const [updateData, SetUpdateData] = useState(vendorDataIntialState);
  const navigate = useNavigate();

  const callVendorUpdateApi = async (data: any) => {
    //console.log('data-----------', data)
    const url = process.env.REACT_APP_API_URL + 'vendor/updatevendor/ ' + id;
    const response = await axios.put(url, data);
    console.log(response);
  };

  const getVendorbyIdApi = async (id: any) => {
    // Needs to be changed
    const url = process.env.REACT_APP_API_URL + 'vendor/vendorbyid/' + id;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    (async () => {
      // To be used when api provided
      let data = await getVendorbyIdApi(id);
      // SetUpdateData(data[0]);
      // console.log(data[0]);

      for (let i = 0; i < data.length; i++) {
        let tempId: number = Number(data[i].vendor_id);
        if (tempId == Number(id)) {
          // console.log("Vendor name : "+data[i].vendor_name);
          SetUpdateData(data[i]);
          break;
        }
      }
    })();
  }, []);

  return (
    <div>
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>
        Update Vendor Details
      </h4>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: updateData.vendor_name,
          mobile: updateData.vendor_description,
        }}
        onSubmit={async values => {
          //console.log('values', values);
          if (_.isEqual(values, updateData)) {
            alert('No Updates made');
          } else {
            // eslint-disable-next-line no-restricted-globals
            var val = confirm('Sure you want to update data?');
            if (val === true) {
              await callVendorUpdateApi(values);
              // console.log(values);
              alert('Updated successfully');
              navigate('/venderlist');
            } else {
              alert('Stopped Updating');
            }
          }
        }}
      >
        <div className='form-container'>
          <Form className='examAddForm'>
            <Field hidden type='number' name='venderid'></Field>

            <div className='row'>
              <label htmlFor='name'>Vendor Name :</label>
              <Field name='name' type='text' max='100' />
            </div>

            <div className='row'>
              <label htmlFor='vendor description'>Vendor Description :</label>
              <Field name='mobile' type='text' />
            </div>

            <div className='row'>
              <button type='submit' className='btn btn-primary'>
                Update Vendor
              </button>
            </div>

            <div className='row'>
              <div className='text-center my-4'>
                <Link to='/vendorDetails' className='btn btn-primary'>
                  back
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default VendorUpdate;

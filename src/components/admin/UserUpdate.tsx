import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from 'react-router-dom';

const _ = require('lodash');

const UserUpdate: FC = () => {

  const { id } = useParams();
  //console.log('user id - ', id)
  const userDataIntialState = { userid: id, name: "", mobile: "", password: "" }
  const [updateData, SetUpdateData] = useState(userDataIntialState);
  const navigate = useNavigate();

  const callUserUpdateApi = async (data: any) => {
    //console.log('data-----------', data)
    const url = process.env.REACT_APP_API_URL + 'users/updateusers';
    const response = await axios.put(url, data);
    //console.log(response);
  }

  const getUserbyIdApi = async (id: any) => {
    // Needs to be changed
    const url = process.env.REACT_APP_API_URL + 'users/searchuser/' + id;
    const response = await axios.get(url);
    // console.log(response);
    return response.data;
  }

  useEffect(() => {
    (async () => {
      // To be used when api provided
      let data = await getUserbyIdApi(id);
      SetUpdateData(data[0]);
      //console.log(data);
    })();
  }, [])

  return (
    <div>
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>Update User Details</h4>
      <Formik
        enableReinitialize={true}
        initialValues={updateData}
        onSubmit={async (values) => {
          //console.log('values', values);
          if (_.isEqual(values, updateData)) {
            alert("No Updates made");
          }
          else {
            // eslint-disable-next-line no-restricted-globals
            var val = confirm("Sure you want to update data?");
            if (val === true) {
              await callUserUpdateApi(values);
              alert("Updated successfully");
              navigate('/userslist');
            } else {
              alert("Stopped Updating");

            }
          }
        }}
      >
        <div className='form-container'>
          <Form className='examAddForm'>
            <Field hidden type="number" name="userid"></Field>

            <div className='row'>
              <label htmlFor="name">Name :</label>
              <Field name="name" type="text" max="100" />
            </div>

            <div className='row'>
              <label htmlFor="mobile" >Mobile :</label>
              <Field name="mobile" type="text" />
            </div>


            <div className='row'>
              <label htmlFor="password">Password :</label>
              <Field name="password" type="password" />
            </div>

            <div className='row'>
              <button type="submit" className='btn btn-primary'>Update User</button>
            </div>
          </Form>
        </div>
      </Formik>
    </div>
  )
}

export default UserUpdate

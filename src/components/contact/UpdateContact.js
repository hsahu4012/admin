
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    
    name: "",
    email: "",
    mobile: "",
    address: "",
    subject: "",
    message: "",
    userid: "",
    resolvestatus: "",

    
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}contact/getById/${id}`)
      .then((res) => {
        console.log(res);
        
        let obj = {
          
          name: res.data[0].name,
          email: res.data[0].email,
          mobile: res.data[0].mobile,
          address: res.data[0].address,
          subject: res.data[0].subject,
          message: res.data[0].message,
          userid: res.data[0].userid,
          resolvestatus: res.data[0].resolvestatus,
        };
        setFormValues(obj);
        console.log(res.data[0]);
        
      })
      .catch((err) => console.log(err));
  }, [id]);


  const contactUpdate = async (values) => {
    try {
      // Check if form values are unchanged
      const isUnchanged = Object.keys(formValues).every(
        (key) => formValues[key] === values[key]
      );

      if (isUnchanged) {
        alert("No changes were made. Nothing to update.");
        return;
      }
      //after form values update
      const confirmed = window.confirm(
        "Are you sure you want to Update this contact?"
      );
      if (confirmed === true) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}contact/updateContact/${id}`,
          values
        );
        navigate("/ContactList");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("formValues", formValues);
  }, [formValues]);

  return (
    <>
      <h3 className="text-center mb-5">Contact Update</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={(values) => contactUpdate(values)}
      >
        <Form>
         
        <div className="row mb-2">
          <label className="col-4 my-2 text-center"> Name:-</label>
          <Field name="name" type="text" className="col-6" />
        </div>
        <div className="row mb-2">
          <label className="col-4 my-2 text-center">Email:-</label>
          <Field name="email" type="text" className="col-6" />
        </div>
        <div className="row mb-2">
          <label className="col-4 my-2 text-center">Mobile No:-</label>
          <Field name="mobile" type="text" className="col-6" />
        </div>
        <div className="row mb-2">
          <label className="col-4 my-2 text-center">Address:-</label>
          <Field name="address" type="text" className="col-6" />
        </div>
        <div className="row mb-2">
          <label className="col-4 my-2 text-center">Subject:-</label>
          <Field name="subject" type="text" className="col-6" />
        </div>
        <div className="row mb-2">
          <label className="col-4 my-2 text-center">Message:-</label>
          <Field name="message" type="text" className="col-6" />
        </div>
        <div className="row mb-2">
          <label className="col-4 my-2 text-center">User Id:-</label>
          <Field name="userid" type="text" className="col-6" />
        </div>
        <div className="row mb-2">
          <label className="col-4 my-2 text-center">Resolve Status:-</label>
          <Field name="resolvestatus" type="text" className="col-6" />
        </div>
          
          <div className="hey">
            <button type="submit">Submit</button>
            <Link to="/ContactList" className="btn btn-danger back">
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
 
};

export default UpdateContact;




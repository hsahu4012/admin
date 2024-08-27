
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SettingUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    // setting_id: "",
    setting_name: "",
    setting_value: "",
    
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}settings/settingbyid/${id}`)
      .then((res) => {
        console.log(res);
        
        let obj = {
          // setting_id: res.data[0].setting_id,
          setting_name: res.data[0].setting_name,
          setting_value: res.data[0].setting_value,
          
        };
        setFormValues(obj);
        console.log(res.data[0]);
        
      })
      .catch((err) => console.log(err));
  }, [id]);


  const settingUpdate = async (values) => {
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
        "Are you sure you want to Update this setting?"
      );
      if (confirmed === true) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}settings/updatesetting/${id}`,
          values
        );
        navigate("/settingslist");
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
      <h3 className="text-center mb-5">Setting Update</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={(values) => settingUpdate(values)}
      >
        <Form>
         
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Setting Name:-</label>
            <Field name="setting_name" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Setting Value:-</label>
            <Field name="setting_value" type="text" className="col-6" />
          </div>
          
          <div className="hey">
            <button type="submit">Submit</button>
            <Link to="/settingslist" className="btn btn-danger back">
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
 
};

export default SettingUpdate;




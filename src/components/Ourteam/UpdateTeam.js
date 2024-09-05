import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    designation: "",
    department: "",
    image: "",
    description: "",
  });

  const [image, setImage] = useState(null); 

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}ourteam/ourteambyid/${id}`)
      .then((res) => {
        let obj = {
          name: res.data[0].name,
          designation: res.data[0].designation,
          department: res.data[0].department,
          image: res.data[0].image,
          description: res.data[0].description,
        };
        setFormValues(obj);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const UpdateTeam = async (values) => {
    try {
      const isUnchanged = Object.keys(formValues).every(
        (key) => formValues[key] === values[key]
      );

      if (isUnchanged && !image) {
        alert("No changes were made. Nothing to update.");
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to update this member?"
      );
      if (confirmed) {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        if (image) {
          formData.append("image", image);
        }

        await axios.put(
          `${process.env.REACT_APP_API_URL}ourteam/updateourteam/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        navigate("/teamlist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3 className="text-center mb-5"> Update Team</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={(values) => UpdateTeam(values)}
      >
        <Form>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center"> Name:-</label>
            <Field name="name" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Designation:-</label>
            <Field name="designation" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Department:-</label>
            <Field name="department" type="text" className="col-6" />
          </div>

          <div className="row mb-2">
            <label className="col-4 my-2 text-center">current image:-</label>
            <img
                        src={`${process.env.REACT_APP_API_URL}${formValues.image}`}
                        alt={formValues.name}
                        className="img-fluid " style={{ height: "200px", width: "200px" }}
                        />
          </div>
         
          <div className="row mb-2">
            <label className="col-4 my-2 text-center"> New Image:-</label>
            <input
              name="image"
              type="file"
              className="col-6"
              onChange={handleFileChange}
            />
          </div>

          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Description:-</label>
            <Field name="description" type="text" className="col-6" />
          </div>

          <div className="hey">
            <button type="submit">Submit</button>
            <Link to="/teamlist" className="btn btn-danger back">
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateTeam;
import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import JoditEditor from 'jodit-react';

const UpdateDiscount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [desc,setDesc]=useState('');
  const [formValues, setFormValues] = useState({
    discountname: "",
    amount: "",
    percentage: "",
    maxdiscount: "",
    mincartvalue: "",
    maxcartvalue: "",
    image: "",
    count: "",
    isoffer: "",
    ishidden: "",
    description: "",
    startdate: "",
    enddate: "",
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(date.getTime() + istOffset);

    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, "0");
    const day = String(istDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}discount/discountbyid/${id}`)
      .then((res) => {
        let obj = {
          discountname: res.data[0].discountname,
          amount: res.data[0].amount,
          percentage: res.data[0].percentage,
          maxdiscount: res.data[0].maxdiscount,
          mincartvalue: res.data[0].mincartvalue,
          maxcartvalue: res.data[0].maxcartvalue,
          image: res.data[0].image,
          count: res.data[0].count,
          isoffer: res.data[0].isoffer,
          ishidden: res.data[0].ishidden,
          description: res.data[0].description,
          startdate: formatDate(res.data[0].startdate),
          enddate: formatDate(res.data[0].enddate),
        };

        setFormValues(obj);
        setDesc(obj.description);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const UpdateDiscount = async (values) => {
    try {
      const isUnchanged = Object.keys(formValues).every(
        (key) => formValues[key] === values[key]
      ) && desc === formValues.description;

      if (isUnchanged && !image) {
        alert("No changes were made. Nothing to update.");
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to update this discount?"
      );
      if (confirmed) {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        formData.set("description", desc);

        if (image) {
          formData.append("image", image);
        }

        await axios.put(
          `${process.env.REACT_APP_API_URL}discount/updatediscount/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        navigate("/discountlist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3 className="text-center mb-5"> Update Discount</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={(values) => UpdateDiscount(values)}
      >
        <Form>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Disc Name:</label>
            <Field name="discountname" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Amount:</label>
            <Field name="amount" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Percentage:</label>
            <Field name="percentage" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">maxdiscount:</label>
            <Field name="maxdiscount" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">mincartvalue:</label>
            <Field name="mincartvalue" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">maxcartvalue:</label>
            <Field name="maxcartvalue" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Image:-</label>
            <img
              src={`${process.env.REACT_APP_API_URL}${formValues.image}`}
              alt={formValues.discountname}
              className="img-fluid "
              style={{ height: "200px", width: "200px" }}
            />
          </div>

          <div className="row mb-2">
            <label className="col-4 my-2 text-center"> {"            "}</label>
            <input
              name="image"
              type="file"
              className="col-6"
              onChange={handleFileChange}
            />
          </div>

          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Count:</label>
            <Field name="count" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">isoffer:</label>
            <Field name="isoffer" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">ishidden:</label>
            <Field name="ishidden" type="text" className="col-6" />
          </div>

          <div className="row mb-2">
            <label className="col-4 my-2 text-center" required>Start Date:</label>
            <Field
              name="startdate"
              type="date"
              className="col-6"
              placeholder="dd-mm-yyyy"
            />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center" required>End Date:</label>
            <Field
              name="enddate"
              type="date"
              className="col-6"
              placeholder="dd-mm-yyyy"
            />
          </div>

          <div className="row mb-2">
              <label className="col-4 my-2 text-center">description:</label>
              <JoditEditor
              value={desc}
              onChange={(newContent) => setDesc(newContent)}
              />
            </div>

          <div className="hey">
            <button type="submit">Submit</button>
            <Link to="/discountlist" className="btn btn-danger back">
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateDiscount;

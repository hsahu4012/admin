import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateDiscount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    discountname: "",
    amount: "",
    percentage: "",
    image: "",
    count: "",
    startdate: "",
    enddate: "",
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);

  const istOffset = 5.5 * 60 * 60 * 1000; 
  const istDate = new Date(date.getTime() + istOffset);

  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, '0');
  const day = String(istDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
return formattedDate;
};
  const [image, setImage] = useState(null); 

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}discount/discountbyid/${id}`)
      .then((res) => {
        let obj={
          discountname: res.data[0].discountname,
          amount: res.data[0].amount,
          percentage: res.data[0].percentage,
          image: res.data[0].image,
          count: res.data[0].count,
          startdate: formatDate(res.data[0].startdate),
          enddate: formatDate(res.data[0].enddate),

        };
       
        setFormValues(obj);
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
      );

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
            <label className="col-4 my-2 text-center">current image:-</label>
            <img
                        src={`${process.env.REACT_APP_API_URL}${formValues.image}`}
                        alt={formValues.discountname}
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
              <label className="col-4 my-2 text-center">Count:</label>
              <Field name="count" type="text" className="col-6" />
            </div>
            <div className="row mb-2">
              <label className="col-4 my-2 text-center">Start Date:</label>
              <Field name="startdate" type="date" className="col-6" placeholder="dd-mm-yyyy" />
            </div>
            <div className="row mb-2">
              <label className="col-4 my-2 text-center">End Date:</label>
              <Field name="enddate" type="date" className="col-6" placeholder="dd-mm-yyyy" />
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


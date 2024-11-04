import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import JoditEditor from 'jodit-react';

  const AddDiscount = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [desc,setDesc]=useState('');
  const formValues = {
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

  };


  const submitDiscount = async (values) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to add a new discount?"
      );
      if (confirmed) {
        const formData = new FormData();
        formData.append("discountname", values.discountname);
        formData.append("amount", values.amount);
        formData.append("percentage", values.percentage);
        formData.append("maxdiscount", values.maxdiscount);
        formData.append("mincartvalue", values.mincartvalue);
        formData.append("maxcartvalue", values.maxcartvalue);
        formData.append("image", image);
        formData.append("count", values.count);
        formData.append("isoffer", values.isoffer);
        formData.append("ishidden", values.ishidden);
        formData.append("description", desc);
        formData.append("startdate", values.startdate);
        formData.append("enddate", values.enddate);
        console.log(values.startdate);

        await axios.post(
          `${process.env.REACT_APP_API_URL}discount/adddiscount`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate("/discountlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  


  return (
    <>
      <h3 className="text-center mb-5">Add new Discount</h3>
      <Formik
        initialValues={formValues}
        onSubmit={(values) => submitDiscount(values)}
      >
        {({ setFieldValue }) => (
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
              <label className="col-4 my-2 text-center">Image:</label>
              <input
                name="image"
                type="file"
                className="col-6"
                onChange={(event) =>{ setImage(event.target.files[0])}}
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
              <label className="col-4 my-2 text-center">Start Date:</label>
              <Field name="startdate" type="date" className="col-6" placeholder="dd-mm-yyyy"  />
            </div>
            <div className="row mb-2">
              <label className="col-4 my-2 text-center">End Date:</label>
              <Field name="enddate" type="date" className="col-6" placeholder="dd-mm-yyyy"  />
            </div>

            {/* <div className="row mb-2">
              <label className="col-4 my-2 text-center">description:</label>
              <Field name="description" type="text" className="col-6" />
            </div> */}

            <div className="row mb-2">
              <label className="col-4 my-2 text-center">description:</label>
              <JoditEditor
                value={desc}
                onChange={(newContent) => setDesc(newContent)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mx-2">
                Submit Now
              </button>
              <Link to="/discountlist" className="btn btn-danger">
                Back
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddDiscount;



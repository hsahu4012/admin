import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderDetailUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [FormValues, setFormValues] = useState({
    order_id: "",
    productid: "",
    quantity: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}orders/getById/${id}`)
      .then((res) => {
        console.log(res);
        let obj = {
          order_id: res.data[0].order_id,
          productid: res.data[0].productid,
          quantity: res.data[0].quantity,
        };
        setFormValues(obj);
        console.log(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // const handleFieldChange = (e) => {
  //   setFormValues(e.target.value);
  // };

  const UpdateOrderDetails = async (values) => {
    try {
      // Check if form values are unchanged
      const isUnchanged = Object.keys(FormValues).every(
        (key) => FormValues[key] === values[key]
      );

      if (isUnchanged) {
        alert("No changes were made. Nothing to update.");
        return;
      }
      //after form values update
      const confirmed = window.confirm(
        "Are you sure you want to Update this wishlist?"
      );
      if (confirmed === true) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}orders/updateOrderProductDetails/${id}`,
          values
        );
        navigate("/orderDetails");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("formValues", FormValues);
  }, [FormValues]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={FormValues}
        onSubmit={(values) => UpdateOrderDetails(values)}
      >
        <Form>
          <h2 className="text-center mb-5">WishList Update</h2>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Order_Id:-</label>
            <Field name="order_id" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">ProductId:-</label>
            <Field name="productid" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Quantity:-</label>
            <Field name="quantity" type="text" className="col-6" />
          </div>
          <div className="hey">
            <button type="submit">Submit Now</button>
            <Link to="/orderDetails" className="btn btn-danger back">
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default OrderDetailUpdate;

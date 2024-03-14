import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrdersUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    order_id: "",
    order_date: "",
    order_time: "",
    order_status: "",
    userid: "",
    paymentamount: "",
    paymentstatus: "",
    paymentmode: "",
    addressid: "",
    delivery_status: "",
    tracking_id: "",
    delivery_partner: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}order/getById/${id}`)
      .then((res) => {
        console.log(res);
        let obj = {
          order_id: res.data[0].order_id,
          order_date: res.data[0].order_date,
          order_time: res.data[0].order_time,
          order_status: res.data[0].order_status,
          userid: res.data[0].userid,
          paymentamount: res.data[0].paymentamount,
          paymentstatus: res.data[0].paymentstatus,
          paymentmode: res.data[0].paymentmode,
          addressid: res.data[0].addressid,
          delivery_status: res.data[0].delivery_status,
          tracking_id: res.data[0].tracking_id,
          delivery_partner: res.data[0].delivery_partner,
        };
        setFormValues(obj);
        console.log(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // const handleFieldChange = (e) => {
  //   setFormValues(e.target.value);
  // };

  const updateOrder = async (values) => {
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
        "Are you sure you want to Update this order?"
      );
      if (confirmed === true) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}order/updateOrder/${id}`,
          values
        );
        navigate("/orders");
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
      <h3 className="text-center mb-5">Order Update</h3>
      <Formik
        enableReinitialize={true}
        initialValues={formValues}
        onSubmit={(values) => updateOrder(values)}
      >
        <Form>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Order_Id:-</label>
            <Field name="order_id" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Order_Date:-</label>
            <Field name="order_date" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Order_Time:-</label>
            <Field name="order_time" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Order_Status:-</label>
            <Field name="order_status" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">UserId:-</label>
            <Field name="userid" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">PaymentAmount:-</label>
            <Field name="paymentamount" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">PaymentStatus:-</label>
            <Field name="paymentstatus" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">PaymentMode:-</label>
            <Field name="paymentmode" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">AddressId:-</label>
            <Field name="addressid" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Delivery_Status:-</label>
            <Field name="delivery_status" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Tracking_Id:-</label>
            <Field name="tracking_id" type="text" className="col-6" />
          </div>
          <div className="row mb-2">
            <label className="col-4 my-2 text-center">Delivery_Partner:-</label>
            <Field name="delivery_partner" type="text" className="col-6" />
          </div>
          <div className="hey">
            <button type="submit">Submit Now</button>
            <Link to="/orders" className="btn btn-danger back">
              Back
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default OrdersUpdate;

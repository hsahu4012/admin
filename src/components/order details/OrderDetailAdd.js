import React from "react";
import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetailAdd = () => {
  const navigate = useNavigate();
  const FormValues = {
    order_id: "",
    productid: "",
    quantity: "",
  };

  const submitOrder = async (values) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to Add New Order Detail???"
      );
      if (confirmed) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}orders/addToOrderProducts`,
          values
        );
        navigate("/orderDetails");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={FormValues}
        onSubmit={(values) => submitOrder(values)}
      >
        <Form>
          <h3 className="text-center mb-5">OrderDetail Add</h3>
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

export default OrderDetailAdd;

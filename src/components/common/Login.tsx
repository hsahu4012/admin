import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import loadImage from "../../images/giphy.gif";

import { DataAppContext } from "../../DataContext";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  // const [loginStatus, setLoginStatus] = useState(false);
  const localContext = useContext(DataAppContext);

  const navigate = useNavigate();

  const login = async (values: any) => {
    setLoader(true);
    // console.log("values", values);
    const url = process.env.REACT_APP_API_URL + "users/login";
    try {
      const response = await axios.post(url, values);
      // console.log(response.data);
      setLoader(false);

      const { token, userId, userType } = response.data;

      if (response.status === 202) {
        localStorage.setItem("jwttoken", token);
        localStorage.setItem("userid", userId);
        localStorage.setItem("usertype", userType);
        navigate("/brandlist");
        // setLoginStatus(true);
        localContext.login_user();

        // if (userType === 2) {
        //   navigate("/brandlist");
        // } else {
        //   navigate("/login");
        // }
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err: Error | any) {
      setLoader(false);
      console.error("Login failed:", error);
      if (err.response && err.response.status === 422) {
        setError("User not found. Please check your credentials.");
      } else if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else if (err.message === "Network Error") {
        setError("Network error occurred. Please try again later.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  // useEffect(() => {
  //   console.log("localContext in login page - ", localContext);
  // }, [localContext]);

  return (
    <>
      {/* {(window.location.pathname !== '/login') && 
            (<div className='row'>
                <div className='col-12 bg-success-subtle text-center'>
                    <Link className='btn btn-primary' onClick={() => props.setfn(false)}>Back to Register</Link>
                </div>
            </div>)} */}

      <div className="row maincontent">
        <div className="col-md-3 col-xs-12"></div>
        <div className="col-md-6 col-xs-12">
          {/* <h2 className='text-center'>Welcome to HashedBit Innovations</h2> */}
          <h2 className="text-center">LOG IN</h2>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => login(values)}
          >
            <Form className="login-form">
              <br></br>
              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Username</label>
                <div className="col-sm-7">
                  <Field
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-5 col-form-label">Password</label>
                <div className="col-sm-7">
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>
              </div>
              <br></br>
              <div className="form-group row">
                <div className="col-sm-7 offset-sm-5">
                  <button type="submit" className="btn btn-primary col-sm-12">
                    {loader ? "Logging In" : "Log In"}
                  </button>
                </div>
              </div>
              {/* <br></br>
              <p className="mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </p> */}
            </Form>
          </Formik>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
        {/* <div className="col-md-3 col-xs-12"></div>
        {loader && (
          <div className="loading">
            <img src={loadImage} alt="Loader" />
          </div>
          
        )} */}
      </div>
    </>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subcategoryadd = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "category/allCategory"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error in fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const initialFormValues = {
    subcategoryname: "",
    subcategory_id: "",
    category_id: "",
    sequence: "",
  };

  const addNewSubcategory = async (values) => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_API_URL + "subCategory/addSubCategory";
      const response = await axios.post(url, values);
      console.log(response.data);

      toast.success("Subcategory added successfully!");

      setLoading(false);
      return { error: false };
    } catch (error) {
      console.error("Error adding subcategory:", error);
      setLoading(false);
      return { error: true };
    }
  };

  return (
    <div>
      <h2>Add Subcategory</h2>
      <br />
      <br />
      <Formik
        initialValues={initialFormValues}
        onSubmit={async (values, { resetForm }) => {
          const { error } = await addNewSubcategory(values);
          if (!error) {
            resetForm();
          }
        }}
      >
        <div className="row">
          <Form className="examAddForm">
            <div className="row">
              <label htmlFor="name" className="col-4 my-2">
                Subcategory Name:
              </label>
              <Field
                name="subcategoryname"
                type="text"
                className="col-8"
                required
              />
            </div>
            <div className="row">
              <label htmlFor="name" className="col-4 my-2">
                Category ID:
              </label>
              <Field name="category_id" as="select" className="col-8" required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.categoryname}
                  </option>
                ))}
              </Field>
            </div>
            <div className="row">
              <label htmlFor="sequence" className="col-4 my-2">
                Sequence:
              </label>
              <Field name="sequence" type="number" className="col-8" required />
            </div>
            <div className="row">
              <div className="text-center my-4">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Subcategory"}
                </button>
              </div>
            </div>
            <br />
          </Form>
        </div>
      </Formik>

      <div className="row">
        <div className="text-center my-4">
          <Link to="/subcategorylist" className="btn btn-primary">
            Back to Subcategory List
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Subcategoryadd;

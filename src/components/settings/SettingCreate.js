import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SettingCreate = () => {

  const navigate = useNavigate();
  const formValues = {
    // setting_id: "",
    setting_name: "",
    setting_value: "",
   
  };

  const submitOrder = async (values) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to Add New setting???"
      );
      if (confirmed) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}settings/addsetting`,
          values
        );
        navigate("/settingslist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <h3 className="text-center mb-5">Setting Create</h3>
    <Formik
      enableReinitialize={true}
      initialValues={formValues}
      onSubmit={(values) => submitOrder(values)}
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

export default SettingCreate







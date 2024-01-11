import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import loaderimage from '../../images/giphy.gif';
const _ = require('lodash');


const QsEdit: FC = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  var QsDataInitialState = { subject_id: "", question: "", answer1: "", answer2: "", answer3: "", answer4: "", answer5: "", correctanswer: "" };
  const [updateData, setUpdateData] = useState(QsDataInitialState);

  const callApiQsEdit = async (values: any) => {
    setLoader(true);
    values.qs_id = id;
    const url = process.env.REACT_APP_API_URL + 'questions/editquestion/';
    const response = await axios.put(url, values);
    console.log(response);
    setLoader(false);
    navigate('/qslist');
  }
  const callApiQsDetails = async (value: any) => {
    const url = process.env.REACT_APP_API_URL + 'questions/searchquestion/' + value;
    const response = await axios.get(url, value);
    setUpdateData(response.data[0]);
    console.log(response);
  }

  useEffect(() => {
    (async () => {
      let data = await callApiQsDetails(id);
      // SetUpdateData(data);
    })();
  }, [])

  return (
    <>
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>Edit Question</h4>
      <Formik
        enableReinitialize={true}
        initialValues={updateData}
        // initialValues={{ subject_id: "", question: "", answer1: "",  answer2: "",  answer3: "",  answer4: "",  answer5: "",  correctanswer: "" }}
        onSubmit={async (values) => {
          // await new Promise((resolve) => setTimeout(resolve, 500));
          // alert(JSON.stringify(values, null, 2));
          // eslint-disable-next-line no-restricted-globals
          if (_.isEqual(values, updateData)) {
            alert("No Updates made");
          }
          else {
            // eslint-disable-next-line no-restricted-globals
            var val = confirm("Sure you want to update data?");
            if (val === true) {
              alert("Updated successfully");
            } else {
              alert("Stopped Updating");
            }
          }
          console.log(values);
          callApiQsEdit(values);
        }}
      >
        <div className='form-container'>
          <Form className='examAddForm'>
            {/* <label htmlFor="lastName">Subject:</label>
          <Field name="subject_id" as="select" className="my-select">
            <option value="1">Math</option>
            <option value="2">GK</option>
            <option value="3">History</option>
          </Field> */}

            <div className='row'>
              <label htmlFor="lastName">Question:</label>
              <Field name="question" type="text" />
            </div>

            <div className='row'>
              <label htmlFor="lastName">Answer 1:</label>
              <Field name="answer1" type="text" />
            </div>

            <div className='row'>
              <label htmlFor="lastName">Answer 2:</label>
              <Field name="answer2" type="text" />
            </div>

            <div className='row'>
              <label htmlFor="lastName">Answer 3:</label>
              <Field name="answer3" type="text" />
            </div>

            <div className='row'>
              <label htmlFor="lastName">Answer 4:</label>
              <Field name="answer4" type="text" />
            </div>

            {/* <label htmlFor="lastName">Answer 5:</label>
          <Field name="answer5" type="text" />
          <br></br> */}
            <div className='row'>
              <label htmlFor="lastName">Correct answer:</label>
              <Field name="correctanswer" type="number" min="1" max="5" />
            </div>

            <div className='row'>
              <button type="submit" className='btn btn-primary'>Update Question</button>
            </div>

            <br></br>
          </Form>
        </div>
      </Formik>

      {
        loader &&
        <div className='loader'>
          <img src={loaderimage} alt="Loader" />
        </div>
      }
    </>
  )
}

export default QsEdit


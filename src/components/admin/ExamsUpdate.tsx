import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import './ExamsAdd.css';

const _ = require('lodash');

const ExamsUpdate: FC = () => {
  const { examId } = useParams();
  console.log('exam id - ', examId);
  const examDataIntialState = {
    exam_id: examId,
    examname: '',
    duration: '',
    numOfQue: '',
    marksCorrect: '',
    marksIncorrect: '',
    launchdate: '',
    launchtime: '',
    endDate: '',
    endTime: '',
  };
  const [updateData, SetUpdateData] = useState(examDataIntialState);
  const navigate = useNavigate();
  const todayDate =
    new Date().toLocaleString('default', { year: 'numeric' }) +
    '-' +
    new Date().toLocaleString('default', { month: '2-digit' }) +
    '-' +
    new Date().toLocaleString('default', { day: '2-digit' });
  const todayTime =
    new Date().toLocaleTimeString('default', { hour: '2-digit' }) +
    ':' +
    new Date().toLocaleTimeString('default', { minute: '2-digit' });

  const callexamUpdateApi = async (data: any) => {
    // Needs to be changed
    const url = process.env.REACT_APP_API_URL + 'exams/updateexam';
    const response = await axios.put(url, data);
    console.log(response);
  };

  const getExambyIdApi = async (id: any) => {
    // Needs to be changed
    const url = process.env.REACT_APP_API_URL + 'exams/fetchexam/' + id;
    const response = await axios.get(url);
    // console.log(response);
    return response.data;
  };

  useEffect(() => {
    (async () => {
      // To be used when api provided
      let data = await getExambyIdApi(examId);
      let respData = data[0];
      respData['launchdate'] = respData?.launchdate?.split('T')[0];
      respData['endDate'] = respData?.endDate?.split('T')[0];
      SetUpdateData(data[0]);
      console.log(data);
    })();
    // To be removed after api values
    // let data = { examname: "Test Exam", duration: "30", numOfQue: "12",  marksCorrect: "3",  marksIncorrect: "1",  launchdate: "2023-12-06",  launchtime: "12:10",  endDate: "2023-12-06", endTime:"12:40" }

    // SetUpdateData(data);
    // console.log(updateData);
  }, []);

  return (
    <>
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>
        Update Exam Details
      </h4>
      {/* <p>Fields to be updated...</p> */}
      <Formik
        enableReinitialize={true}
        initialValues={updateData}
        onSubmit={async values => {
          // await new Promise((resolve) => setTimeout(resolve, 500));
          // alert(JSON.stringify(values, null, 2));
          console.log(values);
          if (_.isEqual(values, updateData)) {
            alert('No Updates made');
          } else {
            // eslint-disable-next-line no-restricted-globals
            var val = confirm('Sure you want to update data?');
            if (val === true) {
              // values['exam_id'] = examId;
              await callexamUpdateApi(values);
              alert('Updated successfully');
              navigate('/examslist');
            } else {
              alert('Stopped Updating');
            }
          }
        }}
      >
        <div className='form-container'>
          <Form className='examAddForm'>
            <Field hidden type='number' name='exam_id'></Field>

            <div className='row'>
              <label htmlFor='lastName'>Exam Name :</label>
              <Field name='examname' type='text' max='100' />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Duration(in minutes) :</label>
              <Field name='duration' type='number' />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Number of Questions :</label>
              <Field name='numOfQue' type='number' />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Marks for Correct Answer :</label>
              <Field name='marksCorrect' type='number' />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Marks for Incorrect Answer :</label>
              <Field name='marksIncorrect' type='number' />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Launch Date :</label>
              <Field name='launchdate' type='date' min={todayDate} />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Launch Time :</label>
              <Field name='launchtime' type='time' min={todayTime} />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>End Date :</label>
              <Field name='endDate' type='date' min={todayDate} />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>End Time :</label>
              <Field name='endTime' type='time' min={todayTime} />
            </div>

            <div className='row'>
              <button type='submit' className='btn btn-primary'>
                Update Exam
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default ExamsUpdate;

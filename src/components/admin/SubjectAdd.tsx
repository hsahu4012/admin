import React, { FC } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { First } from 'react-bootstrap/esm/PageItem';
import './SubjectAdd.css';

const SubjectAdd: FC = () => {
  const subjectDateIntialState = {
    subjectName: '',
    subjectID: '',
    subjectAuthorName: '',
    subjectUploadDate: '',
    subjectUploadTime: '',
  };
  const navigate = useNavigate();
  const todayDate =
    new Date().toLocaleDateString('default', { year: 'numeric' }) +
    '-' +
    new Date().toLocaleString('default', { month: '2-digit' }) +
    '-' +
    new Date().toLocaleString('default', { day: '2-digit' });
  const todayTime =
    new Date().toLocaleString('dafault', { hour: '2-digit' }) +
    ':' +
    new Date().toLocaleString('default', { minute: '2-digit' }) +
    ':' +
    new Date().toLocaleString('default', { second: '2-digit' });

  const callApiSubjectAdd = async (values: any) => {
    const url = process.env.REACT_APP_API_URL + 'subjects/createsubject';
    const response = await axios.post(url, values);
    console.log(response);
    navigate('/subjectslist');
  };

  return (
    <>
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>
        Create New Subject
      </h4>
      <Formik
        enableReinitialize={true}
        initialValues={subjectDateIntialState}
        onSubmit={async values => {
          console.log(values);
          callApiSubjectAdd(values);
          alert('Subject added successfully');
        }}
      >
        <div className='form-container'>
          <Form className='examAddForm'>
            <div className='row'>
              <label htmlFor='lastName'>Subject Name :</label>
              <Field name='subjectName' type='text' max='100' />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Subject I.D.</label>
              <Field name='subjectID' type='text' max='100' />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Author Name :</label>
              <Field name='subjectAuthorName' type='text' max='100' />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Launch Date :</label>
              <Field name='subjectUploadDate' type='date' min={todayDate} />
            </div>

            <div className='row'>
              <label htmlFor='lastName'>Launch Time :</label>
              <Field name='subjectUploadTime' type='time' min={todayTime} />
            </div>

            <div className='row'>
              <button type='submit' className='btn btn-primary'>
                Create new subject
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default SubjectAdd;

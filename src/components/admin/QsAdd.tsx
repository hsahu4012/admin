import React, { FC, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import loaderimage from '../../images/giphy.gif';

const QsAdd: FC = () => {
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const callApiQsAdd = async (values: any) => {
    setLoader(true);
    const url = process.env.REACT_APP_API_URL + 'questions/addquestion';
    const response = await axios.post(url, values);
    console.log(response);
    setLoader(false);
    alert('Question Added Successfully');
    navigate('/qslist');
  };

  return (
    <>
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>
        Create New Question
      </h4>
      <Formik
        initialValues={{
          subject_id: '',
          question: '',
          answer1: '',
          answer2: '',
          answer3: '',
          answer4: '',
          answer5: '',
          correctanswer: '',
        }}
        onSubmit={async values => {
          // await new Promise((resolve) => setTimeout(resolve, 500));
          // alert(JSON.stringify(values, null, 2));
          console.log(values);
          callApiQsAdd(values);
        }}
      >
        <div className='form-container'>
          <Form className='QsAdd-form'>
            <div className='row mb-2'>
              <div className='col-4'>
                <label htmlFor='lastName'>Subject:</label>
              </div>
              <div className='col-8'>
                <Field
                  name='subject_id'
                  as='select'
                  className='my-select'
                  disabled
                >
                  <option value='1'>--</option>
                  <option value='2'>--</option>
                  <option value='3'>--</option>
                </Field>
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-4'>
                <label htmlFor='lastName' className='col-4'>
                  Question:
                </label>
              </div>
              <div className='col-8'>
                <Field name='question' type='text' className='col-8' />
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-4'>
                <label htmlFor='lastName' className='col-4'>
                  Answer 1:
                </label>
              </div>
              <div className='col-8'>
                <Field name='answer1' type='text' className='col-8' />
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-4'>
                <label htmlFor='lastName' className='col-4'>
                  Answer 2:
                </label>
              </div>
              <div className='col-8'>
                <Field name='answer2' type='text' className='col-8' />
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-4'>
                <label htmlFor='lastName' className='col-4'>
                  Answer 3:
                </label>
              </div>
              <div className='col-8'>
                <Field name='answer3' type='text' className='col-8' />
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-4'>
                <label htmlFor='lastName' className='col-4'>
                  Answer 4:
                </label>
              </div>
              <div className='col-8'>
                <Field name='answer4' type='text' className='col-8' />
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-4'>
                <label htmlFor='lastName' className='col-4'>
                  Correct answer:
                </label>
              </div>
              <div className='col-8'>
                <Field
                  name='correctanswer'
                  type='number'
                  min='1'
                  max='5'
                  className='col-8'
                />
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-12'>
                <button type='submit' className='btn btn-primary'>
                  Add Question
                </button>
              </div>
            </div>

            <br></br>
          </Form>
        </div>
      </Formik>
      {loader && (
        <div className='loader'>
          <img src={loaderimage} alt='Loader' />
        </div>
      )}
    </>
  );
};

export default QsAdd;

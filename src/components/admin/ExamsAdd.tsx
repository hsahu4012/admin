import axios from 'axios';
import { Field, Form, Formik } from "formik";
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ExamsAdd.css';

const ExamsAdd: FC = () => {
  const examDataIntialState = { examname: "", duration: "", numOfQue: "", marksCorrect: "", marksIncorrect: "", launchdate: "", launchtime: "", endDate: "", endTime: "" }
  const navigate = useNavigate();
  const todayDate = new Date().toLocaleString('default', { year: 'numeric' }) + '-' + new Date().toLocaleString('default', { month: '2-digit' }) + '-' + new Date().toLocaleString('default', { day: '2-digit' });
  const todayTime = new Date().toLocaleTimeString('default', { hour: '2-digit' }) + ':' + new Date().toLocaleTimeString('default', { minute: '2-digit' });


  //adding subject api fetch
  const [subject, setSubject] = useState<any[]>([]);

  const callApiSubjectsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'subjects/readallsubject';
      const response = await axios.get(url);
      console.log(response);
      setSubject(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiSubjectsList();
  }, [])

  const callApiExamAdd = async (values: any) => {
    const url = process.env.REACT_APP_API_URL + 'exams/createexam';
    const response = await axios.post(url, values);
    console.log(response);
    navigate('/examslist')
  }

  return (
    <>
      <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>Create New Exam</h4>
      <div className='row'>
        <div className='col-xs-12 col-md-12'>
          <br></br>
          <Formik
            enableReinitialize={true}
            initialValues={examDataIntialState}
            onSubmit={async (values) => {
              // await new Promise((resolve) => setTimeout(resolve, 500));
              // alert(JSON.stringify(values, null, 2));
              console.log(values);
              callApiExamAdd(values);
              alert("Exam added successfully");
            }}
          >
            <div className='form-container'>
              <Form className='examAddForm'>
                <div className='row'>
                  <label htmlFor="lastName">Exam Name :</label>
                  <Field name="examname" type="text" max="100" />
                </div>

                <div className='row'>
                  <label htmlFor='lastname'>Subject Name :</label>
                  <Field name="subjectName" as="select" className="my-subject" >
                    {subject.map((subjects) => (
                      <option key={subjects.subject_id} value={subjects.subject_id}>
                        {subjects.subject_name}
                      </option>
                    ))}

                  </Field>
                </div>

                <div className='row'>
                  <label htmlFor="lastName" >Duration(in minutes) :</label>
                  <Field name="duration" type="number" />
                </div>

                <div className='row'>
                  <label htmlFor="lastName">Number of Questions :</label>
                  <Field name="numOfQue" type="number" />
                </div>

                <div className='row'>
                  <label htmlFor="lastName">Marks for Correct Answer :</label>
                  <Field name="marksCorrect" type="number" />
                </div>

                <div className='row'>
                  <label htmlFor="lastName">Marks for Incorrect Answer :</label>
                  <Field name="marksIncorrect" type="number" />
                </div>

                <div className='row'>
                  <label htmlFor="lastName">Launch Date :</label>
                  <Field name="launchdate" type="date" min={todayDate} />
                </div>

                <div className='row'>
                  <label htmlFor="lastName">Launch Time :</label>
                  <Field name="launchtime" type="time" min={todayTime} />
                </div>

                <div className='row'>
                  <label htmlFor="lastName">End Date :</label>
                  <Field name="endDate" type="date" min={todayDate} />
                </div>

                <div className='row'>
                  <label htmlFor="lastName">End Time :</label>
                  <Field name="endTime" type="time" min={todayTime} />
                </div>

                <div className='row'>
                  <button type="submit" className='btn btn-primary'>Create New Exam</button>
                </div>
              </Form>
            </div>
          </Formik>
        </div>
      </div>
    </>


  )
}

export default ExamsAdd

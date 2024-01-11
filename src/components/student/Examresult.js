import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Examresult = () => {
  const { examid } = useParams();
  // console.log(examid);

  const [examResult, setExamResult] = useState({});
  const userId = window.localStorage.getItem('userid');

  const callApiExamResult = async () => {
    try {
      let values = {};
      values.exam_id = examid;
      values.userid = userId;
      const url = process.env.REACT_APP_API_URL + 'exams/examresult';

      const response = await axios.post(url, values);
      console.log(response.data[0]);
      setExamResult(response.data[0]);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiExamResult();
  }, [])

  useEffect(() => {
    console.log('examList', examResult);
  })

  useEffect(() => () => {
    console.log("unmount and clear all time intervals");
    window.localStorage.removeItem('positivemarking')
    window.localStorage.removeItem('time_remaining')
    window.localStorage.removeItem('examname')
  }, []);

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <h2>Exam Result :-</h2>
          {
            examResult && (
              <>
                <table className='table table-responsive'>

                  <thead className="table-dark bg-danger bg-opacity-50">
                    <th colSpan={2}>{window.localStorage.getItem('examname')} Result</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Marks</td>
                      <td>{examResult.positive_marks - examResult.negative_marks} / {examResult.total_qs * examResult.positivemarking}</td>
                    </tr>
                    <tr>
                      <td>Total Num of Questions</td>
                      <td>{examResult.total_qs}</td>
                    </tr>
                    <tr>
                      <td>Total Answered</td>
                      <td>{examResult.attempted_qs}</td>
                    </tr>
                    <tr>
                      <td>Total Unanswered</td>
                      <td>{examResult.total_qs - examResult.attempted_qs}</td>
                    </tr>
                    <tr>
                      <td>Total Correct</td>
                      <td>{examResult.attempted_qs - examResult.incorrect_qs}</td>
                    </tr>
                    <tr>
                      <td>Total Incorrect</td>
                      <td>{examResult.incorrect_qs}</td>
                    </tr>
                  </tbody>

                </table>
              </>

            )
          }

        </div>
      </div>


      <div className="row">
        <div className="col-sm-6 col-lg-6">
          <Link to='/dashboard' className='link-success'>
            <div className="card text-white bg-flat-color-1">
              <div className="card-body">
                <div className="card-left pt-1 float-left">
                  <h3 className="mb-0 fw-r">
                    <span className="currency float-left mr-1">Dashboard</span>
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Examresult

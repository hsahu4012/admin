import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExamReview = () => {

  const { examid } = useParams();
  const navigate = useNavigate();
  //console.log(examid);

  const [examList, setExamList] = useState({});
  // const [qs, setQs] = useState({});
  const [qslist, setQslist] = useState([]);
  const [qsid, setQsid] = useState(0);
  const [attemptedNum, setAttemptedNum] = useState(0);
  const [tempansid, settempansid] = useState(0);
  const userId = window.localStorage.getItem('userid');

  const callApiQsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'exams/examreview';
      let obj = {};
      obj.exam_id = examid;
      obj.userid = window.localStorage.getItem('userid');

      const response = await axios.post(url, obj);
      console.log(response.data);
      let resp = response.data;
      resp.questions = resp.questions.split(',');
      resp.answers = resp.answers.split(',');
      //resp.correctanswers = [1, 2, 3, 2, 1, 2, 3];
      setExamList(resp);
    }
    catch (error) {
      console.log(error);
    }
  }

  const callApiQs = async (qsid) => {
    try {
      const url = process.env.REACT_APP_API_URL + 'questions/searchquestion/' + qsid;

      const response = await axios.get(url);
      //console.log(response.data[0]);
      //setQs(response.data[0]);
      let tempindex = examList.questions.indexOf(qsid);
      let obj = response.data[0];
      obj.answermarked = parseInt(examList.answers[tempindex]) || 0;
      obj.ansstatus = examList.answers[tempindex] > 0 ? true : false;
      obj.correctans = parseInt(examList.correctanswers[tempindex]);
      let tempqslist = [...qslist, response.data[0]];
      //tempqslist();
      //console.log('tempqslist', tempqslist)
      setQslist(tempqslist);
    }
    catch (error) {
      console.log(error);
    }
  }

  const gotoQsNum = (QsNum, qsid) => {
    //console.log('question number - ', QsNum);
    setQsid(qsid);
    //callApiQs(examList.questions[qsid]);
  }

  const prevFn = () => {
    setQsid(qsid => qsid - 1);
    //settempansid(0);
    //callApiQs(examList.questions[qsid]);
  }

  const nextFn = () => {
    setQsid(qsqsid => qsid + 1);
    //settempansid(0);
    //callApiQs(examList.questions[qsid]);
  }

  useEffect(() => {
    callApiQsList();
  }, [])

  useEffect(() => {
    console.log('examList', examList);
    //console.log('qs', qs);
    console.log('qslist', qslist);
    //console.log('qsid', qsid);
  }, [examList, qslist])

  useEffect(() => {
    examList.questions && callApiQs(examList.questions[0]);
  }, [examList])

  useEffect(() => {
    //call next qs
    (qslist.length && qslist.length < examList.questions.length) > 0 && callApiQs(examList.questions[qslist.length]);

    //update attempted answers count
    let arr = qslist.filter((item) => item.ansstatus);
    let count = arr.length;
    setAttemptedNum(count);
  }, [qslist])

  return (
    <>
      <div className='full-page'>
        <div className='row'>
          <div className='col-12 my-2 bg-success bg-opacity-10 py-2 text-center'>
            <h2 className='fw-bold'>Exam - {window.localStorage.getItem('examname')}</h2>
          </div>

          <div className='col-12 my-2 bg-success bg-opacity-10 py-2 text-center'>

            {
              examList && (
                <>
                  {/* <p>Exam ID - {examList.exam_id}</p>
                <p>User ID - {examList.userid}</p>
                <p>Exam Taken ID - {examList.exam_taken_id}</p> */}
                  {/* <p>Exam Duration - {examList.questions}</p>
                <p>No of questions - {examList.answers}</p> */}

                  {/* <p>Total Num of Questions - {examList.total_qs}</p> */}
                </>
              )
            }

          </div>

          {
            qslist.length > 0 && (
              <div className='row'>

                <div className='col-xs-12 col-md-4 bg-success bg-opacity-10 my-2 py-2 ps-4'>
                  <div className=''>
                    {qslist && qslist.map((item, index) => (
                      <button onClick={() => gotoQsNum(item, index)} className={item.ansstatus ? 'exam-palete-qs-marked' : 'exam-palete-qs'}>{index + 1}</button>
                    ))}
                    <br></br>
                    <div className='row px-2 py-2'>
                      {/* <div className='col-12'>Total Questions - {examList.total_qs}</div> */}
                      <div className='col-6 bg-success bg-opacity-10 text-center'>Attempted <br></br>{attemptedNum}</div>
                      <div className='col-6 bg-warning bg-opacity-10 text-center'>Unattempted <br></br>{examList.total_qs - attemptedNum}</div>
                    </div>

                    <div className='row px-2 py-2'>
                      <div className='col-6 text-center' style={{background: 'rgba(25, 135, 84, .25)'}}>Correct Answer</div>
                      <div className='col-6 text-center' style={{background: 'rgba(255, 193, 7, 0.25)'}}>Your Answer</div>
                    </div>
                  </div>
                </div>


                <div className='col-xs-12 col-md-8 bg-success bg-opacity-10 my-2 py-2 ps-4'>
                  <div className='qs-panel'>
                    Q{qsid + 1}. {qslist[qsid].question}
                  </div>
                  <div className={(qslist[qsid].correctans === 1) ? 'ans-panel-active' : 'ans-panel'}>
                    <div className={(qslist[qsid].answermarked === 1) ? 'ans-panel-span-active' : 'ans-panel-span'}>1)  {qslist[qsid].answer1}</div>
                  </div>
                  <div className={(qslist[qsid].correctans === 2) ? 'ans-panel-active' : 'ans-panel'}>
                    <div className={(qslist[qsid].answermarked === 2) ? 'ans-panel-span-active' : 'ans-panel-span'}>2)  {qslist[qsid].answer2}</div>
                  </div>
                  <div className={(qslist[qsid].correctans === 3) ? 'ans-panel-active' : 'ans-panel'}>
                    <div className={(qslist[qsid].answermarked === 3) ? 'ans-panel-span-active' : 'ans-panel-span'}>3)  {qslist[qsid].answer3}</div>
                  </div>
                  <div className={(qslist[qsid].correctans === 4) ? 'ans-panel-active' : 'ans-panel'}>
                    <div className={(qslist[qsid].answermarked === 4) ? 'ans-panel-span-active' : 'ans-panel-span'}>4)  {qslist[qsid].answer4}</div>
                  </div>

                  <div>{
                    (qslist[qsid].answermarked > 0) && 
                   ( (qslist[qsid].correctans === qslist[qsid].answermarked) ? (
                    <div class="alert alert-success" role="alert">
                      Your answer was correct.
                    </div>
                    ) : (
                    <div class="alert alert-danger" role="alert">
                      Your answer was incorrect.
                    </div>
                    ))}
                  </div>

                  <div className='text-center'>
                    {
                      (qsid > 0) && <button onClick={prevFn} className='btn btn-outline-warning mx-1 my-1'>Prev</button>
                    }

                    {
                      (qsid < examList.questions.length - 1) && <button onClick={nextFn} className='btn btn-outline-warning mx-1 my-1'>Next</button>
                    }

                  </div>
                </div>


              </div>
            )
          }

        </div>

        <div className='row'>
          <div className='col-12 my-4 text-center'>
            <Link to='/dashboard' className='btn btn-outline-primary'>Go To Dashboard</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExamReview

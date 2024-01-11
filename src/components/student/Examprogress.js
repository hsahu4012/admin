import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

let timer;

const Examprogress = () => {

  const { examid } = useParams();
  const navigate = useNavigate();
  //console.log(examid);

  const [examList, setExamList] = useState({});
  // const [qs, setQs] = useState({});
  const [qslist, setQslist] = useState([]);
  const [qsid, setQsid] = useState(0);
  const [attemptedNum, setAttemptedNum] = useState(0);
  const [tempansid, settempansid] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0)
  const userId = window.localStorage.getItem('userid');

  const callApiQsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'exams/startexam';
      let obj = {};
      obj.exam_id = examid;
      obj.userid = window.localStorage.getItem('userid');

      const response = await axios.post(url, obj);
      //console.log(response.data[0]);
      let resp = response.data[0];
      resp.questions = resp.questions.split(',');
      resp.answers = resp.answers.split(',');
      resp.questionCollection = [];
      setExamList(resp);
      let tempstructure = {
        ansstatus: false,
        answer1: "sample answer aa",
        answer2: "sample answer bb",
        answer3: "sample answer cc",
        answer4: "sample answer dd",
        qs_id: 17,
        question: "sample question"
      }
      let arr = new Array(resp.questions.length).fill(tempstructure);
      setQslist(arr);
    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchAllQs = async () => {
    try {
      let values = {
        qslist: examList.questions
      }
      const url = process.env.REACT_APP_API_URL + 'questions/fetchquestionsbyid';
      const response = await axios.post(url, values);
      console.log('fetchAllQs', response.data);

      for (const tempqs of response.data) {
        
        let tempindex = examList.questions.indexOf(tempqs.qs_id.toString());
        console.log(tempindex, tempqs.qs_id);
        let obj = tempqs;
        obj.answermarked = parseInt(examList.answers[tempindex]) || 0;
        obj.ansstatus = examList.answers[tempindex] > 0 ? true : false;
        let tempqslist = qslist;
        tempqslist[tempindex] = obj;
        console.log('tempqslistfinal', tempqslist);
        let tempqslistfinal = [...tempqslist];
        setQslist(tempqslistfinal);
      }

      // let tempindex = examList.questions.indexOf(qsid);
      // let obj = response.data[0];
      // obj.answermarked = parseInt(examList.answers[tempindex]) || 0;
      // obj.ansstatus = examList.answers[tempindex] > 0 ? true : false;
      // let tempqslist = [...qslist, response.data[0]];
      // setQslist(tempqslist);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllQs();
  }, [examList])

  const startTimer = () => {
    //console.log('time at start - ', examList.time_remaining)
    if (examList.time_remaining > 0) {
      window.localStorage.setItem('time_remaining', examList.time_remaining);
      setTimeRemaining(examList.time_remaining)
      timer = setInterval(async () => {
        //console.log('time update.')
        let lastTime = window.localStorage.getItem('time_remaining');
        window.localStorage.setItem('time_remaining', lastTime - 1);
        setTimeRemaining(lastTime - 1)

        //call time update api
        let values = {};
        values.exam_id = examid;
        values.userid = userId;
        values.timeremaining = lastTime - 1;

        //console.log('Values for update exam', values);

        if (values.timeremaining === 0) {
          submitExam();
        }
        else if (values.timeremaining > 0) {
          try {
            const url = process.env.REACT_APP_API_URL + 'exams/timeupdateexam';
            const response = await axios.post(url, values);
            //console.log('Response from time update exam - ', response.data);
            //setQslist(tempqslist);
          }
          catch (error) { console.log(error); }
        }

      }, 60000)
    }
  }

  const callApiQs = async (qsid) => {
    try {
      // const url = process.env.REACT_APP_API_URL + 'questions/searchquestion/' + qsid;
      // const response = await axios.get(url);
      // let tempindex = examList.questions.indexOf(qsid);
      // let obj = response.data[0];
      // obj.answermarked = parseInt(examList.answers[tempindex]) || 0;
      // obj.ansstatus = examList.answers[tempindex] > 0 ? true : false;
      // let tempqslist = [...qslist, response.data[0]];
      //console.log('tempqslist', tempqslist)
      //setQslist(tempqslist);
    }
    catch (error) {
      console.log(error);
    }
  }

  // const callApiAll = () => {
  //   for (let i = 1; i < examList.questions.length; i++) {
  //     callApiQs(examList.questions[i]);
  //   }
  // }

  const submitExam = async () => {
    //console.log('exam submit api and navigate to result page');
    //submit exam api call
    let values = {};
    values.exam_id = examid;
    values.userid = userId;

    //console.log('Values for update exam', values);

    try {
      const url = process.env.REACT_APP_API_URL + 'exams/submitexam';
      const response = await axios.post(url, values);
      //console.log('Response from update exam - ', response.data);
      navigate('/examresult/' + examid);
    }
    catch (error) {
      console.log(error);
      console.log('Your are answers are already saved. You can directly close the exam.')
    }
  }

  const gotoQsNum = (QsNum, qsid) => {
    //console.log('question number - ', QsNum);
    setQsid(qsid);
    settempansid(0);
  }

  const prevFn = () => {
    setQsid(qsid => qsid - 1);
    settempansid(0);
  }

  const nextFn = () => {
    setQsid(qsqsid => qsid + 1);
    settempansid(0);
  }

  const submitAnsFn = async () => {
    //console.log('current qs num - ', qsid);
    //console.log('current qs - ', qslist[qsid].question, qslist[qsid].qs_id);
    //console.log('current answer marked - ', tempansid);

    //call mark answer api
    let values = {};
    values.exam_id = examid;
    values.userid = userId;
    values.qs_id = qslist[qsid].qs_id;
    values.answer = tempansid;
    values.timeremaining = timeRemaining;

    //console.log('Values for update exam', values);

    try {
      const url = process.env.REACT_APP_API_URL + 'exams/updateexam';
      const response = await axios.post(url, values);
      //console.log('Response from update exam - ', response.data);
      //setQslist(tempqslist);
    }
    catch (error) { console.log(error); }

    let tempqslist = qslist;
    tempqslist[qsid] = { ...tempqslist[qsid], ansstatus: tempansid && true, answermarked: tempansid };
    //console.log(tempqslist);
    setQslist([...tempqslist]);
  }

  const clearResponse = async () => {

    settempansid(0);
    //call mark answer api
    let values = {};
    values.exam_id = examid;
    values.userid = userId;
    values.qs_id = qslist[qsid].qs_id;
    values.answer = 0;
    values.timeremaining = timeRemaining;

    try {
      const url = process.env.REACT_APP_API_URL + 'exams/updateexam';
      const response = await axios.post(url, values);
    }
    catch (error) { console.log(error); }

    let tempqslist = qslist;
    tempqslist[qsid] = { ...tempqslist[qsid], ansstatus: false, answermarked: 0 };
    setQslist([...tempqslist]);
  }

  useEffect(() => {
    callApiQsList();
  }, [])

  useEffect(() => {
    startTimer();
  }, [examList])

  useEffect(() => {
    //console.log('examList', examList);
    //console.log('qs', qs);
    console.log('qslist', qslist);
    //console.log('qsid', qsid);
  }, [examList, qslist])

  // useEffect(() => {
  //   examList.questions && callApiQs(examList.questions[0]);
  // }, [examList])

  useEffect(() => {
    //call next qs
    (qslist.length && qslist.length < examList.questions.length) > 0 && callApiQs(examList.questions[qslist.length]);

    //update attempted answers count
    let arr = qslist.filter((item) => item.ansstatus);
    let count = arr.length;
    setAttemptedNum(count);
  }, [qslist])

  useEffect(() => () => {
    console.log("unmount and clear all time intervals");
    window.localStorage.setItem('time_remaining', 0)
    clearInterval(timer);
  }, []);

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
                  <span className='fw-bold'>Time Remaining - {timeRemaining}</span>
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
                      <div className='col-6 bg-success bg-opacity-25 text-center'>Attempted <br></br>{attemptedNum}</div>
                      <div className='col-6 bg-warning bg-opacity-25 text-center'>Unattempted <br></br>{examList.total_qs - attemptedNum}</div>
                    </div>
                    <div className='row px-2 py-2'>
                      <div className='col-6 text-center' style={{background: 'rgba(25, 135, 84, .25)'}}>Answer Marked</div>
                      <div className='col-6 text-center' style={{background: 'rgba(255, 193, 7, 0.25)'}}>Your Answer</div>
                    </div>
                  </div>
                </div>


                <div className='col-xs-12 col-md-8 bg-success bg-opacity-10 my-2 py-2 ps-4'>
                  <div className='qs-panel bg-success bg-opacity-25'>
                    Q{qsid + 1}. {qslist[qsid].question}
                  </div>
                  <div className={(qslist[qsid].answermarked === 1) ? 'ans-panel-active' : 'ans-panel'} onClick={() => settempansid(1)}>
                    <div className={(tempansid === 1) ? 'ans-panel-span-active' : 'ans-panel-span'}>1)  {qslist[qsid].answer1}</div>
                  </div>
                  <div className={(qslist[qsid].answermarked === 2) ? 'ans-panel-active' : 'ans-panel'} onClick={() => settempansid(2)}>
                    <div className={(tempansid === 2) ? 'ans-panel-span-active' : 'ans-panel-span'}>2)  {qslist[qsid].answer2}</div>
                  </div>
                  <div className={(qslist[qsid].answermarked === 3) ? 'ans-panel-active' : 'ans-panel'} onClick={() => settempansid(3)}>
                    <div className={(tempansid === 3) ? 'ans-panel-span-active' : 'ans-panel-span'}>3)  {qslist[qsid].answer3}</div>
                  </div>
                  <div className={(qslist[qsid].answermarked === 4) ? 'ans-panel-active' : 'ans-panel'} onClick={() => settempansid(4)}>
                    <div className={(tempansid === 4) ? 'ans-panel-span-active' : 'ans-panel-span'}>4)  {qslist[qsid].answer4}</div>
                  </div>
                  <div className='text-center'>
                    {
                      (qsid > 0) && <button onClick={prevFn} className='btn btn-outline-warning mx-1 my-1'>Prev</button>
                    }

                    <button onClick={submitAnsFn} className='btn btn-outline-success mx-1 my-1'>Submit Answer</button>
                    <button onClick={clearResponse} className='btn btn-outline-danger mx-1 my-1'>Clear Response</button>
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
            <button onClick={submitExam} className='btn btn-outline-primary'>Submit Exam</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Examprogress

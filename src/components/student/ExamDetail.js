import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
const ExamDetail = () => {
  const { examid } = useParams();
  const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeclarationChange = () => {
    setIsDeclarationChecked(!isDeclarationChecked);
  };
  console.log(examid);

  const [examList, setExamList] = useState({});
  const userId = window.localStorage.getItem('userid');

  const callApiQsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'exams/fetchexam/' + examid;

      const response = await axios.get(url);
      console.log(response.data[0]);
      setExamList(response.data[0]);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiQsList();
  }, [])

  useEffect(() => {
    window.localStorage.setItem('examname', examList.examname);
    window.localStorage.setItem('positivemarking', examList.marksCorrect);
  }, [examList])

  useEffect(() => {
    console.log('examList', examList);
  })

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-center'>
          <h2>{examList.examname}</h2>
          <br></br>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h5>Exam ID: {examList.exam_id}</h5>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <h5 style={{ marginLeft: '10px' }}>Exam Duration: {examList.duration}</h5>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <h5 className="mb-2" style={{ fontWeight: 'bold', color: 'black', marginTop: '20px' }}>Read the following instructions carefully:-</h5>
          {examList && (
            <ol style={{ listStyleType: 'decimal', marginLeft: '1.5em' }}>
              <li>Make sure you have good internet connection.</li>
              <li>Read all questions carefully before answering.</li>
              <li>Total No of questions are {examList.numOfQue}.</li>
              <li>All the questions in this quiz are Multiple-answer type.Each questions has 1 correct answer out of 4 choices offered.</li>
              <li>You will be awarded {examList.marksCorrect} for each correct answer and {examList.marksIncorrect} will be deducted for each wrong answer.</li>
              <li>There is no negative marking for the questions that you have not attempted.</li>
              <li>Make sure that you complete the exam within the specified duration.</li>
              <li>You can write this test only once. Make sure that you complete the test before you submit the test or close the browser.</li>
              <li>Do not refresh the page or right click while taking the exam. Your exam data will be lost.</li>
              <li>If your exam closes due to any reason, you can restart from the same.</li>
              <li>Answers will be automatically saved on submitting the answer.</li>
              <li>Way of Answer Submission - Click on correct answer and Click on Submit Answer button.</li>
            </ol>
          )
          }
          <p><strong style={{ color: 'red' }}>Note:</strong> All restrictions on the availablity of this quiz have been bypass for this preview. Before you submit the quiz, you will have the opportunity to return to question that may have missed or have not yet answered.Once the allocated time period that was set for this quiz expires, you are required to submit your quiz responses.</p>
        </div>

        <div className='row'>
          <div className='col-12' style={{ border: '1px solid #ccc', padding: '8px', display: 'flex', flexDirection: 'column' }}>
            {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                           <label htmlFor='languageSelect' style={{ marginRight: '10px' , marginBottom: '10px'}}>Choose your default Language:</label>
                           <select className='form-control' id='languageSelect' style={{ width: 'auto', marginBottom: '10px' }}>
                             <option value='english'>English</option>
                             <option value='spanish'>Hindi</option>
                           </select>
                       </div> */}

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div className='form-check'>
                <input type='checkbox' className='form-check-input' id='declarationCheck' checked={isDeclarationChecked}
                  onChange={handleDeclarationChange} />
                <label className='form-check-label' htmlFor='declarationCheck'>I declare that I have read all the instructions carefully and understood them. I agree not to cheat or use unfair means in this examination.</label>
              </div>
            </div>
          </div>
        </div>
        <p className="text-primary">Click "Proceed to Start Exam" to beign</p>
        <div className=' col-12 d-flex justify-content-center align-items-center'>

          {isDeclarationChecked ? (
            <Link to={`/examprogress/${examid}`}>
              <button className="btn btn-primary">Proceed to Start Exam</button>
            </Link>
          ) : (
            <button className="btn btn-secondary" onClick={() => setIsModalVisible(true)}>
              Proceed to Start Exam</button>
          )}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
      <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please check the declaration before proceeding.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsModalVisible(false)} >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ExamDetail

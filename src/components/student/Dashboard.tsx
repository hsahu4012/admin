import React, { useState, useEffect } from 'react';
import SecureHeader from '../shared/SecureHeader';
import SecureLeftPanel from '../shared/SecureLeftPanel';
import SecureFooter from '../shared/SecureFooter';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaBuffer, FaAlignJustify, FaBook, FaCalendarAlt } from "react-icons/fa";
import { Modal, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

type Notice = {
  notice_name: string;
  start_date: string;
  end_date: string;
  notice_id: any;
  status: number;
  notice_desc: string;
};
const Dashboard = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + 'notice/allnotices');
        const allNotices = response.data;
        const activeNotices = allNotices.filter((notice: Notice) => notice.status === 1);
        const sortedNotices = [...activeNotices].sort(
          (a: any, b: any) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );

        setNotices(sortedNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const openNoticeModal = (notice: Notice) => {
    setSelectedNotice(notice);
    setShowModal(true);
  };

  const closeNoticeModal = () => {
    setShowModal(false);
  };



  // const [examList, setExamList] = useState<any[]>([]);

  // const callApiQsList = async () => {
  //   try{
  //     const url = process.env.REACT_APP_API_URL + 'exams/fetchallexams';

  //     const response  = await axios.get(url);
  //     console.log(response);
  //     setExamList(response.data);
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   callApiQsList();
  // }, [])

  // const startExam = () => {

  // }

  return (
    <>


      <div className="row">
        <div className="col-sm-6 col-lg-6">
          <Link to='/examlist' className='link-success'>
            <div className="card text-white bg-flat-color-1">
              <div className="card-body">
                <div className="card-left pt-1 float-left">
                  <h3 className="mb-0 fw-r">
                    <span className="currency float-left mr-1">Upcoming Exams</span>
                  </h3>
                  <br></br><br></br>
                  <p className="text-light mt-1 m-0">Exams to be attempted</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-lg-6">
          <Link to='/examtaken' className='link-danger'>
            <div className="card text-white bg-flat-color-6">
              <div className="card-body">
                <div className="card-left pt-1 float-left">
                  <h3 className="mb-0 fw-r">
                    <span className="count float-left">Exams Taken</span>
                  </h3>
                  <br></br><br></br>
                  <p className="text-light mt-1 m-0">Exams already attempted</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* <div className="col-sm-6 col-lg-3">
          <Link to='/leaderboard' className='link-danger'>
            <div className="card text-white bg-flat-color-3">
              <div className="card-body">
                <div className="card-left pt-1 float-left">
                  <h3 className="mb-0 fw-r">
                    <span className="count">Leaderboard</span>
                  </h3>
                  <br></br>
                  <p className="text-light mt-1 m-0">Coming Soon...</p>
                </div>

                <div className="card-right float-right text-right">
                  <FaBuffer />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Link to='/quiz' className='link-danger'>
            <div className="card text-white bg-flat-color-2">
              <div className="card-body">
                <div className="card-left pt-1 float-left">
                  <h3 className="mb-0 fw-r">
                    <span className="count">Quiz</span>
                  </h3>
                  <br></br>
                  <p className="text-light mt-1 m-0">Coming Soon...</p>
                </div>

                <div className="card-right float-right text-right">
                  <FaCalendarAlt />
                </div>
              </div>
            </div>
          </Link>
        </div> */}
      </div>
      {/* <table className='table table-striped'>
            <thead>
            <tr>
              <th>Sr No</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {
              examList && examList.map((item, index) => (
                
                <tr>
                  <td>{index}</td>
                  <td>{item.exam_name}</td>
                  <td>{item.duration}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.subject_id}</td>
                  <td>
                    <button onClick={startExam} className='btn btn-primary'>Start Exam</button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table> */}
      <Row>
        <Col xs={12} md={12}>
          <div className="card">
            <h2 className='px-3 py-3'>Available Notices</h2>
            <div className="notice-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <ListGroup>
              {notices.map((notice) => (
                  <ListGroup.Item key={notice.notice_id}>
                    <p style={{ color: 'black'}}>
                      {notice.notice_name} 
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => openNoticeModal(notice)}
                    >
                      View Notice
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
        </Col>
      </Row>

      
      <Modal show={showModal} onHide={closeNoticeModal}>
        <Modal.Header>
          <Modal.Title>{selectedNotice?.notice_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Start Date: {selectedNotice?.start_date && new Date(selectedNotice.start_date).toDateString()}
          </h6>
          <h6>
            End Date: {selectedNotice?.end_date && new Date(selectedNotice.end_date).toDateString()}
          </h6>
          <p style={{ color: 'black'}}>
            Notice: {selectedNotice?.notice_desc}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeNoticeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Dashboard

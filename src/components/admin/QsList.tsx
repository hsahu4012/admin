import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loaderimage from '../../images/giphy.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from "react-bootstrap";

const notifydata:any = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}
const notify = () => toast.success("Question deleted Successfully!", notifydata);
const notifyErr = () => toast.error("Question not deleted!", notifydata);


const QsList: FC = () => {
  const [qsList, setqsList] = useState<any[]>([]);
  const [loader, setLoader] = useState(false);

  const callApiQsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'questions/getquestions';

      const response = await axios.get(url);
      console.log(response);
      setqsList(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiQsList();
  }, [])

  const qsdelete = async (id: any) => {
    // eslint-disable-next-line no-restricted-globals
    //var val = confirm("Sure you want to delete question?");
   // if (val === true) {
      //delete question api
      setLoader(true);
      const url = process.env.REACT_APP_API_URL + 'questions/removequestion/' + id;
      const response = await axios.delete(url);
      console.log(response);
      setLoader(false);
      notify();
    //} else {
    //  notifyErr();
   // }
    console.log('delete qs');
    callApiQsList();
  }

  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    notifyErr();
  };
  const handleClickDelete = (id:any) => {
    setDeleteId(id);
    setShow(true);
  };
  const handleDeleteItem = () => {
    qsdelete(deleteId);
    setShow(false);
  };

  return (
    <>

<br></br>
      <Link to="/qsadd" className='btn btn-primary'>Add New Question</Link>
      <Link to="/Bulkqsadd" className='btn btn-primary mx-2'>Bulk Import New Question</Link>
      <br></br>
      <div className='table-responsive'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Questions</th>
            <th>Answer1</th>
            <th>Answer2</th>
            <th>Answer3</th>
            <th>Answer4</th>
            <th>Correct Answer</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            qsList && qsList.map((item, index) => (

              <tr>
                <td>{index+1}</td>
                <td>{item.question}</td>
                <td>{item.answer1}</td>
                <td>{item.answer2}</td>
                <td>{item.answer3}</td>
                <td>{item.answer4}</td>
                {/* <td>{item.answer5}</td> */}
                <td>{item.correctanswer}</td>
                <td>
                  <Link to={`/qsedit/${item.qs_id}`} className='btn btn-primary'>Edit</Link>
                </td>
                <td>
                  {/* <Link to={`/qsedit/${item.qs_id}`} className='btn btn-warning'>Edit</Link> */}
                  <button onClick={() => handleClickDelete(item.qs_id)} className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sure you want to delete question ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteItem}>
            OK
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
      
      {
        loader &&
        <div className='loader'>
          <img src={loaderimage} alt="Loader" />
        </div>
      }
    </>
  )
}

export default QsList

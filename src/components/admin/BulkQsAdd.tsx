import React, { FC, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as xlsx from 'xlsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
const notify = () => toast.success("Question Added Successfully!", notifydata);

const notifyremove = () => toast.success("Question Removed from Incoming list!", notifydata);

const BulkQsAdd: FC = () => {
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const [uploadedQs, setUploadedQs] = useState([] as any);

  const callApiQsAdd = async (values: any) => {
    //setLoader(true);
    const url = process.env.REACT_APP_API_URL + 'questions/addquestion';
    const response = await axios.post(url, values);
    //console.log(response);
    setLoader(false);
    let temp = [...uploadedQs, values.question];
    setUploadedQs(temp);
    notify();
  }

  const [excelData, setExcelData] = useState([] as any);
  const [excelFilterData, setExcelFilterData] = useState([] as any);
  const readExcel = async (e: any) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer(file);
    const excelfile = xlsx.read(data);
    const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelsheet);
    //console.log(exceljson);
    setExcelData(exceljson);
  }

  useEffect(() => {
    let temp: any = [];
    temp = excelFilterData.filter((item: any) => {
      return (uploadedQs.indexOf(item.Questions) < 0)
    })
    setExcelFilterData(temp);
  }, [uploadedQs])

  useEffect(() => {
    setExcelFilterData(excelData);
  }, [excelData])

  const removeQs = async (values: any) => {
    let temp = [...uploadedQs, values.question];
    setUploadedQs(temp);
    notifyremove();
  }

  return (
    <React.Fragment>
      <Container className="content">
        <div className="row fthight">
          <div className="col-md-4 ">
            <h3 className='mt-3'>Import Questions</h3>
            <label className="form-label">File </label>
            <input type="file" className="form-control" onChange={(e) => readExcel(e)} />
          </div>

          <div className="col-md-12 mt-3">
            {excelFilterData.length > 1 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>SR#</th>
                    <th>Questions</th>
                    <th>Answer1</th>
                    <th>Answer2</th>
                    <th>Answer3</th>
                    <th>Answer4</th>
                    <th>Correct Answer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    excelFilterData && excelFilterData.map((getdata: any, index: any) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{getdata.Questions} </td>
                        <td>{getdata.Answer1} </td>
                        <td>{getdata.Answer2} </td>
                        <td>{getdata.Answer3} </td>
                        <td>{getdata.Answer4} </td>
                        <td>{getdata.Answer} </td>

                        <td><button onClick={(e: any) => callApiQsAdd(
                          {
                            subject_id: "", question: getdata.Questions, answer1: getdata.Answer1, answer2: getdata.Answer2, answer3: getdata.Answer3,
                            answer4: getdata.Answer4, answer5: "", correctanswer: getdata.Answer
                          })} type='button' className='btn btn-success'>Add</button>
                          <button className='btn btn-danger' onClick={(e: any) => removeQs(
                            {
                              subject_id: "", question: getdata.Questions
                            })} type='button'>Remove</button> </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )
            }
            <ToastContainer />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default BulkQsAdd

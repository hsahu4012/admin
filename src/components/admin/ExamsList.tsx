import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Examslist.css';

const ExamsList: FC = () => {
  const [examList, setExamList] = useState<any[]>([]);

  const callApiExamsList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'exams/fetchallexams';
      const response = await axios.get(url);
      console.log(response);
      setExamList(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    callApiExamsList();
  }, [])


  const deleteExam = async (id: any) => {
    // eslint-disable-next-line no-restricted-globals
    var val = confirm("Sure you want to delete exam?");
    if (val === true) {
      const url = process.env.REACT_APP_API_URL + 'exams/removeexam/' + id;
      const response = await axios.delete(url);
      console.log(response);
      alert("Exam deleted");
    } else {
      alert("Exam not Deleted");
    }
    callApiExamsList();
  }

  return (
    <>
      <br></br>
      <Link to="/examsadd" className='btn btn-primary'>Create New Exam</Link>
      <br></br>
      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Exam ID</th>
              <th>Exam Name</th>
              <th>Duration</th>
              <th>Num Qs</th>
              <th>+ Marks</th>
              <th>- Marks</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              examList && examList.map((item, index) => (

                <tr key={index + item.exam_id}>
                  <td>{index + 1}</td>
                  <td>{item.exam_id}</td>
                  <td>{item.exam_name}</td>
                  <td>{item.duration}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.positivemarking}</td>
                  <td>{item.negativemarking}</td>
                  <td>{item?.startdate?.split('T')[0]}</td>
                  <td>{item?.enddate?.split('T')[0]}</td>
                  <td>
                    <Link to={`/examsupdate/${item.exam_id}`} className='btn btn-warning'>Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => deleteExam(item.exam_id)} className='btn btn-primary'>Delete Exam</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <br></br>

    </>
  )
}

export default ExamsList

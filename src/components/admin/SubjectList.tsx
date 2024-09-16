import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SubjectList.css';
import { url } from 'inspector';
//import { preProcessFile } from 'typescript';

const SubjectList: FC = () => {
  const [subjectList, setSubjectList] = useState<any[]>([]);

  const callApiSubjectList = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + 'subjects/readallsubject';
      const response = await axios.get(url);
      console.log(response);
      setSubjectList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callApiSubjectList();
  }, []);

  const deleteSubject = async (id: any) => {
    var val = window.confirm('Sure you want to delete exam?');
    if (val == true) {
      const url =
        process.env.REACT_APP_API_URL + 'subjects/removesubject/' + id;
      const response = await axios.delete(url);
      console.log(response);
      alert('Subject deleted');
    } else {
      alert('Subject is not deleted');
    }
    callApiSubjectList();
  };
  return (
    <>
      <br></br>
      <Link to='/subjectadd' className='btn btn-primary'>
        Create New Subject
      </Link>
      <br></br>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Subject ID</th>
            <th>Subject Name</th>
            {/* <th>Subject Add Date</th>
                        <th>Subject Remove Date</th> */}
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjectList &&
            subjectList.map((item, index) => (
              <tr key={index + item.subject_id}>
                <td>{index + 1}</td>
                <td>{item.subject_id}</td>
                <td>{item.subject_name}</td>
                {/* <td>{item?.startdate?.split('T')[0]}</td>
                                <td>{item?.enddate?.split('T')[0]}</td> */}
                <td>
                  <Link
                    to={`/subjectedit/${item.subject_id}`}
                    className='btn btn-warning'
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => deleteSubject(item.subject_id)}
                    className='btn btn-primary'
                  >
                    Delete Subject
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br></br>
    </>
  );
};

export default SubjectList;

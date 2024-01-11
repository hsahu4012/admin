import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExamTaken = () => {

    const [examList, setExamList] = useState<any[]>([]);
    const userId = window.localStorage.getItem('userid');

    const callApiQsList = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + 'exams/examtaken/' + userId;

            const response = await axios.get(url);
            console.log(response);
            setExamList(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        callApiQsList();
    }, [])

    return (
        <>
            <div>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Exam ID</th>
                            <th>Exam Name</th>
                            {/* <th>Answer 2</th>
                        <th>Answer 3</th>
                        <th>Answer 4</th>
                        <th>Answer 5</th>
                        <th>Correct Answer</th> */}
                            <th>--</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            examList && examList.map((item, index) => (

                                <tr key={index + item.exam_id}>
                                    <td>{index + 1}</td>
                                    <td>{item.exam_id}</td>
                                    <td>{item.exam_name}</td>
                                    {/* <td>{item.subject_id}</td> */}
                                    <td>{item.date}</td>
                                    {/* <td>{item.time}</td>
                                <td>{item.duration}</td>
                                <td>{item.total_questions}</td>
                                <td>{item.negativemarking}</td> */}
                                    {/* <td>
                    <Link to={`/qsedit/${item.qs_id}`} className='btn btn-warning'>Edit</Link>
                  </td> */}
                                    <td>
                                        <Link to={`/examresult/${item.exam_id}`} className='btn btn-success'>View Result</Link>
                                    
                                        <Link to={`/examreview/${item.exam_id}`} className='btn btn-success'>Review Exam</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="row">
                <div className="col-sm-12 col-lg-12">
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

export default ExamTaken

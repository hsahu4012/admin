
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Examlist = () => {
    const [examList, setExamList] = useState<any[]>([]);
    const userId = window.localStorage.getItem('userid');

    useEffect(() => {
        const callApiQsList = async () => {
            try {
                const url = process.env.REACT_APP_API_URL + 'exams/upcomingexams/' + userId;
                const response = await axios.get(url);
                console.log(response);
                setExamList(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        callApiQsList();
    }, []);

    const currentDateTime = new Date();

    return (
      <>
        <div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Exam ID</th>
                        <th>Exam Name</th>
                        <th>Duration</th>
                        <th>Num Qs</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {examList && examList.map((item, index) => (
                        <tr key={index + item.exam_id}>
                            <td>{index}</td>
                            <td>{item.exam_id}</td>
                            <td>{item.exam_name}</td>
                            <td>{item.duration}</td>
                            <td>{item.total_questions}</td>
                            <td>{item?.startdate?.split('T')[0].split('-')[2]}-{item?.startdate?.split('T')[0].split('-')[1]}-{item?.startdate?.split('T')[0].split('-')[0]}</td>
                            <td>{item?.enddate?.split('T')[0].split('-')[2]}-{item?.enddate?.split('T')[0].split('-')[1]}-{item?.enddate?.split('T')[0].split('-')[0]}</td>
                            <td>
                                <Link
                                    to={`/examdetail/${item.exam_id}`}
                                    className={`btn btn-primary ${currentDateTime < new Date(item.startdate) || currentDateTime > new Date(item.enddate) ? 'disabled' : ''}`}
                                >
                                    Start Exam
                                </Link>
                            </td>
                        </tr>
                    ))}
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
    );
}

export default Examlist;


import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import './SubjectAdd.css';

const _ = require('lodash');

const SubjectUpdate: FC = () => {
    const { id } = useParams();
    console.log('subject id - ', id);
    const subjectDataIntialState = { subject_id: id, subjectname: "", subjectUpdateDate: "", subjectUpdateTime: "" }
    const [updateData, SetUpdateData] = useState(subjectDataIntialState);
    const navigate = useNavigate();
    const todayDate = new Date().toLocaleString('default', { year: 'numeric' }) + '-' + new Date().toLocaleString('default', { month: '2-digit' }) + '-' + new Date().toLocaleString('default', { day: '2-digit' });
    const todayTime = new Date().toLocaleTimeString('default', { hour: '2-digit' }) + ':' + new Date().toLocaleTimeString('default', { minute: '2-digit' }) + ':' + new Date().toLocaleTimeString('default', { second: '2-digit' });

    const callsubejctupdateApi = async (date: any) => {
        const url = process.env.REACT_APP_API_URL + 'subjects/updatesubject';
        const response = await axios.put(url);
        console.log(response);
    }
    const getSubjectbyIdApi = async (id: any) => {
        const url = process.env.REACT_APP_API_URL + 'subjects/subject/' + id;
        const response = await axios.get(url);
        // console.log(response);
        return response.data;
    }
    useEffect(() => {
        (async () => {
            let data = await getSubjectbyIdApi(id);
            let respData = data[0];
            respData['subjectUpdateDate'] = respData?.subjectUpdateDate?.split('T')[0];
            respData['endDate'] = respData?.endDate?.split('T')[0]
            SetUpdateData(data[0]);
            console.log(data);
        })();
    }, []);

    return (
        <>
            <h4 className='bg-info bg-opacity-25 text-center py-2 mb-3'>Update subject details</h4>
            <Formik
                enableReinitialize={true}
                initialValues={updateData}
                onSubmit={async (values) => {
                    console.log(values);
                    if (_.isEqual(values, updateData)) {
                        alert("No update made");
                    } else {
                        //eslint-disable-next-line no-restricted-globals
                        var val = confirm("Sure you want to update data?");
                        if (val === true) {
                            await callsubejctupdateApi(values);
                            alert("Update successfully");
                            navigate('/subjectslist');
                        } else {
                            alert("Stopped updating");
                        }
                    }
                }}
            >
                <div className="form-container">
                    <Form className="examAddForm">
                        <div className='row'>
                            <label htmlFor="lastName">Subject Name :</label>
                            <Field name="subjectName" type="text" max="100" />
                        </div>

                        <div className='row'>
                            <label htmlFor="lastName">Subject I.D.</label>
                            <Field name="subjectID" type="text" max="100" />
                        </div>

                        <div className='row'>
                            <label htmlFor="lastName">Author Name :</label>
                            <Field name="subjectAuthorName" type="text" max="100" />
                        </div>

                        <div className='row'>
                            <label htmlFor="lastName">Subject Update date :</label>
                            <Field name="subjectUploadDate" type="date" min={todayDate} />
                        </div>

                        <div className='row'>
                            <label htmlFor="lastName">Subject Update Time :</label>
                            <Field name="subjectUploadTime" type="time" min={todayTime} />
                        </div>

                        <div className='row'>
                            <button type="submit" className='btn btn-primary'>Create new subject</button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </>
    )
}
export default SubjectUpdate
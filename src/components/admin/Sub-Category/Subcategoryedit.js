import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, Form } from "formik";

const Subcategoryedit = () => {
    const { subcategoryid } = useParams();
    const [subcategory, setSubcategory] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const navigate = useNavigate();

    const fetchSubcategoryById = async (subcategoryid) => {
        try {
            const url = process.env.REACT_APP_API_URL + 'subCategory/subCategoryById/' + subcategoryid;
            const response = await axios.get(url);
            console.log('fetchSubcategoryById', response.data);
            const subcategoryData = response.data[0];
            let obj = {
                subcategoryname: subcategoryData.subcategoryname,
                subcategoryimage: subcategoryData.subcategoryimage || '',
            };
            setSubcategory(obj);
            setImageName(subcategoryData.subcategoryimage || '');
        } catch (error) {
            console.log(error);
        }
    };

    const editNewSubcategory = async (values, subcategoryid) => {
        try {
            const url = process.env.REACT_APP_API_URL + 'subcategory/updateSubCategory/' + subcategoryid;
            const formData = new FormData();
            formData.append('subcategoryname', values.subcategoryname);
            if (imageFile) {
                formData.append('image', imageFile);
            }
            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if (response.status === 200) {
                navigate('/subcategorylist');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSubcategoryById(subcategoryid);
    }, [subcategoryid]);

    return (
        <div>
            <h2>Subcategory Edit</h2>
            <Formik
                enableReinitialize={true}
                initialValues={subcategory}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        await editNewSubcategory(values, subcategoryid);
                        resetForm();
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                {({ setFieldValue }) => (
                    <div className='row'>
                        <Form className='examAddForm'>
                            <div className='row'>
                                <label htmlFor="subcategoryname" className='col-4 my-2'>Subcategory Name:</label>
                                <Field name="subcategoryname" type="text" className='col-8' required />
                            </div>

                            <div className='row'>
                                
                                <div className='col-8'>
                                    <label htmlFor="image" className='col-4 my-2'>Image</label>
                                    <input
                                        name="image"
                                        type="file"
                                        className='col-12'
                                        onChange={(e) => {
                                            setFieldValue('image', e.target.files[0]);
                                            setImageFile(e.target.files[0]);
                                            setImageName(e.target.files[0].name);
                                        }}
                                    />
                                    {imageName && (
                                        <span className='file-name'>{imageName}</span>
                                    )}
                                </div>
                            </div>

                            <div className='row'>
                                <div className='text-center my-4'>
                                    <button type="submit" className='btn btn-success'>Edit Subcategory</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>

            <div className='row'>
                <div className='text-center my-4'>
                    <Link to="/subcategorylist" className='btn btn-primary'>Back to Subcategory List</Link>
                </div>
            </div>
        </div>
    );
};

export default Subcategoryedit;

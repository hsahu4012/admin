import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subcategorylist = () => {
    const [subcategory, setSubcategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingSubcategoryId, setDeletingSubcategoryId] = useState(null);

    const fetchSubcategorylist = async () => {
        setLoading(true);
        try {
            const url = process.env.REACT_APP_API_URL + 'subCategory/allSubCategory';
            const response = await axios.get(url);
            console.log(response.data);
            setSubcategory(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteSubcategory = async (subcategoryid) => {
        try {
            setDeletingSubcategoryId(subcategoryid);
            const url = process.env.REACT_APP_API_URL + 'subCategory/romoveSubCategory/' + subcategoryid;
            await axios.put(url);
            await new Promise(res => setTimeout(res, 1000)); 
            toast.success('Subcategory deleted successfully!');
            await fetchSubcategorylist();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete subcategory.');
        } finally {
            setDeletingSubcategoryId(null);
        }
    };

    useEffect(() => {
        fetchSubcategorylist();
    }, []);

    return (
        <div>
            <ToastContainer />
            <h2>Subcategory List</h2>
            <br />
            <Link to='/subcategoryadd' className='btn btn-primary'>Create New Subcategory</Link>
            <table className='table table-responsive'>
                <thead>
                    <tr>
                        <th>Sq</th>
                        <th>Subcategory ID</th>
                        <th>Subcategory Name</th>
                        <th>Category_id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4" className="text-center">Loading...</td>
                        </tr>
                    ) : (
                        subcategory && subcategory.map((temp) => (
                            <tr key={temp.subcategory_id}>
                                <td>{temp.sequence}</td>
                                <td>{temp.subcategory_id}</td>
                                <td>{temp.subcategoryname}</td>
                                <td>{temp.category_id}</td>
                                
                                <td>
                                    <Link to={`/subcategoryview/${temp.subcategory_id}`} className='btn btn-success'>View</Link>
                                    &nbsp;
                                    <Link to={`/subcategoryedit/${temp.subcategory_id}`} className='btn btn-warning'>Edit</Link>
                                    &nbsp;
                                    <button 
                                        onClick={() => deleteSubcategory(temp.subcategory_id)} 
                                        className='btn btn-danger'
                                        style={{ minWidth: '75px' }} 
                                        disabled={deletingSubcategoryId === temp.subcategory_id}
                                    >
                                        {deletingSubcategoryId === temp.subcategory_id ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Subcategorylist;

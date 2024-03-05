    import React, { useState,useEffect } from 'react';
    import axios from 'axios';
    import { Link } from 'react-router-dom';
    const Subcategorylist = () => {
        const[subcategory, setSubcategory] = useState([]);
        
        const fetchSubcategorylist = async () => {
            try {
                const url = process.env.REACT_APP_API_URL + 'subCategory/allSubCategory';
                const response = await axios.get(url);
                console.log(response.data);
                setSubcategory(response.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        const deleteSubcategory = async (subcategoryid) => {
            try {             
                const confirmed = window.confirm("Are you sure you want to delete this subcategory?");              
                if (!confirmed) {                
                    return;
                }             
                const url = process.env.REACT_APP_API_URL + 'subCategory/romoveSubCategory/' + subcategoryid;            
                const response = await axios.put(url);
                console.log(response);
                fetchSubcategorylist();
            } catch (error) {
                console.log(error);
            }
        }
        

        useEffect(() => {
            fetchSubcategorylist();
        }, [])

    return (
    <div>
        <h2>Subcategory List</h2>
    <br />
        <Link to='/subcategoryadd' className='btn btn-primary'>Create New Subcategory</Link>
                <table className='table table-responsive'>
                    <thead>
                        <tr>
                            
                            <th>Subcategory ID</th>
                            <th>Subcategory Name</th>
                            <th>Category_id</th>
                            <th>Actions</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subcategory && subcategory.map((temp, index) => (
                                <tr>
                                    {/* <td>{index + 1}</td> */}
                                    <td>{temp.subcategory_id}</td>
                                    <td>{temp.subcategoryname}</td>
                                    <td>{temp.category_id}</td>
                                    <td>
                                    <Link to={`/subcategoryview/${temp.subcategory_id}`} className='btn btn-success'>View</Link>
                                    &nbsp;
                                    <Link to={`/subcategoryedit/${temp.subcategory_id}`} className='btn btn-warning'>Edit</Link>
                                    &nbsp;
                                    <button onClick={() => deleteSubcategory(temp.subcategory_id)} className='btn btn-danger'>Delete</button>
                                        </td>
                                
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )


    }
    export default Subcategorylist;
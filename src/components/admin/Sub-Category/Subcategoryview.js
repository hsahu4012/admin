import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Subcategoryview = () => {
    const temp = useParams();
    console.log(temp.subcategory_id);
    const [subcategory, setSubcategory] = useState();
    let { subcategoryid} = useParams();
    console.log(subcategoryid);
    const fetchSubcategoryById = async(subcategoryid) => {
        try {
            
            const url = process.env.REACT_APP_API_URL + 'subCategory/subCategoryById/' + subcategoryid;
            
            const response = await axios.get(url);
            
            setSubcategory(response.data[0].subcategoryname);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSubcategoryById(subcategoryid);
    }, [])
    return (
        <div>
            <h2>Subcategory View</h2>
  <br />
  <br />
            <div>Subcategory Name - {subcategory}</div>
       


            <div className='row'>
                            <div className='text-center my-4'>
                                <Link to="/subcategorylist" className='btn btn-primary'>Back to Subcategory List</Link>
                            </div>
                        </div>

        </div>
    )
}

export default Subcategoryview

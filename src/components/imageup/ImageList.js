import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageList = () => {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}images`);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    // upload api call
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadStatus('Image uploaded successfully');
            fetchImages(); // Refresh the list
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('Upload failed.');
        }
    };

    // remove api call
    const handleRemove = async (imageName) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}images/${imageName}`);
            fetchImages(); // Refresh the list
        } catch (error) {
            console.error('Error removing image:', error);
        }
    };

    return (
        <div>
            <h2>Image List</h2>
            <div>
            <br />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} className='btn btn-primary'>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
            <br />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((image, index) => (
                        <tr key={index}>
                            <td>
                                {index+1}
                            </td>
                            <td>
                                {image}
                            </td>
                            <td>
                                {/* <img src={`${process.env.REACT_APP_API_URL}images/${image}`} alt={image} width="100" /> */}
                                <img src={`${process.env.REACT_APP_API_URL}uploads/${image}`} alt={image} width="200" />
                            </td>
                            <td>
                                <button onClick={() => handleRemove(image)} className='btn btn-danger'>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ImageList;

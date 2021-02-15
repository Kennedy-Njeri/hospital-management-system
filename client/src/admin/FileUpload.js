import React, { useState, useEffect } from 'react';
import axios from "axios";



const FileUpload = () => {

    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post(` http://localhost:8000/upload`, formData, config)

            setImage(data)
            console.log(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    
    
    return (
        <>
            
                <label htmlFor="exampleFormControlFile1">Upload Photo</label>
                <input type="file" value={image}
                       onChange={(e) => setImage(e.target.value)} className="form-control-file" id="exampleFormControlFile1"/>
                {uploading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                <button className="invisible" onSubmit={uploadFileHandler}>Submit</button>
         
        </>
    )
    
    
}





export default FileUpload
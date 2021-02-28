import React, { useState } from 'react';
import axios from "axios";
import Layout from "../core/Layout";




const FileUpload = ({ history }) => {


    const [uploading, setUploading] = useState(false)
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('uploadfile', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            await axios.post(` http://localhost:8000/uploadfile`, formData, config)


            setUploading(false)
            history.push("/list-vendors")
           
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
    
    
    return (
        <Layout title="Category test Form">

            <div className="form-group col-md-4">

                <label htmlFor="exampleFormControlFile1">Upload vendor Excel</label>
                <input type="file" onChange={uploadFileHandler} className="form-control-file" id="exampleFormControlFile1"/>
                {uploading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}


            </div>
            
        </Layout>
    )
    
    
}





export default FileUpload
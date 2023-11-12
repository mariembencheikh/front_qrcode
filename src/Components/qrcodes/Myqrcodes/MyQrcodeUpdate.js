import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from "../../sidebar/sidebar";
import axios from "axios";

import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
 const MyQrcodeUpdate = () => {
    const navigate = useNavigate();   

    const { token } = useAuth();
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data"

        },
      };
    console.log('token in update ',token);
    const { id } = useParams();
    const [restaurant,setRestaurant] = useState('');
    const [logo, setLogo] = useState(null);
    const [file,setFile] = useState(null);

    //const [currentInfo, setCurrentInfo] = useState({ restaurant: '', logo: '' , pdfFile:''});

    useEffect(() => {
        const fetchCurrentInfo = async () => {
          try {
            const response = await axios.get(`http://localhost:5002/api/qrcodes/qrcodes/${id}`,config);
            const currentData = response.data;
            
            setRestaurant(currentData.qrcodeMenu.restaurant);
            setLogo(currentData.qrcode.logo);
            setFile(currentData.qrcodeMenu.file);
            console.log("responseeeeeeee",response);

          } catch (error) {
            console.error(error);
          }

        };
        
        fetchCurrentInfo();
      }, [id]
      );
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedData = {
            qrcode: {
             
              logo, 
            },
            qrcodeMenu: {
              restaurant,
              file
            },
        };
        console.log("updatedData",updatedData);
        try {
          // Send a PUT request to update the QR code information
          const response = await axios.put(`http://localhost:5002/api/qrcodes/qrcodes/${id}`,  updatedData,config);
            console.log(response.data);
            navigate('/myqrcodes');
        } catch (error) {
          console.error(error);
        }
      };
 
    return (
        <div className="list">
        <Sidebar />
        <div className="qrcode-list">
        <h2>Update your Menu book qr code</h2>
            <form  onSubmit={handleSubmit}>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Type</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" disabled value="Menu Book"/>
                </div>
            </div>
            <div class="form-group row">
                <label  class="col-sm-2 col-form-label">Restaurant </label>
                <div class="col-sm-10">
                    <input 
                    type="text" 
                    class="form-control"  
                    name="restaurant" 
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}  
                    placeholder="Restaurant" 
                    required />
                </div>
            </div>
            <div class="form-group row">
                <label  class="col-sm-2 col-form-label">Logo</label>
                <div class="col-sm-10">
                    <input 
                    type="file" 
                    name="logo" 
                    onChange={(e) => setLogo(e.target.files[0])}  
                    class="form-control" 
                    required />
                </div>
            </div>

            
            <div class="form-group row">
            
                <label  class="col-sm-2 col-form-label">File of Menu book </label>
                <div class="col-sm-10">
                    <input 
                    type="file" 
                    name="pdfFile"  
                    onChange={(e) => setFile(e.target.files[0])}  
                    class="form-control"  
                    required />
                </div>
            </div>
            
            
           
            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary" >Save</button>
                </div>
            </div>
        </form>
        </div>
        </div>
    )
}

export default MyQrcodeUpdate

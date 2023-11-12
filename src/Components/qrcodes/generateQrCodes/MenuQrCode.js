import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from "../../sidebar/sidebar";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const MenuQrCode = () => {
    const { token } = useAuth();
    const type = "menu";
    const [restaurant,setRestaurant] = useState('');
    const [logo,setLogo] = useState(null);
    const [pdfFile,setFile] = useState(null);
   
    const navigate = useNavigate();   

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formData = new FormData();
          formData.append("type", "menu");
          formData.append("restaurant", restaurant);
          formData.append("logo", logo);
          formData.append("pdfFile", pdfFile);
          console.log(formData);
          const response = await axios.post('http://localhost:5002/api/generateqrcodes/generate', {type,restaurant,logo,pdfFile}, {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            },
          });
          console.log("data: ",response.data);
          navigate('/myqrcodes');

        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="list">
        <Sidebar />
        <div className="qrcode-list">
        <h2>Create your Menu book qr code</h2>
            <form onSubmit={handleSubmit} >
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
                    <button type="submit" class="btn btn-primary" >Create</button>
                </div>
            </div>
        </form>
        </div>
        </div>
    )
}
export default MenuQrCode;
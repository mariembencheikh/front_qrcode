import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import moment from 'moment';
import axios from "axios";
import Sidebar from "../../sidebar/sidebar";
import './MyQrcodes.css';
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";
const MyQrcodes = () => {
  const { token } = useAuth();

  const [qrcodeDetails, setQRCodes] = useState([]);
  const getFileNameFromPath = (filePath) => {
    const parts = filePath.split('\\');
    const fileName = parts[parts.length - 1];
    return fileName;
  };


  useEffect(() => {
    if (token) {
      // Fetch QR codes using the token
      const fetchQrCodes = async () => {

        try {
          const qrCodesResponse = await axios.get('http://localhost:5002/api/qrcodes/qrcodes', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setQRCodes(qrCodesResponse.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchQrCodes();
    }

    console.log(token);

  }
    , []
  );


  const handleDelete = async (qrcodeId) => {
    const confirmation = window.confirm('Are you sure you want to delete this item?'); 
    if (confirmation){
      try {
        const response = await axios.delete(`http://localhost:5002/api/qrcodes/qrcodes/${qrcodeId}`);
        setQRCodes((prevQRCodes) => prevQRCodes.filter((qrcode) => qrcode._id !== qrcodeId));
        console.log("qr code deleted");
        window.location.reload();
  
      } catch (error) {
        console.error(error);
      }
    }
    
  };
  

  return (
    <div className="list">
      <Sidebar />

      <div className="qrcode-list">

        <h2>Your QR Codes</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Restaurant</th>
              <th>Code</th>
              <th>Logo</th>
              <th>File</th>
              <th>Date Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {qrcodeDetails.map(({ qrcode, qrcodeMenu }) => (
              <tr key={qrcode._id}>
                <td>{qrcode.type}</td>
                <td>{qrcodeMenu.restaurant}</td>
                <td><img src={qrcode.code}   width="100" height="100"/></td>
             
                <td><img src={`http://localhost:5002/${qrcode.logo}`}    width="100" height="100"/> </td>
                <td><a href={`http://localhost:5002/${qrcodeMenu.file}`} target="_blank">See the PDF</a></td>
                
                <td>{moment(qrcode.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                <td >
                  <div class="d-grid gap-2 d-md-block">
                    <Link to={`/updateMyQrcode/${qrcode._id}`} className="btn btn-success">
                      Update
                    </Link>&nbsp;
                    <button type="button" onClick={() => handleDelete(qrcode._id)} class="btn btn-danger">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>





      </div>
    </div>
  );
};

export default MyQrcodes;
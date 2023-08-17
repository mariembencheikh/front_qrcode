import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../sidebar/sidebar";
import './MyQrcodes.css';
import { useAuth } from "../../contexts/authContext";
const MyQrcodes = () => {
  const { token } = useAuth();

    const [qrcodeDetails, setQRCodes] = useState([]);
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
    , []);

    return (
        <div className="list">
          <Sidebar />
    
          <div className="qrcode-list">
            <h2>Your QR Codes</h2>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>type</th>
                  <th>Code</th>
                  <th>Logo</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
              {qrcodeDetails.map(({ qrcode }) => (
                  <tr key={qrcode._id}>
                    <td>{qrcode._id}</td>
                    <td>{qrcode.type}</td>
                    <img src={qrcode.code}/>                    
                    <td>{qrcode.logo}</td>
                    <td>{qrcode.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

export default MyQrcodes;
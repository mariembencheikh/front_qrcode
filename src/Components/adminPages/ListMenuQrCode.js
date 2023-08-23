import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import Sidebar from "../sidebar/sidebar";


const ListMenuQrCode = () =>{
    const { token } = useAuth();

    const [qrcodeDetails, setQRCodes] = useState([]);
    useEffect(() => {
          if (token) {
        // Fetch QR codes using the token
        const fetchQrCodes = async () => {
         
          try {
            const qrCodesResponse = await axios.get('http://localhost:5002/api/qrcodes/allqrcodes', {
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
            <h2>All QR Codes created</h2>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>type</th>
                  <th>Code</th>
                  <th>Logo</th>
                  <th>Created by</th>
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
                    <td>{qrcode.user}</td>
                    <td>{qrcode.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

export default ListMenuQrCode
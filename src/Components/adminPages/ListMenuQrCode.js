import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import Sidebar from "../sidebar/sidebar";
import moment from 'moment';


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
        <table class="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>type</th>
                  <th>File</th>
                  <th>Logo</th>
                  <th>Created by</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
              {qrcodeDetails.map(({ qrcode, qrcodeMenu }) => (
                  <tr key={qrcode._id}>
                    <td>{qrcode._id}</td>
                    <td>{qrcode.type}</td>
                    <td><a href={`http://localhost:5002/${qrcodeMenu.file}`} target="_blank">See the PDF</a></td>                   
                    <td><img src={`http://localhost:5002/${qrcode.logo}`}    width="100" height="100"/></td>
                    <td>{qrcode.user}</td>
                    <td>{moment(qrcode.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

export default ListMenuQrCode
// MyQrCodeDetails.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MyQrCodeDetails=()=> {
  const { type, id } = useParams();
  const [qrcodeDetails, setQRCodes] = useState([]);

  useEffect(() => {
    const fetchQrCodeDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.100.185:5002/api/generateqrcodes/${type}/${id}`);
        setQRCodes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQrCodeDetails();
  }, [type,id]);

  return (
    <div className='center'>
            <h2>Details for QR Code</h2>
            <p>Type: {type}</p>
            <p>Restaurant: {qrcodeDetails.restaurant}</p>
            <iframe
            title="description"
            src={`http://localhost:5002/${qrcodeDetails.file}`}
            width="700"
            height="500"
            />


    </div>
  );
}
export default MyQrCodeDetails

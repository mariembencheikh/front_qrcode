import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './Components/contexts/authContext';
import Homepage from './Components/homepage/homepage';
import MyQrcodes from './Components/qrcodes/Myqrcodes/MyQrcodes';
import ListQrCodes from './Components/qrcodes/ListQrCodes';
import GenerateQrcode from './Components/qrcodes/generateQrCodes/generateQRCode';


function App() {
  
  return (
   
    <AuthProvider>
     <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Homepage/>} />
        
          <Route path="/myqrcodes" element={<MyQrcodes/>}/>
          <Route path='/listQrcodes' element={<ListQrCodes/>}/>
          <Route path='/generateQrcode' element={<GenerateQrcode/>}/>
        </Routes>
      </div>
    </Router>
    </AuthProvider>
   
  );
}

export default App;

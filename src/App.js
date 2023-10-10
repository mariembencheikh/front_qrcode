import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './Components/contexts/authContext';
import MyQrcodes from './Components/qrcodes/Myqrcodes/MyQrcodes';
import ListQrCodes from './Components/qrcodes/ListQrCodes';
import MenuQrCode from './Components/qrcodes/generateQrCodes/MenuQrCode';
import RegisterForm from './Components/register/register';
import LoginForm from './Components/login/login';
import AllCustomers from './Components/adminPages/AllCustomers';
import ListMenuQrCode from './Components/adminPages/ListMenuQrCode';
import MyQrcodeUpdate from './Components/qrcodes/Myqrcodes/MyQrcodeUpdate';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
   
    <AuthProvider>
     <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/myqrcodes" element={<MyQrcodes/>}/>
          <Route path="/updateMyQrcode/:id" element={<MyQrcodeUpdate/>}/>
          <Route path='/listQrcodes' element={<ListQrCodes/>}/>
          
          <Route path='/MenuQrCode' element={<MenuQrCode/>}/>
          <Route path='/ListMenuQrCode' element={<ListMenuQrCode/>}/>
          <Route path='/all-users' element={<AllCustomers/>}/>
        </Routes>
      </div>
    </Router>
    </AuthProvider>
   
  );
}

export default App;

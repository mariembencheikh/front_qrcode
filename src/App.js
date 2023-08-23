import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './Components/contexts/authContext';
import MyQrcodes from './Components/qrcodes/Myqrcodes/MyQrcodes';
import ListQrCodes from './Components/qrcodes/ListQrCodes';
import MenuQrCode from './Components/qrcodes/generateQrCodes/MenuQrCode';
import RegisterForm from './Components/register/register';
import LoginForm from './Components/login/login';


function App() {
  
  return (
   
    <AuthProvider>
     <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<LoginForm/>} />
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/myqrcodes" element={<MyQrcodes/>}/>
          <Route path='/listQrcodes' element={<ListQrCodes/>}/>
          <Route path='/MenuQrCode' element={<MenuQrCode/>}/>
        </Routes>
      </div>
    </Router>
    </AuthProvider>
   
  );
}

export default App;

import React from "react"
import './sidebar.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ListIcon from '@mui/icons-material/List';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "../contexts/authContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="user">
        <p>Welcome, {user.firstname}!</p>
      </div>
      <ul>
        <li>
          <Link to="/myqrcodes"><QrCodeIcon />My qr codes </Link>
        </li>
        <li>
          <Link to="/listQrcodes"><ListIcon />Qr codes</Link>
        </li>
        <li>
          <Link to="/settings"><PersonIcon />My profile</Link>
        </li>
        <li>
          <Link to="/" onClick={logout} ><LogoutIcon />Log out</Link>
        </li>
      </ul>


    </div>
  );
};

export default Sidebar;
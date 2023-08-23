import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from "../sidebar/sidebar";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FacebookIcon from '@mui/icons-material/Facebook';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Link } from "react-router-dom";
import './ListQrCodes.css'
import { useAuth } from "../contexts/authContext";
const ListQrCodes = () => {
    const { user } = useAuth();
    return (
        <div className="list">
            <Sidebar />
            <div className="qrcode-list">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col">
                    {user.role === "Customer" && (
                       <Link to="/MenuQrCode" className="custom-link" >
                        <div class="card border-primary" >
                                    <div class="card-body">
                                        <h5 class="card-title"><MenuBookIcon /> Menu book </h5>
                                        <p class="card-text">Link to your menu book</p>
                                    </div>
                            </div>
                        </Link>
                    )}
                        {user.role === "Admin" && (
                            <Link to="/ListMenuQrCode" className="custom-link" >
                            <div class="card border-primary" >
                                        <div class="card-body">
                                            <h5 class="card-title"><MenuBookIcon /> Menu book </h5>
                                            <p class="card-text">Link to your menu book</p>
                                        </div>
                                </div>
                            </Link>
                        )}
                    </div>
                    <div class="col">
                    <Link to="/FacebookQrcode" className="custom-link" >
                        <div class="card border-primary "  >
                            <div class="card-body" >
                                <h5 class="card-title"><FacebookIcon /> Facebook account</h5>
                                <p class="card-text">Link to your facebook account</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div class="col">
                    <Link to="/YoutubeQrcode" className="custom-link" >
                        <div class="card border-primary"  >
                            <div class="card-body">
                                <h5 class="card-title"><SubscriptionsIcon /> Youtube</h5>
                                <p class="card-text">Link to your Youtube channel.</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div class="col">
                    <Link to="/ContactQrcode" className="custom-link" >
                        <div class="card border-primary"  >
                            <div class="card-body">
                                <h5 class="card-title"><ContactPageIcon />Contact</h5>
                                <p class="card-text">Create your digital business card and share your contact details</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ListQrCodes;
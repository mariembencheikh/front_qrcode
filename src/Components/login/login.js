import React from "react";
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './login.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      const response = await axios.post('http://localhost:5002/api/auth/login', {
        email,
        password,
      });

      const { user, token } = response.data;
      localStorage.setItem('token', token);
      
      
      login(user,token);
      console.log('User connected successfully:', user);
      console.log('Token d\'authentification:', token);
      if(user.role==='Customer'){
        navigate('/myqrcodes');

      }
      else{
        navigate('/listQrcodes');

      }
      


    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.log(error.response.data);
      console.error('Error while logging', error);
    }
  };





  return (

    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img src="images/login img.png" alt="Image" class="img-fluid" />
          </div>
          <div class="col-md-6 contents">
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="mb-4">
                  <h3>Log In</h3>
                </div>
                {errorMessage &&
                  <div class="alert alert-danger alert-dismissible fade show">
                    <strong>{errorMessage}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"  onClick={() => setErrorMessage(null)} ></button>
                  </div>
                }
                <form onSubmit={handleSignup}>
                  <div class="form-group first">
                    <input
                      name="email"
                      type="email"
                      class="form-control"
                      id="username"
                      placeholder="Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />

                  </div>
                  <div class="form-group last mb-4">
                    <input
                      name="password"
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required />
                  </div>

                  <input type="submit" value="Log In" class="btn btn-block btn-primary" />
                </form>
                <div class="footer-link ">
                  <span className="span1">Create account<a href="/register" className="a1">Register</a></span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
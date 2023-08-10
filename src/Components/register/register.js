import React from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './register.css';
import axios from 'axios'
const RegisterForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [phoneNumber, setPhonenumber] = useState('');
    const [country, setCountry] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (e) => {

        e.preventDefault()
        setErrorMessage(null)
        if (password.length < 4) {
            setErrorMessage('The password must contain at least 4 characters');
            return;
        }
        if (password !== reEnterPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (phoneNumber.length < 8) {
            setErrorMessage('Phone number invalid')
            return;
        }
        try {
            const response = await axios.post('http://localhost:5002/api/auth/register', {
                firstname,
                lastname,
                email,
                password,
                reEnterPassword,
                phoneNumber,
                country,
            });

            const user = response.data;
            console.log('User saved:', user);
            setSuccessMessage(response.data.message)
            setErrorMessage(null)


        } catch (error) {
            setErrorMessage(error.response.data.message);
            setSuccessMessage(null)
            console.log(error.response.data);
            console.error('Error while registering:', error.response.data);
        }
    }






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
                                    <h3>Sign Up</h3>
                                </div>
                                {errorMessage &&
                                    <div class="alert alert-danger alert-dismissible fade show">
                                        <strong>{errorMessage}</strong>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" onClick={() => setErrorMessage(null)}  ></button>
                                    </div>
                                }
                                {successMessage &&
                                    <div className="alert alert-success alert-dismissible fade show">
                                        <strong>{successMessage}</strong>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                                    </div>
                                }
                                <form onSubmit={handleSubmit}>
                                    <div class="form-group first">
                                        <input type="text"
                                            name="firstname"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            required
                                            placeholder="Firstname"
                                            class="form-control" />
                                    </div>
                                    <div class="form-group first">
                                        <input type="text"
                                            name="lastname"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}

                                            required
                                            placeholder="Lastname"
                                            class="form-control" />
                                    </div>
                                    <div class="form-group first">
                                        <input type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Email"
                                            class="form-control" />
                                    </div>
                                    <div class="form-group last mb-4">
                                        <input type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Password"
                                            class="form-control" id="password" />
                                    </div>
                                    <div class="form-group first">
                                        <input type="password"
                                            name="reEnterPassword"
                                            value={reEnterPassword}
                                            onChange={(e) => setReEnterPassword(e.target.value)}
                                            required
                                            placeholder="Reenter password"
                                            class="form-control" />
                                    </div>
                                    <div class="form-group first">
                                        <input type="text"
                                            name="phoneNumber"
                                            value={phoneNumber}
                                            onChange={(e) => setPhonenumber(e.target.value)}
                                            required
                                            placeholder="Phone number"
                                            class="form-control" />
                                    </div>
                                    <div class="form-group first">
                                        <input type="text"
                                            name="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            placeholder="Country"
                                            class="form-control" />
                                    </div>

                                    <button type="submit" class="btn btn-block btn-primary" > Save </button>
                                </form>
                                <div class="footer-link ">
                                    <span className="span1">Have an account!<a href="/" className="a1">Login</a></span>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
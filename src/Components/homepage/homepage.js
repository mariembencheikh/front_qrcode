import React from "react";
import { Route,Routes } from "react-router-dom";
import LoginForm from "../login/login";
import RegisterForm from "../register/register";



const Homepage = () => {
    
    return (
        <Routes>
            <Route exact path="/" element={
              
             
               <LoginForm title="Connexion"/>
              
            }/>

          
             <Route exact path="/register" element={
              
              
               <RegisterForm title="Inscription"/>
               
            }/>
        </Routes>
    )
}
export default Homepage
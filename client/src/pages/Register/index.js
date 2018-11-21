import React from 'react';
import RegisterCard from "../../components/RegisterCard";
import NavBarPage from "../../components/NavbarPage";
import "./Register.css";



const Register = () => {

    return (
        <div>
    <NavBarPage />
    <div className="registerCard">
    <RegisterCard/>
    </div>
      
        </div>
  

    )
  
}

export default Register;
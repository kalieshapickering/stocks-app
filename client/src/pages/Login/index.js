import React from "react";
import LoginCard from "../../components/LoginCard";
import NavBarPage from "../../components/NavbarPage";
import "./Login.css";

const Login = () => {
    return(
        <div>
    <NavBarPage />
    <div className="loginCard">
    <LoginCard />
    </div>
        </div>
    )
}

export default Login;
import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import LoginModal from "../Modals/LoginModal";
import LogoutModal from "../Modals/LogoutModal";

const Header = (props) => { 
    return(
    <header className={classes.header}>
        <div className={classes.logo}>
            <NavLink to="/">Turnyrai</NavLink>
        </div>
        <div className={classes.navigation}>
            <LoginModal/>    
            <LogoutModal/>
        </div>
    </header>
    );
};

export default Header;
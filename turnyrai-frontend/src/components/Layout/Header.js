import React from "react";
import LoginModal from "../Modals/LoginModal";
import LogoutModal from "../Modals/LogoutModal";
import { Nav, Navbar } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";

const Header = (props) => { 
    return(
     <>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{padding:"0px 20px 0px"}}>
      <Navbar.Brand>
        <Link to="/" style={{textDecoration:"none", color:"white"}}><h2>Turnyrai</h2></Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" style={{marginLeft:"auto", marginRight:"0px"}}>
          <LoginModal/>
          <LogoutModal/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
    );
};

export default Header;
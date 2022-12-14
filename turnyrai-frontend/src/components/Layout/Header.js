import React from "react";
import LoginModal from "../Modals/LoginModal";
import LogoutModal from "../Modals/LogoutModal";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./style.css";

const Header = (props) => { 
    return(
     <>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{padding:"0px 20px 0px"}}>
      <Navbar.Brand href="/">
        <h2>Turnyrai</h2>
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
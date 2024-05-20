import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarComponent.css';
import Logo from '../Logo.png'; // Import your logo component or image

function NavbarComponent() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container fluid style={{padding: '0px 45px'}}>
        <Navbar.Brand>
          <img src={Logo} alt='PROSE PETAL' style={{height:'55px', width:'100%'}}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">HOME</Nav.Link>
            <Nav.Link className="nav-link" href="#articles">ARTICLES</Nav.Link>
            <Nav.Link eventKey={3} href="#about">ABOUT</Nav.Link>
            <Nav.Link eventKey={4} href="#contact">CONTACT US</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

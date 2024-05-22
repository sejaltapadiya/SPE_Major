import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavbarComponent.css';
import Logo from '../Logo.png'; // Import your logo component or image

function NavbarComponent() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    window.location.href = '/login'; 
  };

  return (
    <Navbar collapseOnSelect expand="lg" className={`navbar-dark-gray ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Container fluid style={{ padding: '0px 45px' }}>
        <Navbar.Brand>
          <img src={Logo} alt='PROSE PETAL' style={{ height: '55px', width: '100%' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/homepage" className="nav-link">HOME</Nav.Link>
            <Nav.Link href="/profilepage" className="nav-link" eventKey={3}>ABOUT</Nav.Link>
            <Nav.Link href="/contactpage" className="nav-link" eventKey={4}>CONTACT US</Nav.Link>
            <Nav.Link href="/mainpage" className="nav-link" eventKey={5}>POSTS</Nav.Link>
            <Nav.Link onClick={handleLogout} className="nav-link">LOGOUT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

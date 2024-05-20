import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='bg-dark text-center text-white'>
      <Container fluid className='p-4 pb-0'>
        <section className='mb-4'>
          <Button variant="outline-light" className='m-1' href='#!' role='button'>
            <FaFacebookF />
          </Button>

          <Button variant="outline-light" className='m-1' href='#!' role='button'>
            <FaTwitter />
          </Button>

          <Button variant="outline-light" className='m-1' href='#!' role='button'>
            <FaGoogle />
          </Button>
          <Button variant="outline-light" className='m-1' href='#!' role='button'>
            <FaInstagram />
          </Button>

          <Button variant="outline-light" className='m-1' href='#!' role='button'>
            <FaLinkedinIn />
          </Button>

          <Button variant="outline-light" className='m-1' href='#!' role='button'>
            <FaGithub />
          </Button>
        </section>
      </Container>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright:
        <div className='text-white'>
          ProsePetal.com
        </div>
      </div>
    </footer>
  );
}

export default Footer;

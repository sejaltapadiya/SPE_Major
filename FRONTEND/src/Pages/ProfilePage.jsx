import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import profile from '../Images/profile.jpg';
import NavbarComponent from '../Components/NavbarComponent';
import Footer from '../Components/Footer';
import axios from 'axios';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleDeleteAccount = () => {
    axios.delete('http://localhost:9595/api/users/delete', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    .then(response => {
      console.log('Account deleted successfully:', response.data);
      window.location.href = '/login';
    })
    .catch(error => {
      console.error('Error deleting account:', error);
    });
  };

  const handleUpdateDetails = () => {
    const data = {
      name,
      email,
      about,
    };

    axios.put('http://localhost:9595/api/users/update', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    .then(response => {
      console.log('Details updated successfully:', response.data);
      setShowModal(true);
    })
    .catch(error => {
      console.error('Error updating details:', error);
    });
  };

  useEffect(() => {
    axios.get('http://localhost:9595/api/users/viewProfile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    .then(response => {
      const { name, email, about } = response.data;
      setName(name);
      setEmail(email);
      setAbout(about);
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarComponent />
      <div style={{ flex: '1' }}>
        <div className='profile' style={{ marginTop: '100px' }}>
          <Container>
            <Row className="mt-5">
              <Col xs={12} md={4} className="text-center">
                <div style={{ width: '400px', height: '400px', borderRadius: '50%', overflow: 'hidden' }}>
                  <div
                    className="profile-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${profile})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </div>
              </Col>
              <Col xs={12} md={8} className="align-self-start">
                <div className='card-body' style={{ position: 'relative', minHeight: '600px' }}>
                  <Form>
                    <Form.Group controlId="formName" className="mb-4">
                      <Form.Label style={{ textAlign: 'left' }}>Name</Form.Label>
                      <Form.Control type="text" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-4">
                      <Form.Label style={{ textAlign: 'left' }}>Email</Form.Label>
                      <Form.Control type="email" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Form.Group controlId="formAbout" className="mb-4">
                      <Form.Label style={{ textAlign: 'left' }}>About me</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        value={about} 
                        onChange={handleAboutChange} 
                        rows={5} 
                        style={{ resize: 'none' }}
                      />
                    </Form.Group>
                    <div className='button' style={{ marginTop: '10px' }}>
                      <Button variant="dark" onClick={handleUpdateDetails}>
                        Update Details
                      </Button>
                    </div>
                  </Form>
                  <div className='button' style={{ position: 'absolute', bottom: '10px', right: '2px' }}>
                    <Button
                      variant="danger"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your profile details have been updated successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

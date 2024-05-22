import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import profile from '../Images/profile.jpg';
import NavbarComponent from '../Components/NavbarComponent';
import Footer from '../Components/Footer';
import axios from 'axios';

export default function ProfilePage() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');

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
      // Redirect to home or login page after account deletion
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
      const { userId, name, email, about } = response.data;
      setUserId(userId);
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
                    <Form.Group controlId="formUserId">
                      <Form.Label>User ID</Form.Label>
                      <Form.Control type="text" value={userId} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Form.Group controlId="formAbout">
                      <Form.Label>About me</Form.Label>
                      <Form.Control type="text" value={about} onChange={handleAboutChange} />
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
    </div>
  );
}

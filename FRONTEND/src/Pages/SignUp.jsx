import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      about: formData.get('about'),
    };
    
    console.log('Form Data:', data); // Debugging: Log form data

    try {
      const response = await axios.post('http://localhost:9595/api/v1/auth/register', data);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div 
      className="container-fluid" 
      style={{ 
        backgroundImage: 'url(https://source.unsplash.com/random/1920x1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="row justify-content-center" >
        <div className="col-md-6">
          <div className="card" style={{marginTop:'90px'}}>
            <h5 className="card-title text-center" style={{ marginTop: '10px' }}>Sign Up</h5>
            <div className="card-body text-start">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="about" className="form-label">About You</label>
                  <textarea className="form-control" id="about" name="about" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-dark w-100">Sign Up</button>
              </form>
              <p className="mt-3 text-center">Already have an account? <a href="/login">Sign in</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

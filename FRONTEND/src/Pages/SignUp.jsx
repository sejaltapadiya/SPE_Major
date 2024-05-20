import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('firstName') + ' ' + formData.get('lastName'), // Combine first name and last name
      email: formData.get('email'),
      password: formData.get('password'),
    };
  
    try {
      const response = await axios.post('http://localhost:9595/api/v1/auth/register', data);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };


  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
              <h5 className="card-title text-center" style={{marginTop:'10px'}}>Sign Up</h5>
              <div className="card-body text-start">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" id="firstName" name="firstName" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" id="lastName" name="lastName" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" name="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" required />
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

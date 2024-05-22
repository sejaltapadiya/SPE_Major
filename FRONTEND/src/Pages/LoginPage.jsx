import React, { useState } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post('http://localhost:9595/api/v1/auth/authenticate', {
        email: email,
        password: password
      });

      console.log('Login successful:', response.data);
      setIsLoggedIn(true);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
    } catch (error) {
      console.error('Login error:', error);
      setError("Invalid email or password");
    }
  };

  return isLoggedIn ? (
      navigate('/homepage')
  ) : (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-6"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
          }}
        >
          <div
            className="login-form"
            style={{
              width: '70%',
              border: '1px solid #ccc',
              backgroundColor: '#fff'
            }}
          >
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ height: '180px', marginLeft: '15px', marginRight: '15px' }}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button type="submit" className="btn black" style={{ marginTop: '10px', backgroundColor: 'black', color: 'white' }}>Submit</button>
            </form>
            <p style={{ marginTop: '10px' }}>Don't have an account? <a href="/signup">Sign Up</a></p>
          </div>
        </div>

        <div
          className="col-md-6"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <img
            src="https://source.unsplash.com/random?wallpapers"
            alt="placeholder"
            className="img-fluid"
            style={{ maxWidth: '100%', height: '100%' }}
          />
        </div>
      </div>
    
    </div>
  );
};

export default LoginPage;

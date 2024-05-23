import React, { useState } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:9595/api/v1/auth/authenticate', {
        email,
        password
      });

      console.log('Login successful:', response.data);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      navigate('/homepage');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
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
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px'
            }}
          >
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
              <button
                type="submit"
                className="btn btn-dark"
                style={{ marginTop: '10px' }}
              >
                Submit
              </button>
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
            style={{ maxWidth: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

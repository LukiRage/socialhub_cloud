// LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { AuthContext } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const data = await login({ email, password });
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.userId);
      if (data.user) {
        loginContext(data.user);
      }
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <div className="mb-3">
                <input 
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

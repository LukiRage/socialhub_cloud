import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      await register({
        name,
        surname,
        email,
        description,
        password,
        profile_picture: 'default.png',
        isOnline: true,
        creation_date: new Date().toISOString()
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <div className="mb-3">
                <input 
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Surname"
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows="3"
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
              <button className="btn btn-primary w-100" onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

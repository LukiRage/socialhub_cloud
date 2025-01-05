import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/users';

export default function UserCreatePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [profile_picture, setProfilePicture] = useState('default.png');
  const navigate = useNavigate();

  async function handleCreate() {
    try {
      await createUser({
        name,
        email,
        password,
        // profile_picture,
        isOnline: false,
        creation_date: new Date().toISOString()
      });
      navigate('/users');
    } catch (err) {
      console.error(err);
      alert('Error creating user');
    }
  }

  return (
    <div className="card">
      <h2>Create User</h2>
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
      <button className="btn btn-primary" onClick={handleCreate}>Create</button>
    </div>
  );
}

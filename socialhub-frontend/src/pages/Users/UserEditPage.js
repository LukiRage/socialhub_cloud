import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../api/users';

export default function UserEditPage() {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    description: '',
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    getUserById(id)
      .then(data => {
        setUser({
          name: data.name || '',
          surname: data.surname || '',
          email: data.email || '',
          description: data.description || '',
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  async function handleUpdate() {
    try {
      const updateData = {
        id: parseInt(id),
        ...user,
        ...(password ? { password } : {}),
      };
      await updateUser(updateData);
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating user');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card">
      <h2>Edit Profile</h2>
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          className="form-control"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Surname:</label>
        <input
          className="form-control"
          name="surname"
          value={user.surname}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          className="form-control"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">New Password:</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          name="description"
          value={user.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
    </div>
  );
}

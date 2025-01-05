import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/users';
import { Link } from 'react-router-dom';

export default function UsersListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card">
      <h2>Users</h2>
      <Link to="/users/create" className="btn btn-primary mb-3">Create new user</Link>
      <div className="list-group">
        {users.map(u => (
          <Link 
            key={u.id} 
            to={`/users/${u.id}`}
            className="list-group-item list-group-item-action"
          >
            {u.name} ({u.email})
          </Link>
        ))}
      </div>
    </div>
  );
}

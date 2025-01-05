import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGroup } from '../../api/groups';
import { AuthContext } from '../../context/AuthContext';

export default function GroupCreatePage() {
   const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // const [cover, setCover] = useState('default_cover.png');
  const navigate = useNavigate();

  async function handleCreate() {
    try {
      await createGroup(currentUser.id, { name, description });
      navigate('/groups');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h2>Create Group</h2>
      <input
        className="form-control mb-3"
        placeholder="Group Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <textarea
        className="form-control mb-3"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleCreate}>Create</button>
    </div>
  );
}

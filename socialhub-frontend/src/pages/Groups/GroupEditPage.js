import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupById, updateGroup } from '../../api/groups';

export default function GroupEditPage() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState('');

  useEffect(() => {
    getGroupById(id)
      .then(data => {
        setName(data.name || '');
        setDescription(data.description || '');
        setCover(data.cover_picture || '');
      })
      .catch(err => console.error(err));
  }, [id]);

  async function handleSave() {
    try {
      await updateGroup(id, { name, description, cover_picture: cover });
      alert('Group updated');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h2>Edit Group</h2>
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
      <input
        className="form-control mb-3"
        placeholder="Cover Picture"
        value={cover}
        onChange={e => setCover(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getGroupById, deleteGroup } from '../../api/groups';

export default function GroupDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    getGroupById(id)
      .then(data => setGroup(data))
      .catch(err => console.error(err));
  }, [id]);

  async function handleDelete() {
    try {
      await deleteGroup(id);
      navigate('/groups');
    } catch (err) {
      console.error(err);
    }
  }

  if (!group) return <div className="card">Loading group...</div>;

  return (
    <div className="card">
      <h2>Group Details</h2>
      <div className="mb-3">
        <p><strong>Name:</strong> {group.name}</p>
        <p><strong>Description:</strong> {group.description}</p>
      </div>
      <div className="mb-2">
        <Link to={`/groups/${group.id}/edit`} className="btn btn-primary me-2">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger me-2">Delete</button>
      </div>
      <div>
        <Link to={`/groups/${group.id}/cover`} className="btn btn-primary me-2">Upload Cover</Link>
        <Link to={`/groups/${group.id}/add-user/2`} className="btn btn-primary">Add User #2</Link>
      </div>
    </div>
  );
}

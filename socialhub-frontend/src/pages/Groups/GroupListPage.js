import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllGroups } from '../../api/groups';

export default function GroupListPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getAllGroups()
      .then(data => setGroups(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="card">
      <h2>Groups</h2>
      <Link to="/groups/create" className="btn btn-primary mb-3">Create Group</Link>
      <ul className="list-group">
        {groups.map(g => (
          <li key={g.id} className="list-group-item">
            <Link to={`/groups/${g.id}`} className="nav-link">{g.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

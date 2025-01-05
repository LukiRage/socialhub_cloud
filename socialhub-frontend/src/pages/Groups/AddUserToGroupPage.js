import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addUserToGroup } from '../../api/groups';

export default function AddUserToGroupPage() {
  const { id, userId } = useParams();
  const [info, setInfo] = useState('');

  useEffect(() => {
    addUserToGroup(id, userId)
      .then(() => setInfo(`User ${userId} added to group ${id}`))
      .catch(err => {
        console.error(err);
        setInfo('Error adding user to group');
      });
  }, [id, userId]);

  return (
    <div>
      <h2>Add User to Group</h2>
      <p>{info}</p>
    </div>
  );
}
